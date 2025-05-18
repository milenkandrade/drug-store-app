import { Component, EventEmitter, Input, Output } from '@angular/core';

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

@Component({
  selector: 'app-pagination',
  imports: [PageButtonComponent],
  template: `
    @if(totalPages > 1) {
      <div class="join" role="navigation" aria-label="Pagination">
        <!-- Button to First Page-->
        <button class="join-item btn active:btn-primary"
          [class]="!(actualPage === 1) ? '' : 'btn-disabled'"
          [attr.aria-disabled]="actualPage === 1"
          [attr.aria-label]="'Go to first page'"
          (click)="sendFuturePage(1)">
          «
        </button>

        @if(totalPages < 5) {
          @for(pag of pages(totalPages); track $index; let i = $index) {
            <page-button [page]="i+1" [active]="actualPage === i+1"
              (click)="sendFuturePage(i+1)" />
          }
        } @else {
          @if(this.actualPage > 2){
            <page-button [page]="getPreviousPage()-1" [active]="false"
              (click)="sendFuturePage(getPreviousPage()-1)" />
          }
          @if(this.actualPage > 1){
            <page-button [page]="getPreviousPage()" [active]="false"
              (click)="sendFuturePage(getPreviousPage())" />
          }
          <page-button [page]="actualPage" [active]="true"
            (click)="sendFuturePage(actualPage)" />
          @if(this.actualPage < this.totalPages) {
            <page-button [page]="getNextPage()" [active]="false"
            (click)="sendFuturePage(getNextPage())" />
          }
          @if(this.actualPage+1 < this.totalPages) {
            <page-button [page]="getNextPage()+1" [active]="false"
            (click)="sendFuturePage(getNextPage()+1)" />
          }
        }

        <!-- Button to Last Page-->
        <button class="join-item btn active:btn-primary"
          [class]="!(totalPages === actualPage) ? '' : 'btn-disabled'"
          [attr.aria-disabled]="totalPages === actualPage"
          [attr.aria-label]="'Go to last page'"
          (click)="sendFuturePage(totalPages)">
          »
        </button>
      </div>
    }
  `,
  styles: ``
})
export class PaginationComponent {
  @Input() totalPages: number = 0
  @Input() actualPage: number = 0
  @Output() futurePage = new EventEmitter<number>()
  pages = (page: number) => new Array(page);

  sendFuturePage(page: number) {
    if (this.actualPage !== page) {
      this.futurePage.emit(page)
    }
  }

  getPreviousPage() {
    return this.actualPage > 1 ? this.actualPage - 1 : 1
  }

  getNextPage() {
    return this.actualPage < this.totalPages ? this.actualPage +1 : this.totalPages
  }
}
