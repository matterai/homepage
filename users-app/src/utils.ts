import { QueryFailedError } from 'typeorm';

export const queryFailedErrorPostgres = (
  error: any,
): error is QueryFailedError & {
  sqlState: string;
  sqlMessage: string;
  code: string;
} => error instanceof QueryFailedError;
