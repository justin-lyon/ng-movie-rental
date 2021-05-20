import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs';

export const HttpClientMock = {
  provide: HttpClient,
  useValue: {
    get: jest.fn().mockReturnValue(of([]))
  }
};
