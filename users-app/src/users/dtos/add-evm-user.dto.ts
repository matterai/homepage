import { ApiProperty } from '@nestjs/swagger';
import { IsEthereumAddress, IsNotEmpty } from 'class-validator';

export class AddEvmUserDto {
  @IsEthereumAddress()
  @IsNotEmpty()
  @ApiProperty({ description: 'EVM wallet address' })
  address: string;
}
