import { app } from 'electron';
import { autoUpdater } from 'electron-updater';
import Action from './event/app';

const handleEvent = async ({ event = '', data = {} }) => {
  let result = null;
  switch (event) {
    case Action.CHECK_UPDATE:
      result = checkUpdate();
      break;
    case Action.GET_VERSION:
      result = await getVersion();
      break;
    case Action.QUIT_AND_UPDATE:
      result = updateAndQuitApp();
      break;
    case Action.QUIT_APP:
      result = quitApp();
      break;
    default:
      break;
  }

  return result;
};

const checkUpdate = async () => {
  autoUpdater.checkForUpdates();
  return null;
};

const getVersion = async () => {
  const version = await app.getVersion();
  return version;
};

const updateAndQuitApp = () => {
  autoUpdater.quitAndInstall();
  return null;
};

const quitApp = () => {
  app.quit();
  return null;
};

export default handleEvent;
