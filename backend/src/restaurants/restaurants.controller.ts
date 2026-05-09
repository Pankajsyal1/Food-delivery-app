import { Controller, Get, Query } from '@nestjs/common';
import { RestaurantSortBy, RestaurantsService } from './restaurants.service';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}

  @Get()
  findAll(
    @Query('cuisine') cuisine?: string,
    @Query('search') search?: string,
    @Query('openNow') openNow?: 'true' | 'false',
    @Query('sortBy') sortBy?: RestaurantSortBy
  ) {
    return this.restaurantsService.findAll({
      cuisine,
      search,
      openNow: openNow === 'true',
      sortBy
    });
  }

  @Get('featured')
  findFeatured() {
    return this.restaurantsService.findFeatured();
  }
}
