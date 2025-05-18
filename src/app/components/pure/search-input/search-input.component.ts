import { Component } from '@angular/core';
import { SearchComponent } from "../../icons/search/search.component";

@Component({
  selector: 'app-search-input',
  imports: [SearchComponent],
  template: `
    <label class="input w-full md:w-60">
      <icon-search />
      <input type="search" class="grow" placeholder="Search" />
    </label>
  `,
  styles: ``
})
export class SearchInputComponent {

}
