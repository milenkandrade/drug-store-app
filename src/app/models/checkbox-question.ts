import QuestionBase from "./question-base";

class CheckBoxQuestion extends QuestionBase<boolean> {
  override controlType = 'checkbox';
}
