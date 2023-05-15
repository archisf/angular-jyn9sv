import { Component } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query';
import { columns, fields } from './filesystem';
import { data, Item } from './data';

@Component({
  selector: 'my-app',
  template: `
    <kendo-treelist
    #treeList
      kendoTreeListExpandable
      [kendoTreeListHierarchyBinding]="data"
      childrenField="contents"
      [pageable]="true"
      [pageSize]="20"
      [sortable]="true"
      [sort]="sort"
      [height]="800"
    >
      <kendo-treelist-column [expandable]="true" field="name" title="Name" [width]="150">
        <ng-template class="temp" kendoTreeListCellTemplate let-dataItem>
          <span class="k-icon k-i-{{ dataItem.contents !== null ? 'tell-a-friend' : 'user' }}"></span>
          {{ dataItem.cel0 }}
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
          <span [ngClass]="{'k-icon k-i-tell-a-friend': level === 1 }"></span>
          <span
            cellDirective
            [dataItem]="dataItem"
            [columnIndex]="columnIndex"
            [rowIndex]="rowIndex"
            [column]="column"
            [level]="level"
            [ngClass]="{level2: level === 2, 'level1': level === 1, special: level === 1 && dataItem.id === 16}"
          >
            {{ columnIndex === 0 ? dataItem.cel0 : dataItem[fields[columnIndex]]?.name }}{{ level }}
          </span>
          
        </ng-template>
      </kendo-treelist-column>
    </kendo-treelist>
    <grid-context-menu [for]="treeList" [menuItems]="['Move Up', 'Move Down']"></grid-context-menu>

  `,
})
export class AppComponent {
  public data: Item[] = data;
  width = 120;
  fields = fields;
  columns = columns;

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
}
