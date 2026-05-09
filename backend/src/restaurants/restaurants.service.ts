import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';

@Injectable()
export class RestaurantsService implements OnModuleInit {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantsRepository: Repository<Restaurant>
  ) {}

  async onModuleInit() {
    const count = await this.restaurantsRepository.count();
    if (count === 0) {
      await this.restaurantsRepository.save([
        { name: 'Burger Town', cuisine: 'American', deliveryTimeMinutes: 25 },
        { name: 'Sushi Express', cuisine: 'Japanese', deliveryTimeMinutes: 35 }
      ]);
    }
  }

  findAll() {
    return this.restaurantsRepository.find({ order: { id: 'ASC' } });
  }
}
