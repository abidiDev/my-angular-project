import { Component, OnInit } from '@angular/core';
import { ThemeService, ThemePref } from '../../shared/theme/theme.service';

@Component({
  standalone: true,
  selector: 'app-theme-toggle',
  templateUrl: './theme-toggle.component.html',
  styleUrl: './theme-toggle.component.scss'
})
export class ThemeToggleComponent implements OnInit {
  pref: ThemePref = 'system';

  constructor(private theme: ThemeService) {}

  ngOnInit(): void {
    this.theme.preference$.subscribe(p => this.pref = p);
  }

  setTheme(pref: ThemePref) {
    this.theme.setPreference(pref);
  }
}
