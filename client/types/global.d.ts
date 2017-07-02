declare var module: any;
declare var require: any;

declare module '*.css' {
  const content: any;
  export = content;
}
