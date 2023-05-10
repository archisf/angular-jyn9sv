import { Component } from '@angular/core';
import { SortDescriptor } from '@progress/kendo-data-query';
import { filesystem, Entry } from './filesystem';

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
        <kendo-treelist-column [expandable]="true" field="name" title="Name" [width]="250">
            <ng-template kendoTreeListCellTemplate let-dataItem>
                <span class="k-icon k-i-{{ dataItem.type === 'directory' ? 'folder' : 'file' }}"></span>
                {{ dataItem.name }}
            </ng-template>
        </kendo-treelist-column>
        <kendo-treelist-column-group title="File Info">

            <kendo-treelist-column field="size" title="Size" [width]="width" >
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
            <kendo-treelist-column field="size2" title="Size2" [width]="width">
            </kendo-treelist-column>
            <kendo-treelist-column field="size3" title="Size3" [width]="width">
            </kendo-treelist-column>
            <kendo-treelist-column field="size3" title="Size3" [width]="width">
            </kendo-treelist-column>
            <kendo-treelist-column field="size3" title="Size3" [width]="width">
            </kendo-treelist-column>

        </kendo-treelist-column-group>
      </kendo-treelist>
  `,
})
export class AppComponent {
  public data: Entry[] = filesystem;
  width = 65

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
