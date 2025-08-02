import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-observable',
  standalone: true,
  imports: [],
  templateUrl: './observable.component.html',
  styleUrl: './observable.component.scss'
})
export class ObservableComponent implements OnInit, OnDestroy {
  value = '';
  tick = 0;
  transformedTick = 0;
  subscription?: Subscription;
  transformedSub?: Subscription;

  ngOnInit(): void {
    // Observable simple
    const myObservable = new Observable<string>(observer => {
      observer.next('Bonjour');
      observer.next('Wael');
      observer.next('👋');
      observer.complete();
    });

    myObservable.subscribe({
      next: val => this.value = val,
      complete: () => console.log('Flux terminé ✅')
    });

    // Observable avec interval brut
    const interval$ = interval(1000);

    this.subscription = interval$.subscribe(val => {
      this.tick = val;
    });

    // Observable avec filter + map
    const transformed$ = interval$.pipe(
      filter(val => val % 2 === 0),  // conserve les nombres pairs
      map(val => val * 10)           // multiplie par 10
    );

    this.transformedSub = transformed$.subscribe(val => {
      this.transformedTick = val;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    this.transformedSub?.unsubscribe();
  }
}
