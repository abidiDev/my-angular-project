import { Component } from '@angular/core';
import { ThemeToggleComponent } from '../theme-toggle/theme-toggle.component';

@Component({
  standalone: true,
  selector: 'app-theme-demo',
  imports: [ThemeToggleComponent],
  templateUrl: './theme-demo.component.html'
})
export class ThemeDemoComponent {}
