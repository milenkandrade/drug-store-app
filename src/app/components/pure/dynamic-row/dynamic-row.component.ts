import { Component, Input, ViewEncapsulation } from '@angular/core';
import DataHead from '../../../models/data-head';

@Component({
  selector: 'app-dynamic-row',
  imports: [],
  encapsulation: ViewEncapsulation.None,
  template: `
    @for (item of head; track $index) {
      @switch (item.type) {
        @case('order') {
          <th>{{$index+1}}</th>
        }
        @case('text') {
          <td>{{ row[item.key] }}</td>
        }
        @default {
          <td></td>
        }
      }
    }
  `,
  styles: ``
})
export class DynamicRowComponent {
  @Input() head: DataHead[] = []
  @Input() row: any = {}
}
