import { Model } from 'mongoose';
import { PaginatedResult, QueryOptions } from './interfaces';

export class MongooseQueryBuilder<T> {
  private query: QueryOptions;
  private populations: any[] = [];

  constructor() {
    this.query = {
      filters: {},
      limit: 10,
      offset: 0,
      sort: {},
    };
  }

  parseQuery(queryParams: Record<string, any>): this {
    const { limit, offset, sortBy, order, filters } = queryParams;

    if (limit) this.setLimit(Number(limit));
    if (offset) this.setOffset(Number(offset));

    if (sortBy) {
      this.sortBy(sortBy, order === 'desc' ? 'desc' : 'asc');
    }

    const fields = filters
      ? filters.split(',').map((field: string) => field.split('.'))
      : [];

    if (fields?.length)
      fields.forEach(([key, value]: [string, any]) => {
        this.where(key, value);
      });

    return this;
  }

  with(relation: string | any): this {
    this.populations.push(relation);
    return this;
  }

  where(field: string, value: any): this {
    if (value !== undefined && value !== null) {
      this.query.filters[field] = value;
    }
    return this;
  }

  setLimit(limit: number): this {
    this.query.limit = limit > 0 ? limit : 10;
    return this;
  }

  setOffset(offset: number): this {
    this.query.offset = offset >= 0 ? offset : 0;
    return this;
  }

  sortBy(field: string, direction: 'asc' | 'desc' = 'asc'): this {
    this.query.sort[field] = direction;
    return this;
  }

  apply(model: Model<any>) {
    const query = model.find(this.query.filters);

    this.populations.forEach((relation) => {
      query.populate(relation);
    });
    return query
      .sort(this.query.sort)
      .skip(this.query.offset)
      .limit(this.query.limit);
  }

  async exec(model: Model<any>): Promise<PaginatedResult<T>> {
    const [docs, total] = await Promise.all([
      await this.apply(model).exec(),
      await model.countDocuments(this.query.filters).exec(),
    ]);

    const perPage = this.query.limit;
    const totalPages = Math.ceil(total / this.query.limit);
    const currentPage = Math.floor(this.query.offset / this.query.limit) + 1;

    return {
      docs,
      pagination: {
        totalItems: total,
        perPage,
        currentPage,
        totalPages,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
        nextPage: currentPage < totalPages ? currentPage + 1 : null,
        previousPage: currentPage > 1 ? currentPage - 1 : null,
      },
    };
  }
}
