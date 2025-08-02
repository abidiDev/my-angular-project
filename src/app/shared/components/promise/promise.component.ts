import { Component } from '@angular/core';

@Component({
  selector: 'app-promise',
  standalone: true,
  imports: [],
  templateUrl: './promise.component.html',
  styleUrl: './promise.component.scss'
})
export class PromiseComponent {
  message = '';
  loading = false;

  ngOnInit(): void {
    this.loadMessage();
  }

  async loadMessage() {
    this.loading = true;

    try {
      const result = await this.simulateAsyncOperation();
      this.message = result;
    } catch (error) {
      this.message = 'Une erreur est survenue.';
    } finally {
      this.loading = false;
    }
  }

  simulateAsyncOperation(): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('✔️ Donnée simulée avec succès après 2 secondes !');
        // reject('❌ Échec simulé');
      }, 2000);
    });
  }
}
