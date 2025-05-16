import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DynamicFormComponent } from "./components/container/dynamic-form/dynamic-form.component";
import { AsyncPipe, JsonPipe } from '@angular/common';
import { Observable } from 'rxjs';
import QuestionBase from './models/question-base';
import { QuestionControlService } from './services/question-control.service';
import { QuestionService } from './services/question.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, DynamicFormComponent, AsyncPipe, JsonPipe],
  providers: [QuestionService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
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
