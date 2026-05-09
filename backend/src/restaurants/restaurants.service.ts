import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Restaurant } from './restaurant.entity';

export type RestaurantSortBy = 'rating' | 'deliveryTime' | 'deliveryFee';

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
        {
          name: 'Burger Town',
          cuisine: 'American',
          deliveryTimeMinutes: 25,
          rating: 4.3,
          deliveryFee: 2.49,
          isOpen: true,
          isFeatured: true,
          promoPercent: 20
        },
        {
          name: 'Sushi Express',
          cuisine: 'Japanese',
          deliveryTimeMinutes: 35,
          rating: 4.8,
          deliveryFee: 3.99,
          isOpen: true,
          isFeatured: false,
          promoPercent: 0
        },
        {
          name: 'Pasta Place',
          cuisine: 'Italian',
          deliveryTimeMinutes: 30,
          rating: 4.6,
          deliveryFee: 1.99,
          isOpen: false,
          isFeatured: true,
          promoPercent: 15
        }
      ]);
    }
  }

  async findAll(query?: {
    cuisine?: string;
    search?: string;
    openNow?: boolean;
    sortBy?: RestaurantSortBy;
  }) {
    const qb = this.restaurantsRepository.createQueryBuilder('restaurant');

    if (query?.cuisine) {
      qb.andWhere('LOWER(restaurant.cuisine) = LOWER(:cuisine)', { cuisine: query.cuisine });
    }

    if (query?.search) {
      qb.andWhere('LOWER(restaurant.name) LIKE :search', { search: `%${query.search.toLowerCase()}%` });
    }

    if (query?.openNow) {
      qb.andWhere('restaurant.isOpen = :isOpen', { isOpen: true });
    }

    if (query?.sortBy === 'rating') {
      qb.orderBy('restaurant.rating', 'DESC');
    } else if (query?.sortBy === 'deliveryFee') {
      qb.orderBy('restaurant.deliveryFee', 'ASC');
    } else {
      qb.orderBy('restaurant.deliveryTimeMinutes', 'ASC');
    }

    return qb.getMany();
  }

  findFeatured() {
    return this.restaurantsRepository.find({ where: { isFeatured: true }, order: { rating: 'DESC' } });
  }
}
