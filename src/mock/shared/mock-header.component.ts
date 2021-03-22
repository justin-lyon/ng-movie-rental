import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-header',
  template: ''
})
export class MockHeaderComponent {
  @Input()
  title: string;
  @Input()
  subtitle: string;
}
