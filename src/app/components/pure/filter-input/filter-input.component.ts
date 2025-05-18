import { Component, Input } from '@angular/core';
import { FilterComponent } from "../../icons/filter/filter.component";
import FilterTable from '../../../models/filter-table';

@Component({
  selector: 'app-filter-input',
  imports: [FilterComponent],
  template: `
    <select class="select">
      <option selected disabled >
        <icon-filter /><span>{{ options[0].name }}</span>
      </option>
      @for(option of options.slice(1); track option) {
        <option>{{ option.name }}</option>
      }
    </select>
  `,
  styles: ``
})
export class FilterInputComponent {
  @Input() options: FilterTable[] = []
}
