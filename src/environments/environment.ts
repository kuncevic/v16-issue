import { NgxLoggerLevel } from 'ngx-logger';

export const environment = {
  api: {
    baseUrl: 'https://jsonplaceholder.typicode.com',
  },
  production: true,
  logLevel: NgxLoggerLevel.OFF,
  serverLogLevel: NgxLoggerLevel.ERROR,
};
