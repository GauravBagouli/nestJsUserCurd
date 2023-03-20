import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getUserData(): string {
    return 'Hello World! test';
  }
}
