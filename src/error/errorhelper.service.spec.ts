import { Test, TestingModule } from '@nestjs/testing';
import { ErrorHelperService } from './errorhelper.service';

describe('ErrorhelperService', () => {
  let service: ErrorHelperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ErrorHelperService],
    }).compile();

    service = module.get<ErrorHelperService>(ErrorHelperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
