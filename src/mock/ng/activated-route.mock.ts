import { ActivatedRoute } from '@angular/router';

export const ActivatedRouteMock = {
  provide: ActivatedRoute,
  useValue: {
    snapshot: {
      paramMap: {
        get: jest.fn().mockReturnValue(1)
      }
    }
  }
};
