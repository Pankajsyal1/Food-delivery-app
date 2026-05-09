import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantsController } from './restaurants.controller';
import { Restaurant } from './restaurant.entity';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [TypeOrmModule.forFeature([Restaurant])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService]
})
export class RestaurantsModule {}
