import { Component, effect, inject, input, output } from '@angular/core';
import {FormGroup, ReactiveFormsModule} from '@angular/forms';
import QuestionBase from '../../../models/question-base';
import { QuestionControlService } from '../../../services/question-control.service';
import { DynamicFormQuestionComponent } from '../dynamic-form-question/dynamic-form-question.component';

@Component({
  selector: 'app-dynamic-form',
  providers: [QuestionControlService],
  imports: [ReactiveFormsModule, DynamicFormQuestionComponent],
  template: `
    <div>
      <form (ngSubmit)="onSubmit()" [formGroup]="form">
        @for (question of questions(); track question) {
          <div class="form-row">
            <app-dynamic-form-question [question]="question" [form]="form" />
          </div>
        }
        <div class="form-row">
          <button type="submit" [disabled]="!form.valid">Save</button>
        </div>
      </form>

    </div>

  `,
  styles: ``
})
export class DynamicFormComponent {

  private readonly qcs = inject(QuestionControlService);

  questions = input<QuestionBase<any>[]>([]);
  form = new FormGroup({});

  initialized = false
  payload = output<any>({});


  // constructor(){
  //   effect(()=>{
  //     this.form = this.qcs.toFormGroup(this.questions() as QuestionBase<string>[]);

  //   })
  // }

  constructor() {
    effect(() => {
      const currentQuestions = this.questions();
      if (!currentQuestions || currentQuestions.length === 0) return;


      this.form = this.qcs.toFormGroup(currentQuestions);



    });
  }

  onSubmit(){
    console.log('form: ',this.form.getRawValue());

    this.payload.emit(this.form.getRawValue());
  }



}
