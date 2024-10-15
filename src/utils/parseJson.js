import { sendMessage, logging } from 'utils/logger';

export const parseJSON = (str) => {
  try {
    if (str && str !== '' && str !== null) {
      return JSON.parse(str);
    }
    return {};
  } catch (err) {
    sendMessage({
      raw: {
        params: str,
        data: err,
      },
      message: err.message ?? '',
      functionName: 'qrPayRequestSaga',
    });
    logging({
      raw: {
        params: str,
        data: err,
      },
      message: err.message ?? '',
      functionName: 'qrPayRequestSaga',
    });
    console.log('parseJSON error: ', err.message, str);
    return {};
  }
};
