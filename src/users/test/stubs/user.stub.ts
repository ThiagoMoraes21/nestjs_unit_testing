import { User } from "src/users/schemas/user.schema";

export const userStub = (): User => {
    return {
        userId: '77b07646-e2ff-436c-a06a-21c110ad9d89',
        email: 'test@example.com',
        age: 23,
        favoriteFoods: ['apples', 'pizzas']
    }
}