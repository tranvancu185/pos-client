// import { sendMessageTelegram } from '../share/api/telegramSend';
// import { loggingPOS } from 'apis/pos/log/log';

// export function getFuncName() {
//     return getFuncName.caller.name
// }

// export const logging = ({raw = {}, message='', functionName = ''}) => {
//     try {
//         window.api.logging(JSON.stringify({raw: raw, message: message ?? '', functionName: functionName ?? ''}));
//         return true;
//     } catch (e) {
//         console.log(e);
//         return true;
//     }
// }

// export const sendMessage = ({raw = {}, message='', functionName = '', isReportError = true}) => {
//     try {
//         sendMessageTelegram({raw, message, functionName, isReportError});
//         return true;
//     } catch (e) {
//         console.log(e);
//         return true;
//     }
// }

// export const sendLogPOS = async (dataLog) => {
//     let loopIndex = 0;
//     let response = null;

//     // Sử dụng async/await
//     while (loopIndex < 3) {
//       try {
//         response = await loggingPOS({data: dataLog});
//         if (response.status === 200) {
//           break;
//         }
//       } catch (error) {
//         console.log(error);
//         console.log(dataLog);
//       }
//       loopIndex++;

//       // Sử dụng setTimeout để tạo sleep
//       await new Promise(resolve => setTimeout(resolve, 100)); // Tạm dừng 100ms
//     }
//   };
