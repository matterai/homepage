import { UserEntity } from './entities/user.entity';
import { UserModel } from './models/user.model';

export class UsersMap {
  public static toModel(user: UserEntity): UserModel {
    return {
      id: user.id,
      displayName: user.displayName,
      email: user.email,
      evmAddress: user.evmAddress,
      created: user.created,
    };
  }
}
