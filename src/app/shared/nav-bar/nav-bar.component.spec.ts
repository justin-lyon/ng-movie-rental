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

import { NavBarComponent } from './nav-bar.component';
import { of } from 'rxjs';

jest.mock('./../../services/auth.service');
describe('NavBarComponent', () => {
  let authService: AuthService;
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
        RouterTestingModule
      ],
      providers: [AuthService, BreakpointObserver]
    }).compileComponents();
  }));

  beforeEach(() => {
    authService = TestBed.inject(AuthService);

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
});
