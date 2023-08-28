import {
  AfterContentChecked,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss'],
})
export class GenericTableComponent implements OnInit {
  @Input() tableData;
  @Input() tableSetting;

  @Output() onRowClicked = new EventEmitter();
  @Output() customSort = new EventEmitter();

  constructor() {}

  ngOnInit(): void {
    this.tableSetting.cols.forEach((col) => (col.sortDirection = 'ASC'));
  }

  sortBy(key) {
    const sortColIndex = this.tableSetting.cols.findIndex(
      (r) => r.key === key || r.sortBy === key
    );
    if (this.tableSetting.cols[sortColIndex].customSort) {
      this.customSort.emit({
        key: key,
        sortDirection: this.tableSetting.cols[sortColIndex].sortDirection,
      });
    } else {
      this.tableData.sort((a, b) => {
        if (this.tableSetting.cols[sortColIndex].sortDirection === 'ASC') {
          return b[key] - a[key];
        } else {
          return a[key] - b[key];
        }
      });
    }
    this.tableSetting.cols[sortColIndex].sortDirection === 'ASC'
      ? (this.tableSetting.cols[sortColIndex].sortDirection = 'DESC')
      : (this.tableSetting.cols[sortColIndex].sortDirection = 'ASC');
  }

  onRowClick(row) {
    this.onRowClicked.emit(row);
  }
}
