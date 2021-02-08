import { AuthService } from './../../services/auth.service';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
  constructor(
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService
  ) {}
}
