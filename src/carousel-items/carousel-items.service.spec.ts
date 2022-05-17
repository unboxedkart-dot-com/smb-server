import { Test, TestingModule } from '@nestjs/testing';
import { CarouselItemsService } from './carousel-items.service';

describe('CarouselItemsService', () => {
  let service: CarouselItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarouselItemsService],
    }).compile();

    service = module.get<CarouselItemsService>(CarouselItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
