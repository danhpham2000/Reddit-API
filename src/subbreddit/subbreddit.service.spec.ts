import { Test, TestingModule } from '@nestjs/testing';
import { SubbredditService } from './subbreddit.service';

describe('SubbredditService', () => {
  let service: SubbredditService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubbredditService],
    }).compile();

    service = module.get<SubbredditService>(SubbredditService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
