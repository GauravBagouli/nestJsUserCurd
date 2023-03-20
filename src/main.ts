import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
const rookout = require('rookout'); rookout.start({ token: 'somerandomassnumbers123457593903209' })

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000).then(() =>console.log('server ready on 3000'));
}
bootstrap();
