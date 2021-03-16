import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LayoutModule, BreakpointObserver } from '@angular/cdk/layout';
import {
  async,
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';

import { AuthService } from './../../services/auth.service';
import { SearchService } from './../../services/search.service';

import { NavBarComponent } from './nav-bar.component';
import { of } from 'rxjs';

jest.mock('./../../services/auth.service');
jest.mock('./../../services/search.service');
describe('NavBarComponent', () => {
  let authService: AuthService;
  let searchService: SearchService;

  let component: NavBarComponent;
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NavBarComponent],

      imports: [
        NoopAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        MatSidenavModule,
        MatToolbarModule,
        RouterTestingModule,
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [AuthService, SearchService, BreakpointObserver]
    }).compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.inject(AuthService);
    searchService = TestBed.inject(SearchService);
    searchService.search = jest.fn().mockResolvedValue(true);

    authService.observe = jest.fn().mockReturnValue(of(true));
    authService.logout = jest.fn();

    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the navbar component', () => {
    expect(component).toBeTruthy();
  });

  describe('ngOnInit', () => {
    it('should set isLoggedIn', fakeAsync(() => {
      component.isLoggedIn = false;
      component.ngOnInit();
      flush();

      expect(component.isLoggedIn).toBe(true);
    }));
  });

  describe('ngOnDestroy', () => {
    it('should unsubscribe', done => {
      component.$subs.add(() => {
        done();
        expect(component.$subs.closed).toBe(true);
      });
      component.ngOnDestroy();
    });
  });

  describe('logout', () => {
    it('should should invoke authservice.logout', () => {
      component.logout();
      expect(authService.logout).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleKeyup', () => {
    beforeEach(() => {
      component.search = jest.fn();
    });

    it('should invoke search if {enter} key', () => {
      const keyCode = 13;

      component.handleKeyup({ keyCode });

      expect(component.search).toHaveBeenCalledTimes(1);
    });

    it('should do nothing when NOT {enter} key', () => {
      const keyCode = 1;

      component.handleKeyup({ keyCode });

      expect(component.search).toHaveBeenCalledTimes(0);
    });
  });

  describe('search', () => {
    it('should escape if term is falsy', () => {
      component.searchInput.setValue(null);
      const result = component.search();

      expect(result).toBeUndefined();
      expect(searchService.search).toHaveBeenCalledTimes(0);
      expect(component.searchInput.value).toBe(null);
    });

    it('should escape if term length is less than three', () => {
      const term = 'go';
      component.searchInput.setValue(term);
      const result = component.search();

      expect(result).toBeUndefined();
      expect(searchService.search).toHaveBeenCalledTimes(0);
      expect(component.searchInput.value).toBe(term);
    });

    it('should invoke service and reset the form on search', () => {
      const term = 'goo';
      component.searchInput.setValue(term);
      const result = component.search();

      expect(result).toBeUndefined();
      expect(searchService.search).toHaveBeenCalledTimes(1);
      expect(component.searchInput.value).toBe('');
    });
  });
});
