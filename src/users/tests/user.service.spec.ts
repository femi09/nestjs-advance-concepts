import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import User from '../user.entity';

describe('UsersService', () => {
  let usersService: UsersService;
  let findOne: jest.Mock
  let user: User;

  beforeEach(async () => {
    findOne = jest.fn()
    user = new User()
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            findOne
          },
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
  });

  it('should return a user when getting a user by email', async () => {
    findOne.mockReturnValue(Promise.resolve(user));

    const fetchedUser = await usersService.getByEmail("test@gmail.com")

    expect(user).toEqual(fetchedUser);
  
  });

  it("should throw an error if user is undefined", async() => {
    findOne.mockReturnValue(undefined);
    await expect(usersService.getByEmail('test@test.com')).rejects.toThrow();
  })
});