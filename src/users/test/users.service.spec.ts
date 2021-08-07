import { CreateUserDto } from './../dto/create-user.dto';
import { UpdateUserDto } from './../dto/update-user.dto';
import { Test } from '@nestjs/testing';
import { FilterQuery } from 'mongoose';
import { User, UserDocument } from './../schemas/user.schema';
import { UsersRepository } from './../users.repository';
import { UsersService } from './../users.service';
import { userStub } from './stubs/user.stub';


jest.mock('../users.repository');

describe('UsersService', () => {
    let usersService: UsersService;
    let usersRepository: UsersRepository;
    let userFilterQuery: FilterQuery<UserDocument>;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            providers: [
                UsersService,
                UsersRepository
            ]
        }).compile();

        usersService = moduleRef.get<UsersService>(UsersService);
        usersRepository = moduleRef.get<UsersRepository>(UsersRepository);

        userFilterQuery = {
            userId: userStub().userId
        }

        jest.clearAllMocks();
    });

    describe('#getUserById', () => {
        describe('when getUserById is called', () => {
            let user: User;

            beforeEach(async () => {
                user = await usersService.getUserById(userStub().userId);
            });

            test('then it should call #usersRepository.findOne', () => {
                expect(usersRepository.findOne).toHaveBeenCalledWith(userFilterQuery);
            });

            test('then it should return a user', () => {
                expect(user).toEqual(userStub());
            });
        });
    });

    describe('#getUsers', () => {
        describe('when getUsers is called', () => {
            let users: User[];

            beforeEach(async () => {
                users = await usersService.getUsers();
            });

            test('then it should call #usersRepository.find', () => {
                expect(usersRepository.find).toHaveBeenCalled();
            });

            test('then it should return a list of users', () => {
                expect(users).toEqual([userStub()]);
            });
        });
    });

    describe('#createUser', () => {
        describe('when createUser is called', () => {
            let user: User;

            beforeEach(async () => {
                user = await usersService.createUser(
                    userStub().email,
                    userStub().age
                );
            });

            test('then it should call #usersRepository.create', () => {
                expect(usersRepository.create).toHaveBeenCalled();
            }); 

            test('then it should return a new user', () => {
                expect(user).toEqual(userStub());
            });
        });
    });

    describe('#updateUser', () => {
        describe('when updateUser is called', () => {
            let user: User;
            let updateUserDto: UpdateUserDto;

            beforeEach(async () => {
                updateUserDto = {
                    favoriteFoods: ['pizza'],
                    age: 25
                }

                user = await usersService.updateUser(
                    userStub().userId,
                    updateUserDto
                );
            }); 

            test('then it should call #usersRepository.findOneAndUpdate', () => {
                expect(usersRepository.findOneAndUpdate).toHaveBeenCalledWith(
                    userFilterQuery,
                    updateUserDto
                );
            });
            
            test('then it should return an updated user object', () => {
                expect(user).toEqual(userStub());
            });
        });
    });
});