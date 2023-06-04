import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query';
import { GanttEntry, Item, data } from './data';
import { fields } from './filesystem';

@Component({
  selector: 'my-app',
  template: `
    <kendo-treelist
      #treeList
      kendoTreeListExpandable
      [kendoTreeListHierarchyBinding]="newData?.Contents"
      childrenField="Contents"
      [expandBy]="'name'"
      [(expandedKeys)]="expandedKeys"
      [pageable]="true"
      [pageSize]="30"
      [height]="900"
    >
      <kendo-treelist-column [expandable]="true" field="name" title="Name" [width]="150">
        <ng-template class="temp" kendoTreeListCellTemplate let-dataItem>
          <span class="k-icon k-i-{{ dataItem.level !== 2 ? 'tell-a-friend' : 'user' }}"></span>
          {{ dataItem.cel0.name }}
        </ng-template>
      </kendo-treelist-column>
      <kendo-treelist-column *ngFor="let col of columns" [field]="col.field" [title]="col.title" [width]="width">
        <ng-template
          kendoTreeListCellTemplate
          let-dataItem="dataItem"
          let-columnIndex="columnIndex"
          let-rowIndex="rowIndex"
          let-column="column"
          let-level="level"
        >
          <span [ngClass]="{ 'k-icon k-i-tell-a-friend': level === 1 && dataItem[fields[columnIndex]]?.name }"></span>
          <span
            cellDirective
            [dataItem]="dataItem"
            [columnIndex]="columnIndex"
            [rowIndex]="rowIndex"
            [column]="column"
            [level]="level"
            [ngClass]="{
              level2: level === 2 && dataItem[fields[columnIndex]]?.name,
              level1: level === 1 && dataItem[fields[columnIndex]]?.name,
              special: level === 1 && dataItem.id === 1022 && dataItem[fields[columnIndex]]?.name
            }"
          >
            {{
              columnIndex === 0
                ? dataItem.cel0.name
                : dataItem[fields[columnIndex]]?.name
                ? dataItem[fields[columnIndex]]?.name
                : ''
            }}
          </span>
        </ng-template>
      </kendo-treelist-column>
    </kendo-treelist>
    <grid-context-menu [for]="treeList" (select)="onSelect($event)"></grid-context-menu>
  `,
})
export class AppComponent implements OnInit {
  public data: Item[] = data;
  newData: GanttEntry = null;
  width = 120;
  fields = fields;
  columns = [];
  public allParentNodes = [];
  public expandedKeys: any[] = this.allParentNodes.slice();

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http
      .post('http://Opti2012/ESIIAPIGetData/gantt/FillData', {
        DepartmentId: 2,
        BeginDate: '2023-05-07',
        EndDate: '2023-05-14',
      })
      .subscribe((res) => {
        this.newData = res as GanttEntry;
        for (let i = 0; i < 7; i++) {
          if (this.newData[`datename${i + 1}`]) {
            this.columns.push({ field: `x${i + 1}`, title: this.newData[`datename${i + 1}`] });
          }
          this.fields.push(`x${i + 1}`);
        }
        this.getAllParentTextProperties(this.newData.Contents);
        console.log('columns', this.columns);
        console.log('fields', this.fields);
      });
  }

  public expandNodes() {
    this.expandedKeys = this.allParentNodes.slice();
  }

  public collapseNodes() {
    this.expandedKeys = [];
  }

  public sort: SortDescriptor[] = [
    {
      field: 'type',
      dir: 'asc',
    },
    {
      field: 'name',
      dir: 'asc',
    },
  ];

  public getAllParentTextProperties(items: Array<any>) {
    items.forEach((i) => {
      if (i.Contents) {
        this.allParentNodes.push(i.name);
        this.getAllParentTextProperties(i.Contents);
      }
    });
  }

  public onSelect(e) {
    console.log(e);
    if (e.item === 'הרכב') {
      this.expandNodes();
    } else if (e.item === 'צמצם') {
      this.collapseNodes();
    }
  }
}
