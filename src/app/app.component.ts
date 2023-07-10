import { State, process } from '@progress/kendo-data-query';
import {
  Component,
  NgZone,
  OnInit,
  Renderer2,
  AfterViewInit,
  OnDestroy,
  ViewEncapsulation,
  ViewChild,
} from '@angular/core';
import { Content, GanttEntry, Item, data } from './data';

import { HttpClient } from '@angular/common/http';
import { Subscription, fromEvent, take, tap } from 'rxjs';
import { fields } from './filesystem';
import { RowClassArgs } from '@progress/kendo-angular-grid';
import { TreeListComponent } from '@progress/kendo-angular-treelist';
import { state } from '@angular/animations';

const isTableRow = (node) => node.tagName.toLowerCase() === 'tr';

const tableCell = (node) => node.tagName.toLowerCase() === 'td';

const closest = (node, predicate) => {
  while (node && !predicate(node)) {
    node = node.parentNode;
  }
  return node;
};

@Component({
  selector: 'my-app',
  template: `
    <kendo-treelist
      #treeList
      kendoTreeListExpandable
      [kendoTreeListHierarchyBinding]="gridData.data"
      childrenField="Contents"
      [expandBy]="'id'"
      [expandedKeys]="expandedKeys"
      (expandedKeysChange)="onKeysChanged($event)"
      [pageable]="true"
      [skip]="state.skip"
      [pageSize]="state.take"
      [height]="900"
      (dataStateChange)="dataStateChange($event)"
      (pageChange)="dataStateChange($event)"
      (expand)="onExpand($event)"
      [rowClass]="rowCallback"
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
  encapsulation: ViewEncapsulation.None,
  styles: [
    `
      .k-grid tr.dragging {
        background-color: #f45c42;
      }
    `,
  ],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('treeList', { static: true }) treeList: TreeListComponent;
  public state: State = {
    skip: 0,
    take: 30,
  };
  public data: Item[] = data;
  newData: GanttEntry = null;
  public gridData: any = process<Content>(this.newData?.Contents || [], this.state);

  width = 120;
  fields = fields;
  columns = [];
  public allParentNodes = [];
  public expandedKeys: any[] = this.allParentNodes.slice();
  private currentSubscription: Subscription;

  constructor(private http: HttpClient, private renderer: Renderer2, private zone: NgZone) {}

  public ngAfterViewInit(): void {
    this.currentSubscription = this.handleDragAndDrop();
  }

  public ngOnDestroy(): void {
    this.currentSubscription.unsubscribe();
  }

  public rowCallback(context: RowClassArgs) {
    return {
      dragging: context.dataItem.dragging,
    };
  }

  public dataStateChange(state: State): void {
    console.log('state##################################', state);
    this.state = state;
    this.gridData = process(this.gridData.data, this.state);
    this.currentSubscription.unsubscribe();
    this.zone.onStable.pipe(take(1)).subscribe(() => (this.currentSubscription = this.handleDragAndDrop()));
  }

  ngOnInit() {
    this.http
      .post('http://Opti2012/ESIIAPIGetData/gantt/FillData', {
        DepartmentId: 2,
        BeginDate: '2023-03-04',
        EndDate: '2023-03-10',
      })
      .subscribe((res: GanttEntry) => {
        this.gridData = process<Content>(res?.Contents || [], this.state);
        // this.newData = res as GanttEntry;
        for (let i = 0; i < 7; i++) {
          if (res[`datename${i + 1}`]) {
            this.columns.push({ field: `x${i + 1}`, title: res[`datename${i + 1}`] });
          }
          this.fields.push(`x${i + 1}`);
        }
        this.getAllParentTextProperties(this.gridData.data);
        console.log('columns', this.columns);
        console.log('fields', this.fields);
        this.currentSubscription.unsubscribe();
        this.zone.onStable.pipe(take(1)).subscribe(() => (this.currentSubscription = this.handleDragAndDrop()));
      });

    // for (let i = 0; i < 7; i++) {
    //   this.columns.push({ field: `x${i + 1}.name`, title: `x${i + 1}` });
    //   this.fields.push(`x${i + 1}`);
    // }
    // this.getAllParentTextProperties(this.gridData.data);
  }

  public expandNodes() {
    console.log('expandNodes');
    this.expandedKeys = this.allParentNodes.slice();
  }

  public collapseNodes() {
    console.log('collapseNodes');
    this.expandedKeys = [];
  }

  public getAllParentTextProperties(items: Array<Content>) {
    items?.forEach((i) => {
      if (i.Contents) {
        this.allParentNodes.push(i.id);
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

  onKeysChanged(e) {
    this.expandedKeys = e;
  }

  private handleDragAndDrop(): Subscription {
    const sub = new Subscription(() => {});
    let draggedItemIndex;
    let draggedParentIndex;
    let draggedGrandIndex;
    let draggedRowIndex;
    let draggedColumnIndex;

    let dropItemIndex;
    let dropParentIndex;
    let dropGrandIndex;
    let dropRowIndex;
    let dropColumnIndex;

    let draggedItem;
    let droppedItem;

    const setNull = () => {
      draggedItemIndex = null;
      draggedParentIndex = null;
      draggedGrandIndex = null;
      draggedRowIndex = null;
      draggedColumnIndex = null;

      dropItemIndex = null;
      dropParentIndex = null;
      dropGrandIndex = null;
      dropRowIndex = null;
      dropColumnIndex = null;

      draggedItem = null;
      droppedItem = null;
    };

    const tableRows = Array.from(document.querySelectorAll('.k-grid td.available .level2'));
    tableRows.forEach((item) => {
      this.renderer.setAttribute(item, 'draggable', 'true');
      const dragStart = fromEvent<DragEvent>(item, 'dragstart');
      const dragOver = fromEvent(item, 'dragover');
      const dragEnd = fromEvent(item, 'dragend');

      sub.add(
        dragStart
          .pipe(
            tap(({ dataTransfer }) => {
              try {
                const dragImgEl = document.createElement('span');
                dragImgEl.setAttribute(
                  'style',
                  'position: absolute; display: block; top: 0; left: 0; width: 0; height: 0;'
                );
                document.body.appendChild(dragImgEl);
                dataTransfer.setDragImage(dragImgEl, 0, 0);
              } catch (err) {
                // IE doesn't support setDragImage
              }
              try {
                // Firefox won't drag without setting data
                dataTransfer.setData('application/json', '');
              } catch (err) {
                // IE doesn't support MIME types in setData
              }
            })
          )
          .subscribe(({ target }) => {
            const cell = <HTMLTableCellElement>target;
            const row = <HTMLTableRowElement>cell.parentElement;
            const cell1 = <HTMLTableCellElement>closest(cell, tableCell);
            console.log('dragStart!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', cell1);
            // if (!cell1.hasAttribute('data-worker')) {
            //   return;
            // }
            const tableRow: HTMLTableRowElement = <HTMLTableRowElement>closest(cell, isTableRow);

            const level = cell1.getAttribute('data-level');
            const id = cell1.getAttribute('data-child');
            const parentId = cell1.getAttribute('data-parent');
            const grandParentId = cell1.getAttribute('data-grand');

            // const cell: HTMLTableCellElement = <HTMLTableCellElement>target;
            // draggedItemIndex = cell1.cellIndex;
            // draggedRowIndex = tableRow.rowIndex;

            draggedGrandIndex = this.gridData.data.findIndex((i) => i.id === +grandParentId);
            draggedParentIndex = this.gridData.data[draggedGrandIndex].Contents.findIndex((i) => i.id === +parentId);
            draggedItemIndex = this.gridData.data[draggedGrandIndex].Contents[draggedParentIndex].Contents.findIndex(
              (i) => i.id === +id
            );
            draggedRowIndex = tableRow.rowIndex;
            draggedColumnIndex = cell1.cellIndex;

            console.log('draggedItemIndex', draggedItemIndex);
            console.log('draggedParentIndex', draggedParentIndex);
            console.log('draggedGrandIndex', draggedGrandIndex);

            draggedItem = this.gridData.data[draggedGrandIndex].Contents[draggedParentIndex].Contents[draggedItemIndex];
            draggedItem.dragging = true;

            // const dataItem = this.gridData.data[draggedRowIndex]?.Contents[draggedItemIndex];
            // console.log('dataItem', draggedRowIndex, draggedRowIndex, dataItem);
            // if (dataItem) dataItem.dragging = true;
          })
      );

      sub.add(
        dragOver.subscribe((e: any) => {
          e.preventDefault();
          const point2 = <HTMLTableCellElement>e.target;
          const cell2 = <HTMLTableCellElement>closest(point2, tableCell);
          const tableRow2: HTMLTableRowElement = <HTMLTableRowElement>closest(point2, isTableRow);

          const id = cell2.getAttribute('data-child');
          const parentId = cell2.getAttribute('data-parent');
          const grandParentId = cell2.getAttribute('data-grand');
          dropRowIndex = tableRow2.rowIndex;
          dropColumnIndex = cell2.cellIndex;

          dropGrandIndex = this.gridData.data.findIndex((i) => i.id === +grandParentId);
          dropParentIndex = this.gridData.data[dropGrandIndex].Contents.findIndex((i) => i.id === +parentId);
          dropItemIndex = this.gridData.data[dropGrandIndex].Contents[dropParentIndex].Contents.findIndex(
            (i) => i.id === +id
          );

          droppedItem = this.gridData.data[dropGrandIndex].Contents[dropParentIndex].Contents[dropItemIndex];
          // const dataItem = this.gridData.data.splice(draggedItemIndex, 1)[0];
          // const dropIndex = closest(e.target, isTableRow).rowIndex;
          // const dropItem = this.gridData.data[dropIndex];

          // draggedItemIndex = dropIndex;
          // this.zone.run(() => this.gridData.data.splice(dropIndex, 0, dataItem));
        })
      );

      sub.add(
        dragEnd.subscribe((e: any) => {
          e.preventDefault();

          // this.zone.run(() => this.gridData.data.splice(dropIndex, 0, dataItem));
          this.zone.run(() => {
            // if (!draggedColumnIndex) {
            //   setNull();
            //   return;
            // }

            const one = draggedItem[`x${draggedColumnIndex}`];
            const two = droppedItem[`x${dropColumnIndex}`];

            if (one.data.WorkerID) {
              draggedItem[`x${draggedColumnIndex}`] = two;
              droppedItem[`x${dropColumnIndex}`] = one;
              }
            draggedItem.dragging = false;
            setNull();
          });

          // const dataItem = this.gridData.data[draggedItemIndex];
          // dataItem.dragging = false;
          // this.treeList.reload(dataItem, true);
          


        })
      );
    });

    return sub;
  }

  onExpand(e) {
    console.log('onExpand', e);
    this.dataStateChange(this.state);
  }
}
