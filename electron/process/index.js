import handleEvent from './process';

export default async function ({ type, event, data }) {
  let result = null;
  switch (type) {
    case 'event':
      result = await handleEvent({ event, data });
      break;
    case 'response':
      console.log({ type, event, data });
      break;
    case 'error':
      break;
    case 'log':
      break;
    default:
      break;
  }
  return result;
}
