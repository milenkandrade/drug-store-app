import { Component, Input } from '@angular/core';
import { DataForm } from '../../../models/data-form';
import { EditComponent } from "../../icons/edit/edit.component";
import { DeleteComponent } from "../../icons/delete/delete.component";

@Component({
  selector: 'app-dynamic-table',
  imports: [EditComponent, DeleteComponent],
  template: `
    <div class="rounded-box border border-base-content/5 bg-base-100">
      <table class="table">
        <!-- head -->
        <thead>
          <th></th>
          <tr>
            @for(perHead of dataForm?.head; track $index) {
              <th>{{perHead.name}}</th>
            }
          </tr>
        </thead>
        <!-- body -->
        <tbody >
          @for(row of dataForm?.data; track $index) {
            <tr>
              @for (item of dataForm?.head; track $index) {
                @switch (item.type) {
                  @case('select') {
                    <th>
                      <input type="checkbox" checked="checked" class="checkbox checkbox-sm" />
                    </th>
                  }
                  @case('text') {
                    <td key="$index" >{{ row[item.key] }}</td>
                  }
                  @case('actions') {
                    <td>
                      <div class="dropdown dropdown-bottom dropdown-end">
                        <div tabindex="0" role="button" class="btn btn-ghost">...</div>
                        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box z-1 w-25 p-0 shadow-sm">
                          <li class="border-b-1 p-2  border-neutral-content" >Actions</li>
                          <li><a><icon-edit/>Edit</a></li>
                          <li><a><icon-delete class="text-secondary" />Remove</a></li>
                        </ul>
                      </div>
                    </td>
                  }
                  @default {
                    <td></td>
                  }
                }
              }
            </tr>
          }
        </tbody>
      </table>
    </div>
  `,
  styles: ``
})
export class DynamicTableComponent {
  @Input() dataForm?: DataForm<any>
}1
