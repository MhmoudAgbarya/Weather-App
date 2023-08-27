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

  sortDirection = 'ASC';

  constructor() {}

  ngOnInit(): void {}

  sortBy(key) {
    const sortRow = this.tableSetting.cols.find(
      (r) => r.customSort === true && r.key === key
    );
    if (sortRow) {
      this.customSort.emit({ key: key, sortDirection: this.sortDirection });
    } else {
      this.tableData.sort((a, b) => {
        if (this.sortDirection === 'ASC') {
          return b[key] - a[key];
        } else {
          return a[key] - b[key];
        }
      });
    }
    this.sortDirection === 'ASC'
      ? (this.sortDirection = 'DESC')
      : (this.sortDirection = 'ASC');
  }

  onRowClick(row) {
    this.onRowClicked.emit(row);
  }
}
