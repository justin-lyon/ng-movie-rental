import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export const MockHttpClient = {
  provide: HttpClient,
  useValue: {
    get: jest.fn().mockReturnValue(of([]))
  }
};
