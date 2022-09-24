import { ApiProperty } from '@nestjs/swagger';

export class UserModel {
  @ApiProperty({ description: 'UUID' })
  id: string;

  @ApiProperty({ description: 'The name of user' })
  displayName: string;

  @ApiProperty({ description: 'An e-mail address of user' })
  email: string;

  @ApiProperty({ description: 'EVM wallet address' })
  evmAddress: string;

  @ApiProperty({ description: 'When user was registered' })
  created: Date;
}
