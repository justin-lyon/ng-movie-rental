import { ActivatedRoute } from '@angular/router';

export const MockActivatedRoute = {
  provide: ActivatedRoute,
  useValue: {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue(1)
      }
    }
  }
};
