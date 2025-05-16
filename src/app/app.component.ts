import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable } from 'rxjs';
import QuestionBase from './models/question-base';
import { QuestionService } from './services/question.service';
import { SidebarComponent } from "./components/container/sidebar/sidebar.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent],
  providers: [QuestionService],
  template: `
    <!-- <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="(questions$ | async) ?? []" (payload)="submit($event)" />
    </div>
    @if (payload) {
      <div class="form-row"><strong>Saved the following values</strong><br />{{ (payload | json) }}</div>
    } -->

  <div class="layout">
    <app-sidebar />
    <router-outlet [hidden]="true" />
  </div>

  `,
  styles: ``
})
export class AppComponent {
  title = 'drug-store-app';
  questions$: Observable<QuestionBase<string>[]> = inject(QuestionService).getQuestions();
  payload: any = {};

  submit(values: any){
    console.log('app: ',values);
    this.payload = values

  }
}
