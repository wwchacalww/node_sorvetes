export default interface RepositoryInterface<T> {
  create(entity: T): Promise<T>;
  update(entity: T): Promise<T>;
  delete(id: string): Promise<void>;
  findById(id: string): Promise<T>;
  findAll(): Promise<T[]>;
}
