import { Component } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-observable',
  standalone: true,
  imports: [],
  templateUrl: './observable.component.html',
  styleUrl: './observable.component.scss'
})
export class ObservableComponent {
  value = '';
  tick = 0;
  subscription?: Subscription;


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

    // Observable avec interval
    const interval$ = interval(1000); // émet 0,1,2... chaque 1 sec

    this.subscription = interval$.subscribe(val => {
      this.tick = val;
    });
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe(); // important !
  }
}
