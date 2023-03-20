import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { UserController } from './controller/user/user.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from './schema/user.schema';
import { UserService } from './service/user/user.service';

@Module({
  imports: [MongooseModule.forRoot('mongodb+srv://castNestJS:tRi4DdxvAnmZFSy@nestjscluster.4w2oefk.mongodb.net/nestJsSetup?authMechanism=SCRAM-SHA-1'),
            MongooseModule.forFeature([{ name: 'User', schema: UserSchema }])],
  controllers: [AppController, UserController],
  providers: [AppService, UserService],
})
export class AppModule {}
