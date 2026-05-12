import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Restaurant } from './restaurants/restaurant.entity';
import { RESTAURANTS_SEED } from './restaurants/restaurants.data';
import { Repository } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const restaurantRepository = app.get<Repository<Restaurant>>(getRepositoryToken(Restaurant));

  console.log('Seeding restaurants...');

  // Clear existing data
  await restaurantRepository.clear();

  // Insert seed data
  await restaurantRepository.save(RESTAURANTS_SEED);

  console.log('Seeding complete!');
  await app.close();
}

bootstrap();
