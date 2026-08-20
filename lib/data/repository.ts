export interface Repository<TRecord> {
  getById(id: string): Promise<TRecord | null>;
  listByUser(userId: string): Promise<TRecord[]>;
}

export interface WriteRepository<TRecord> extends Repository<TRecord> {
  create(record: TRecord): Promise<TRecord>;
  update(id: string, changes: Partial<TRecord>): Promise<TRecord>;
}

/**
 * Domain services depend on repositories, not on a database client. This is
 * the seam for Supabase repositories and makes local fixtures safe to use in
 * development without changing domain code.
 */
export type RepositoryFactory = {
  [name: string]: Repository<unknown> | WriteRepository<unknown>;
};
