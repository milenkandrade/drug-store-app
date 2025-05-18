import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DataTable } from '../../../models/data-table';
import { EditComponent } from "../../icons/edit/edit.component";
import { DeleteComponent } from "../../icons/delete/delete.component";
import { PaginationComponent } from "../../pure/pagination/pagination.component";
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dynamic-table',
  imports: [EditComponent, DeleteComponent, PaginationComponent, DatePipe],
  template: `
    <div class="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table class="table">
        <!-- head -->
        <thead>
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
                  @case('date') {
                    <td key="$index" >{{ row[item.key] | date }}</td>
                  }
                  @case('actions') {
                    <td>
                      <div class="dropdown dropdown-bottom dropdown-end ">
                        <div tabindex="0" role="button" class="btn btn-ghost btn-sm btn-primary">...</div>
                        <ul tabindex="0" class="dropdown-content menu bg-base-100 rounded-box
                          z-1 w-30 p-1 gap-1 shadow-sm">
                          <li class="border-b-1 p-2  border-neutral-content" >Actions</li>
                          <li ><a><icon-edit/>Edit</a></li>
                          <li ><a><icon-delete class="text-secondary" />Remove</a></li>
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
    <div class="flex items-center justify-between p-5 " >
        <span>{{ getStatusTable() }}</span>
          <app-pagination
          [actualPage]="actualPage"
          [totalPages]="(totalPages)"
          (futurePage)="sendFuturePage($event)"
        />
      </div>
  `,
  styles: ``
})
export class DynamicTableComponent {
  @Input() dataForm?: DataTable<any>
  @Input() numberOfRows: number = 0
  @Input() lengthTotalData:number = 0
  @Input() elementsType: string = ''
  @Input() actualPage: number = 0
  @Input() totalPages: number = 0
  @Output() futurePage = new EventEmitter<number>()

  sendFuturePage(page: number) {
    this.futurePage.emit(page)
  }

  getStatusTable() {
    const dataLength = this.dataForm?.data?.length
    const actualNumber = dataLength != this.numberOfRows ? dataLength : this.numberOfRows
    return `Showing ${actualNumber} of ${this.lengthTotalData} ${this.elementsType}`
  }
}
