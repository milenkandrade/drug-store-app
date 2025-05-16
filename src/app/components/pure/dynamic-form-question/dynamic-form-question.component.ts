import { Component, input } from '@angular/core';
import QuestionBase from '../../../models/question-base';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dynamic-form-question',
  imports: [ReactiveFormsModule],
  template: `
    <div [formGroup]="form()">
      <label [attr.for]="question().key">{{ question().label }}</label>
      <div>
        @switch (question().controlType) { @case ('textbox') {
        <input
          [formControlName]="question().key"
          [id]="question().key"
          [type]="question().type"
        />
        } @case ('dropdown') {
        <select [id]="question().key" [formControlName]="question().key">
          @for (opt of question().options; track opt) {
          <option [value]="opt.key">{{ opt.value }}</option>
          }
        </select>
        } }
      </div>
      @if (!isValid) {
      <div class="errorMessage">{{ question().label }} is required</div>
      }
    </div>
  `,
  styles: ``,
})
export class DynamicFormQuestionComponent {
  question = input.required<QuestionBase<string>>();
  form = input.required<FormGroup>();

  get isValid() {
    return this.form().controls[this.question().key].valid;
  }
}
