import { SearchService } from './../../services/search.service';
import { FormControl } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import {
  Component,
  ChangeDetectionStrategy,
  OnInit,
  OnDestroy
} from '@angular/core';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NavBarComponent implements OnInit, OnDestroy {
  $subs: Subscription;
  isLoggedIn = false;

  searchInput = new FormControl();

  constructor(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars-experimental
    private breakpointObserver: BreakpointObserver,
    private authService: AuthService,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.$subs = this.authService.observe().subscribe(isLoggedIn => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  ngOnDestroy(): void {
    this.$subs.unsubscribe();
  }

  handleKeyup({ keyCode }): void {
    if (keyCode === 13) {
      this.search();
    }
  }

  search() {
    const term = this.searchInput.value.toLowerCase();
    const aintEnough = !term || term.length < 3;
    if (aintEnough) return;

    this.searchService.search(term);
    this.searchInput.setValue('');
  }

  logout(): void {
    this.authService.logout();
  }
}
