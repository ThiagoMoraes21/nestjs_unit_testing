import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(
            `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@cluster0.vqq92.mongodb.net/nestjs_unit_testing`,
            {
                useFindAndModify: false
            }
        ),
        UsersModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule { }
