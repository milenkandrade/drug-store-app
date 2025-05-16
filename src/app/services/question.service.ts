import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import QuestionBase from '../models/question-base';

@Injectable()
export class QuestionService {

  getQuestions() {
    const questions: QuestionBase<string>[] = [
      new QuestionBase({
        controlType: 'dropdown',
        key: 'favoriteAnimal',
        label: 'Favorite Animal',
        options: [
          {key: 'cat', value: 'Cat'},
          {key: 'dog', value: 'Dog'},
          {key: 'horse', value: 'Horse'},
          {key: 'capybara', value: 'Capybara'},
        ],
        order: 3,
      }),
      new QuestionBase({
        controlType: 'textbox',
        key: 'firstName',
        label: 'First name',
        value: 'Alex',
        required: true,
        order: 1,
      }),
      new QuestionBase({
        controlType: 'textbox',
        key: 'emailAddress',
        label: 'Email',
        type: 'email',
        order: 2,
      }),
    ];
    return of(questions.sort((a, b) => a.order - b.order));
  }
}
