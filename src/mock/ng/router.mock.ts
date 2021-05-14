import { Router } from '@angular/router';

export const RouterMock = {
  provide: Router,
  useValue: {
    navigate: jest.fn().mockResolvedValue(true)
  }
};
