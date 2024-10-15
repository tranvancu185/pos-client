import { app, shell, BrowserWindow, ipcMain, dialog } from 'electron';
import { join } from 'path';
import { electronApp, optimizer, is } from '@electron-toolkit/utils';
import { spawn } from 'child_process';
import { autoUpdater } from 'electron-updater';

import icon from '../../resources/icon.png?asset';
import configProcess from '../config/index';
import handlerMessage from '../process/index';
import logger from 'electron-log';
import moment from 'moment';
import { sandboxed } from 'process';

const filePathToUrl = (path) => {
  path = path.replaceAll('\\', '/');
  var drive = /(.)\:\//;
  return path.replace(drive, 'file:///$1:/');
};

let mainWindow;

const WS_PORT = 6066;
const KEY_SERVER_SEND = 'SERVER_SEND';
const KEY_SERVER_RECEIVE = 'SERVER_RECEIVE';

const start_url = is.dev
  ? process.env['ELECTRON_RENDERER_URL']
  : `file://${join(__dirname, '../renderer/index.html')}`;

const base_url = is.dev
  ? process.env['ELECTRON_RENDERER_URL']
  : filePathToUrl(`${join(__dirname, '../renderer/index.html')}`);

const app_root = is.dev ? join(__dirname, '..') : join(__dirname, '../..');

const ws_url = `http://localhost:${WS_PORT}`;

function createWindow() {
  const preloadScriptPath = join(__dirname, '../preload/index.js');

  const webPreferences = {
    devTools: true,
    nodeIntegrationInSubFrames: true,
    nodeIntegration: true,
    contextIsolation: true,
    nativeWindowOpen: true,
    preload: preloadScriptPath,
    sandboxed: false,
    webviewTag: true,
    webSecurity: false,
  };

  // Create the browser window.
  mainWindow = new BrowserWindow({
    show: false,
    backgroundColor: '#FFFFFF',
    autoHideMenuBar: false,
    ...(process.platform === 'linux' ? { icon } : { icon }),
    webPreferences: webPreferences,
  });

  if (!is.dev) {
    try {
      const serverPath = join(app_root, '../app.asar.unpacked/server/server.exe'); // Điều chỉnh đường dẫn nếu cần
      logger.info('Server path: ', serverPath);
      const serverProcess = spawn(serverPath);

      serverProcess.stdout.on('data', async (msg) => {
        logger.info('Server path: ', msg);
        // Kiểm tra xem máy chủ đã khởi động thành công chư
        if (msg.toString().includes('SERVER_STARTED')) {
          /* Load content */
          mainWindow.loadURL(ws_url);
        } else if (msg.toString().includes(KEY_SERVER_SEND)) {
          try {
            const dataMessage = JSON.parse(msg);
            const {
              type,
              payload: { event, data },
            } = dataMessage;
            const result = await handlerMessage({ type, event, data });
            const body = {
              key: KEY_SERVER_RECEIVE,
              type: 'response',
              payload: { event, data: result },
            };
            serverProcess.stdin.write(JSON.stringify(body));
          } catch (error) {
            console.log(error);
            logger.info('Server Error: ', error);
            dialog.showErrorBox('Có lỗi xảy ra!', `${error.message}`);
          }
        }
      });

      serverProcess.stderr.on('data', (data) => {
        if (data.toString().includes('panic')) {
          logger.info('Server Error: ', data);
          console.error(`stderr: ${data}`);
          dialog.showErrorBox('Có lỗi xảy ra!', `${data}`);
        }
      });
    } catch (error) {
      console.log(error);
      logger.info('Server Error: ', error);
      dialog.showErrorBox('Có lỗi xảy ra!', `${error.message}`);
    }
  } else {
    if (import.meta.env.VITE_RUN_SERVER) {
      try {
        const serverProcess = spawn(join(app_root, '../../pos-ws/server.exe')); // Điều chỉnh đường dẫn nếu cần

        serverProcess.stdout.on('data', async (msg) => {
          console.log(
            ' ============> Start listen sdtin <============\n',
            ' => Message: ',
            msg.toString()
          );
          // Kiểm tra xem máy chủ đã khởi động thành công chư
          if (msg.toString().includes('SERVER_STARTED')) {
            /* Load content */
            mainWindow.loadURL(ws_url);
          } else if (msg.toString().includes(KEY_SERVER_SEND)) {
            try {
              const dataMessage = JSON.parse(msg);

              const {
                type,
                payload: { event, data },
              } = dataMessage;

              const result = await handlerMessage({ type, event, data });
              const body = {
                key: KEY_SERVER_RECEIVE,
                type: 'response',
                payload: { event, data: result },
              };

              console.log(' => Send Message to Server:\n', body);
              serverProcess.stdin.write(JSON.stringify(body));
            } catch (error) {
              console.log(error);
              mainWindow.loadURL(start_url);
              dialog.showErrorBox('Có lỗi xảy ra!', `${error.message}`);
            }
          }
        });

        serverProcess.stderr.on('data', (data) => {
          if (data.toString().includes('panic')) {
            logger.info('Server Error: ', data);
            console.error(`stderr: ${data}`);
            dialog.showErrorBox('Có lỗi xảy ra!', `${data}`);
          }
        });
      } catch (error) {
        console.log(error);
        mainWindow.loadURL(start_url);
        dialog.showErrorBox('Có lỗi xảy ra!', `${error.message}`);
      }
    } else {
      mainWindow.loadURL(start_url);
    }
  }

  if (process.platform !== 'darwin') {
    mainWindow.webContents.setWindowOpenHandler(({ url, frameName }) => {
      if (frameName === 'silent-print') {
        /* Open window frame for do something in silent */
        return {
          action: 'allow',
          overrideBrowserWindowOptions: {
            webPreferences,
            show: false,
          },
        };
      } else {
        /* Open link in ur default browser! */
        shell.openExternal(url);
      }
    });
  }

  /* In Prod mode, remove token when app reopen */
  if (!is.dev) {
    mainWindow.webContents.executeJavaScript('localStorage.removeItem("api_token_key")');
  }

  /* Clear silent print receipt */
  mainWindow.webContents.executeJavaScript('localStorage.removeItem("silent-print-url")');

  /* Set electron file url for accessing on renderer process! */
  mainWindow.webContents.executeJavaScript(
    `localStorage.setItem("electronBaseUrl", "${base_url}#")`
  );

  mainWindow.webContents.executeJavaScript(`localStorage.setItem("appRoot", "${app_root}")`);

  // Set ws url for accessing on renderer process!
  mainWindow.webContents.executeJavaScript(`localStorage.setItem("wsUrl", "${ws_url}")`);

  mainWindow.webContents.executeJavaScript(
    `localStorage.setItem("app-pos-version", "${app.getVersion()}")`
  );

  mainWindow.on('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url);
    return { action: 'deny' };
  });
}

