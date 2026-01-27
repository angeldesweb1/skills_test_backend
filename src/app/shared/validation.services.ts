import { z, type ZodObject } from 'zod';

export class ZodService {
  validate(schema: ZodObject, data: any) {
    const errors = z.safeParse(schema, data)?.error?.flatten()?.fieldErrors;
    return errors;
  }

  hasErrors(schema: ZodObject, data: any) {
    this.validate(schema, data);
    return !!this.validate(schema, data);
  }
}
