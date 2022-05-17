import { Test, TestingModule } from '@nestjs/testing';
import { CarouselItemsController } from './carousel-items.controller';
import { CarouselItemsService } from './carousel-items.service';

describe('CarouselItemsController', () => {
  let controller: CarouselItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarouselItemsController],
      providers: [CarouselItemsService],
    }).compile();

    controller = module.get<CarouselItemsController>(CarouselItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