autoUpdater.channel = 'latest';
autoUpdater.allowPrerelease = false;
autoUpdater.logger = logger;
autoUpdater.logger.transports.file.level = 'info';
autoUpdater.logger.transports.file.fileName = `${moment().format('YYYY-MM-DD')}_main.log`;
autoUpdater.logger.transports.file.maxSize = 20 * 1024 * 1024;
/* Check update processes */
autoUpdater.autoInstallOnAppQuit = false;

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app
  .whenReady()
  .then(() => {
    // Set app user model id for windows
    electronApp.setAppUserModelId('com.electron');

    // Default open or close DevTools by F12 in development
    // and ignore CommandOrControl + R in production.
    // see https://github.com/alex8088/electron-toolkit/tree/master/packages/utils
    app.on('browser-window-created', (_, window) => {
      optimizer.watchWindowShortcuts(window);
    });

    createWindow();

    app.on('activate', function () {
      // On macOS it's common to re-create a window in the app when the
      // dock icon is clicked and there are no other windows open.
      if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
  })
  .then(() => {
    if (is.dev) {
      const { default: installExtension, REDUX_DEVTOOLS } = require('electron-devtools-installer');
      installExtension(REDUX_DEVTOOLS)
        .then((name) => console.log(`Added Extension:  ${name}`))
        .catch((err) => console.log('An error occurred: ', err));
    }
  });

/* Config app */
configProcess();

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app"s specific main process
// code. You can also put them in separate files and require them here.
