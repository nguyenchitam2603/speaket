declare var module: any;
declare var require: any;
declare var process: any;
declare var bPromise: any;

declare module '*.css' {
  const content: any;
  export = content;
}
