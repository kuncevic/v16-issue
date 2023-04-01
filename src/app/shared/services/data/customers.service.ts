import { Injectable } from '@angular/core';
import { Customer } from '../../types';
import { BaseService } from './base.service';
import { environment } from '../../../../environments/environment';
import { lastValueFrom, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CustomersService extends BaseService<Customer, number> {
  constructor() {
    super(`${environment.api.baseUrl}/todos`);
  }

  // is uncomment that there wont' be error
  // override findAll(params?: string | undefined): Promise<Customer[]> {
  //   return lastValueFrom(
  //     of([
  //       {
  //         userId: 1,
  //         id: 1,
  //         title: 'delectus aut autem',
  //         completed: false,
  //       },
  //       {
  //         userId: 1,
  //         id: 2,
  //         title: 'quis ut nam facilis et officia qui',
  //         completed: false,
  //       },
  //     ])
  //   );
  // }
}
