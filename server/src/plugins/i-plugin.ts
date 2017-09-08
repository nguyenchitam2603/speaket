export interface IPlugin {
  require: any;
  options: any;
  callback: () => void
}
