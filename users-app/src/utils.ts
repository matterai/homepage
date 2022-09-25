import { ethers } from 'ethers';
import { QueryFailedError } from 'typeorm';

export const queryFailedErrorPostgres = (
  error: any,
): error is QueryFailedError & {
  sqlState: string;
  sqlMessage: string;
  code: string;
} => error instanceof QueryFailedError;

export const getChecksum = (evmAddress: string): string => {
  try {
    return ethers.utils.getAddress(evmAddress);
  } catch (e) {
    return null;
  }
};
