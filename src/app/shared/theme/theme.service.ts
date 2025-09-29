import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export type ThemePref = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

const LS_KEY = 'app.theme.pref';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private pref$ = new BehaviorSubject<ThemePref>(this.loadPref());

  // observable exposé aux composants
  preference$: Observable<ThemePref> = this.pref$.asObservable();

  constructor() {
    this.applyTheme(this.resolveTheme(this.pref$.value));
    window.matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', () => {
        if (this.pref$.value === 'system') {
          this.applyTheme(this.resolveTheme('system'));
        }
      });
  }

  setPreference(pref: ThemePref) {
    this.pref$.next(pref);
    localStorage.setItem(LS_KEY, pref);
    this.applyTheme(this.resolveTheme(pref));
  }

  private resolveTheme(pref: ThemePref): ResolvedTheme {
    if (pref === 'system') {
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return pref;
  }

  private applyTheme(theme: ResolvedTheme) {
    document.documentElement.setAttribute('data-theme', theme);
  }

  private loadPref(): ThemePref {
    const raw = localStorage.getItem(LS_KEY);
    return raw === 'light' || raw === 'dark' || raw === 'system' ? raw : 'system';
  }
}
