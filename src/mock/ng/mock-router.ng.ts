import { Router } from '@angular/router';

export const MockRouter = {
  provide: Router,
  useValue: {
    navigate: jest.fn().mockResolvedValue(true)
  }
};
