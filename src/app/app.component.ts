import { Component } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query';
import { filesystem, Entry, columns } from './filesystem';

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
                <span class="k-icon k-i-{{ dataItem.type === 'directory' ? 'tell-a-friend' : 'user' }}"></span>
                {{ dataItem.name }}
            </ng-template>
        </kendo-treelist-column>
        <kendo-treelist-column *ngFor="let col of columns" [field]="col.field" [title]="col.title" [width]="width" >
        </kendo-treelist-column>


        <kendo-treelist-column-group title="File Info">

            <kendo-treelist-column field="x1.name" title="x1.title" [width]="width" >
            </kendo-treelist-column>
            <kendo-treelist-column field="size2" title="Size2" [width]="width">
            </kendo-treelist-column>
            <kendo-treelist-column field="size3" title="Size3" [width]="width">
            </kendo-treelist-column>
            <kendo-treelist-column field="size3" title="Size3" [width]="width">
            </kendo-treelist-column>
            <kendo-treelist-column field="size3" title="Size3" [width]="width">
            </kendo-treelist-column>
            <kendo-treelist-column field="size" title="Size" [width]="width">
            </kendo-treelist-column>
            <kendo-treelist-column field="size" title="Size" [width]="width">
            </kendo-treelist-column>



        </kendo-treelist-column-group>
      </kendo-treelist>
  `,
})
export class AppComponent {
  public data: Entry[] = filesystem;
  width = 120;
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
