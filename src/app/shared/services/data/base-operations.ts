export interface BaseOperations<T, ID> {
  findAll(): Promise<T[]>;
  query(params: string): Promise<T[]>;
}
