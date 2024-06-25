import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaginationComponent {
  @Input() pageIndex: number = 0;
  @Input() pageSize: number = 0;
  @Input() totalItems: number = 0;
  @Output() changePage = new EventEmitter<number>();

  onChangePage(requestedPageIndex: number) {
    if (requestedPageIndex === this.pageIndex) return;

    this.changePage.emit(requestedPageIndex);
  }

  get pageIndexes(): number[] {
    const pageIndexes: number[] = [];
    const totalPages = Math.ceil(this.totalItems / this.pageSize);

    for (let i = 0; i < totalPages; i++) pageIndexes.push(i);

    return pageIndexes;
  }

  get hasPreviousPage(): boolean {
    return this.pageIndex > 0;
  }

  get hasNextPage(): boolean {
    return (this.pageIndex + 1) * this.pageSize < this.totalItems;
  }
}
