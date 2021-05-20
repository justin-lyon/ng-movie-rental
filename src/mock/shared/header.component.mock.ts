import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: ''
})
export class HeaderComponentMock {
  @Input()
  title: string;
  @Input()
  subtitle: string;
}
