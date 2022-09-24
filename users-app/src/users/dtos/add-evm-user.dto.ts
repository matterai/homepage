import { ApiProperty } from '@nestjs/swagger';

export class AddEvmUserDto {
  @ApiProperty({ description: 'EVM wallet address' })
  address: string;
}
