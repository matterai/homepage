import { ApiProperty } from '@nestjs/swagger';

export class BaseEvmUser {
  @ApiProperty({ description: 'EVM wallet address' })
  address: string;
}
