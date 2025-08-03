import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subject, BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-observable',
  standalone: true,
  imports: [],
  templateUrl: './observable.component.html',
  styleUrl: './observable.component.scss'
})
export class ObservableComponent implements OnInit, OnDestroy {
  // Subject
  subjectA = '';
  subjectB = '';
  private subject = new Subject<string>();
  private subjectSubA?: Subscription;
  private subjectSubB?: Subscription;

  // BehaviorSubject
  behaviorA = '';
  behaviorB = '';
  private behavior = new BehaviorSubject<string>('Valeur initiale');
  private behaviorSubA?: Subscription;
  private behaviorSubB?: Subscription;

  // Observable
  observableValue = '';
  private simpleObservable!: Observable<string>;
  private observableSub?: Subscription;

  ngOnInit(): void {
    // ---------- Subject ----------
    this.subjectSubA = this.subject.subscribe(v => {
      this.subjectA = `A reçu : ${v}`;
    });

    setTimeout(() => {
      this.subjectSubB = this.subject.subscribe(v => {
        this.subjectB = `B reçu : ${v}`;
      });
    }, 3000);

    // ---------- BehaviorSubject ----------
    this.behaviorSubA = this.behavior.subscribe(v => {
      this.behaviorA = `A reçu : ${v}`;
    });

    setTimeout(() => {
      this.behaviorSubB = this.behavior.subscribe(v => {
        this.behaviorB = `B reçu : ${v}`;
      });
    }, 3000);

    // ---------- Observable ----------
    this.simpleObservable = new Observable<string>(observer => {
      observer.next('Bonjour');
      observer.next('Wael');
      observer.next('👋');
      observer.complete();
    });

    this.observableSub = this.simpleObservable.subscribe({
      next: v => this.observableValue = v,
      complete: () => console.log('Observable terminé ✅')
    });
  }

  emitSubject() {
    const val = 'Subject ' + Math.floor(Math.random() * 100);
    this.subject.next(val);
  }

  emitBehavior() {
    const val = 'Behavior ' + Math.floor(Math.random() * 100);
    this.behavior.next(val);
  }

  ngOnDestroy(): void {
    this.subjectSubA?.unsubscribe();
    this.subjectSubB?.unsubscribe();
    this.behaviorSubA?.unsubscribe();
    this.behaviorSubB?.unsubscribe();
    this.observableSub?.unsubscribe();
  }
}
