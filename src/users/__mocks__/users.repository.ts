import { userStub } from './../test/stubs/user.stub';

export const UsersRepository = jest.fn().mockReturnValue(
    {
        findOne: jest.fn().mockResolvedValue(userStub()),
        find: jest.fn().mockResolvedValue([userStub()]),
        create: jest.fn().mockResolvedValue(userStub()),
        findOneAndUpdate: jest.fn().mockResolvedValue(userStub())
    }
);