import { Component, ChangeDetectionStrategy } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navi',
  templateUrl: './navi.component.html',
  styleUrls: ['./navi.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NaviComponent {
  constructor(private breakpointObserver: BreakpointObserver) {}
}
