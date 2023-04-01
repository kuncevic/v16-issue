import { ErrorHandler, inject, Injectable, Injector } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
  logger = inject(NGXLogger);
  constructor() {}

  handleError(error: Error) {
    // Obtain dependencies at the time of the error
    // This is because the GlobalErrorHandler is registered first
    // which prevents constructor dependency injection
    // const logger = this.injector.get(NGXLogger);

    const err = {
      message: error.message ? error.message : error.toString(),
      stack: error.stack ? error.stack : '',
    };

    // TODO add logger
    // Log  the error
    this.logger.error(err);

    // Re-throw the error
    throw error;
  }
}
