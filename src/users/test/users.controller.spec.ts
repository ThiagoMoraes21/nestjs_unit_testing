import { CreateUserDto } from './../dto/create-user.dto';
import { userStub } from './stubs/user.stub';
import { Test } from '@nestjs/testing';
import { UsersService } from './../users.service';
import { UsersController } from './../users.controller';
import { User } from '../schemas/user.schema';
import { UpdateUserDto } from '../dto/update-user.dto';

jest.mock('../users.service');

describe('UsersController', () => {
    let usersController: UsersController;
    let usersService: UsersService;

    beforeEach(async () => {
        const moduleRef = await Test.createTestingModule({
            imports: [],
            controllers: [UsersController],
            providers: [UsersService]
        }).compile();

        usersController = moduleRef.get<UsersController>(UsersController);
        usersService = moduleRef.get<UsersService>(UsersService);
        jest.clearAllMocks();
    });
    
    describe('#getUser', () => {
        describe('when getUser is called', () => {
            let user: User;

            beforeEach(async () => {
                user = await usersController.getUser(userStub().userId);
            });

            test('then it should call usersService.getUserById', () => {
                expect(usersService.getUserById).toBeCalledWith(userStub().userId);
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
                users = await usersController.getUsers();
            });
    
            test('then it should call usersService.getUsers', () => {
                expect(usersService.getUsers).toHaveBeenCalled();
            });

            test('then it should return a users array', () => {
                expect(users).toEqual([userStub()]);
            });
        });
    });

    describe('#createUser', () => {
        describe('when createUser is called', () => {
            let user: User;
            let createUserDto: CreateUserDto;

            beforeEach(async () => {
                createUserDto = {
                    email: userStub().email,
                    age: userStub().age
                }
                user = await usersController.createUser(createUserDto);
            });

            test('then it should call the usersService.createUser', () => {
                expect(usersService.createUser).toBeCalledWith(
                    createUserDto.email,
                    createUserDto.age
                );
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
                    favoriteFoods: ['oranges', 'burritos'],
                    age: 24
                }

                user = await usersController.updateUser(
                    userStub().userId,
                    updateUserDto
                );
            });

            test('then it should call usersService.updateUser', () => {
                expect(usersService.updateUser).toBeCalledWith(
                    userStub().userId,
                    updateUserDto
                );
            });

            test('then it should return the updated user object', () => {
                expect(user).toEqual(userStub());
            });
        });
    });

});