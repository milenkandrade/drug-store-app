import { Component, Input } from '@angular/core';

@Component({
  selector: 'page-button',
  imports: [],
  template: `
    <button class="join-item btn hover:btn-primary"
    [class]="active ? 'btn-primary' : ''"
      [attr.aria-label]="'Go to page ' + (page)" >
      {{ page }}
    </button>
  `,
  styles: ``
})
export class PageButtonComponent {
  @Input() page: number = 0
  @Input() active: boolean = false
}
