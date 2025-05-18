import { Component, inject, OnDestroy } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Observable, Subject, takeUntil } from 'rxjs';
import QuestionBase from './models/question-base';
import { QuestionService } from './services/question.service';
import { SidebarComponent } from "./components/container/sidebar/sidebar.component";
import { PlatformService } from './services/platform.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SidebarComponent, AsyncPipe],
  providers: [QuestionService],
  template: `
    <!-- <div>
      <h2>Job Application for Heroes</h2>
      <app-dynamic-form [questions]="(questions$ | async) ?? []" (payload)="submit($event)" />
    </div>
    @if (payload) {
      <div class="form-row"><strong>Saved the following values</strong><br />{{ (payload | json) }}</div>
    } -->
  @if((isMobile | async)) {
    <div class="w-full h-full max-w-360 flex justify-self-center bg-base-100 mx-auto" >
      <app-sidebar />
    </div>
  }
  <div class="w-full h-full max-w-360 flex justify-self-center justify-center bg-base-100">
    @if(!(isMobile | async)) {
      <app-sidebar />
    }
    <router-outlet [hidden]="true" />
  </div>
  `,
  styles: ``
})
export class AppComponent implements OnDestroy {
  title = 'drug-store-app';
  questions$: Observable<QuestionBase<string>[]> = inject(QuestionService).getQuestions();
  payload: any = {};
  destroy = new Subject<void>()
  isMobile = inject(PlatformService).isMobile$.pipe(takeUntil(this.destroy))

  submit(values: any){
    this.payload = values
  }

  ngOnDestroy(): void {
    this.destroy.next()
    this.destroy.complete()
  }
}
