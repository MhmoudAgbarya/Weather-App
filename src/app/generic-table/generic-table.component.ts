import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-table',
  templateUrl: './generic-table.component.html',
  styleUrls: ['./generic-table.component.scss']
})
export class GenericTableComponent implements OnInit {

  @Input() tableData;
  @Input() tableSetting;

  sortDirection = "ASC"

  constructor() {
  }

  ngOnInit(): void {
  }

  sortBy(key){
    this.tableData.sort((a,b)=>{
      if(this.sortDirection === "ASC"){
        return b[key] - a[key]
      }else{
        return a[key] - b[key]
      }
    })
    this.sortDirection === "ASC" ? this.sortDirection = "DESC" : this.sortDirection = "ASC"
  }

}
