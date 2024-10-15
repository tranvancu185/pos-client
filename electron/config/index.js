import configUpdater from './updater'

export default function* call() {
  yield configUpdater()
}
