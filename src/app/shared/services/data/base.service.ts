import { lastValueFrom } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { BaseOperations } from './base-operations';
import { inject } from '@angular/core';

export abstract class BaseService<T, ID> implements BaseOperations<T, ID> {
  protected http = inject(HttpClient);
  constructor(private base: string) {}

  findAll(params?: string): Promise<T[]> {
    return this.query(params ?? '');
  }

  query(params: string): Promise<T[]> {
    return lastValueFrom(this.http.get<T[]>(`${this.base}?${params}`));
  }
}
