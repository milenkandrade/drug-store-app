import { Injectable } from '@angular/core';
import QuestionBase from '../models/question-base';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class QuestionControlService {
  toFormGroup(questions: QuestionBase<any>[]){
    const group: any = {};

    questions.forEach((question) => {
      group[question.key] = question.required
        ? new FormControl(question.value || '', Validators.required)
        : new FormControl(question.value || '');
    });
    return new FormGroup(group);
  }

  constructor() { }
}
