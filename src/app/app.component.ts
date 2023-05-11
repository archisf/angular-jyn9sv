import { Component } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query';
import { Entry, columns, fields } from './filesystem';
import { data, Item } from './data';

@Component({
  selector: 'my-app',
  template: `
      <kendo-treelist
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
            <ng-template kendoTreeListCellTemplate let-dataItem>
                <span [ngClass]="{selected: true }" class="k-icon k-i-{{ dataItem.contents !== null ? 'tell-a-friend' : 'user' }}"></span>
                {{ dataItem.cel0 }}
            </ng-template>
        </kendo-treelist-column>
        <kendo-treelist-column *ngFor="let col of columns"  [field]="col.field" [title]="col.title" [width]="width">
          <ng-template let-dataItem="dataItem" let-columnIndex="columnIndex" cellDirective >
          {{coloumnIndex === 0 ? dataItem.cel0 : dataItem[fields[columnIndex]]  }}
          
          </ng-template>
        </kendo-treelist-column>
      </kendo-treelist>
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
