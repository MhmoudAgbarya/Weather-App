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
    const sortCol = this.tableSetting.cols.find(
      (r) => r.key === key || r.sortBy === key
    );
    if (sortCol.customSort) {
      this.customSort.emit({ key: key, sortDirection: sortCol.sortDirection });
    } else {
      this.tableData.sort((a, b) => {
        if (sortCol.sortDirection === 'ASC') {
          return b[key] - a[key];
        } else {
          return a[key] - b[key];
        }
      });
    }
    sortCol.sortDirection === 'ASC'
      ? (sortCol.sortDirection = 'DESC')
      : (sortCol.sortDirection = 'ASC');
  }

  onRowClick(row) {
    this.onRowClicked.emit(row);
  }
}
