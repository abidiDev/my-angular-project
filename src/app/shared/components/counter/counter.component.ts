import { Component, computed, effect, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { interval } from 'rxjs';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.scss'
})
export class CounterComponent {
// 1. Signal principal
count = signal(Number(localStorage.getItem('count') || 0));

// 2. Méthodes de mise à jour
increment() {
  this.count.update(c => c + 1);
}

decrement() {
  this.count.update(c => c - 1);
}

reset() {
  this.count.set(0);
}

// 3. computed : double & version texte
doubleCount = computed(() => this.count() * 2);
countInWords = computed(() => {
  const words = ['zéro', 'un', 'deux', 'trois', 'quatre', 'cinq'];
  return words[this.count()] || 'trop grand';
});

// 4. effect : sauvegarde dans localStorage
constructor() {
  effect(() => {
    localStorage.setItem('count', String(this.count()));
    console.log('Sauvegardé dans le localStorage :', this.count());
  });
}

// 5. toSignal : convertit un RxJS interval
tick = toSignal(interval(1000), { initialValue: 0 });

}
