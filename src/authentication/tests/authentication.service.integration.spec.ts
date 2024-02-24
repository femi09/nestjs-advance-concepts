import { AuthenticationService } from '../authentication.service';
import { Test } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../../users/user.entity';
import { UsersService } from '../../users/users.service';
import mockedJwtService from '../../utils/mocks/jwt.service';
import mockedConfigService from '../../utils/mocks/config.service';
import * as bcrypt from 'bcrypt';
import mockedUser from './user.mock';

jest.mock('bcrypt');

describe('The AuthenticationService', () => {
  let authenticationService: AuthenticationService;
  let usersService: UsersService;
  let bcryptCompare: jest.Mock;
  let userData;
  let findUser: jest.Mock;
  beforeEach(async () => {
    userData = {
      ...mockedUser,
    };
    findUser = jest.fn().mockResolvedValue(userData);
    const usersRepository = {
      findOne: findUser,
    };

    bcryptCompare = jest.fn().mockReturnValue(true);
    (bcrypt.compare as jest.Mock) = bcryptCompare;

    const module = await Test.createTestingModule({
      providers: [
        UsersService,
        AuthenticationService,
        {
          provide: ConfigService,
          useValue: mockedConfigService,
        },
        {
          provide: JwtService,
          useValue: mockedJwtService,
        },
        {
          provide: getRepositoryToken(User),
          useValue: usersRepository,
        },
      ],
    }).compile();
    authenticationService = await module.get(AuthenticationService);
    usersService = await module.get(UsersService);
  });

  it('should attempt to get a user by email, when accessing the data of authenticating user', async () => {
    const getByEmailSpy = jest.spyOn(usersService, 'getByEmail');
    await authenticationService.getAuthenticatedUser(
      'user@email.com',
      'strongPassword',
    );
    expect(getByEmailSpy).toBeCalledTimes(1);
  });

  it('should throw an error, if the provided password is invalid', async () => {
    bcryptCompare.mockReturnValue(false);
    await expect(
      authenticationService.getAuthenticatedUser(
        'user@email.com',
        'strongPassword',
      ),
    ).rejects.toThrow();
  });

  it('should return the user data if password is valid and user is found in the database', async () => {
    bcryptCompare.mockReturnValue(true);
    findUser.mockResolvedValue(userData);
    const user = await authenticationService.getAuthenticatedUser(
      'user@email.com',
      'strongPassword',
    );
    expect(user).toBe(userData);
  });

  it('should throw an error if user is not found in the database', async () => {
    findUser.mockResolvedValue(undefined);
    await expect(
      authenticationService.getAuthenticatedUser(
        'user@email.com',
        'strongPassword',
      ),
    ).rejects.toThrow();
  });
});
