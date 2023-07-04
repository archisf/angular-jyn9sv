import { Directive, ElementRef, Input, OnChanges, OnInit, Renderer2, SimpleChanges } from '@angular/core';

import { fields } from './filesystem';

@Directive({
  selector: '[cellDirective]',
})
export class CellDirective implements OnInit, OnChanges {
  @Input() dataItem: any;
  @Input() column: any;
  @Input() rowIndex: any;
  @Input() columnIndex: string;
  @Input() level: number;
  @Input() ngClass: any;

  fields = fields;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (+this.columnIndex !== 0) {
      console.log(this.rowIndex, this.columnIndex, this.level);
      this.renderer.addClass(this.elRef.nativeElement.parentElement, 'available');
      if (this.level === 2) {
        this.renderer.addClass(this.elRef.nativeElement.parentElement, 'level2');
      }
    }

    if (+this.columnIndex !== 0 && this.dataItem[fields[this.columnIndex]]?.name) {
      // console.log(this.dataItem, this.columnIndex, this.column, this.rowIndex, this.level);
      // if (this.level === 1) {
      //   console.log('back');
      //   this.renderer.setStyle(
      //     this.elRef.nativeElement,
      //     'background-color',
      //     '#73AA67'
      //   );
      // }
      // this.renderer.setStyle(
      //   this.elRef.nativeElement.parentElement,
      //   'background-color',
      //   'red'
      // );
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    if (changes.dataItem) {
      console.log(changes.dataItem.currentValue);
    }
    if (+this.columnIndex !== 0) {
      console.log(this.rowIndex, this.columnIndex, this.level);
      if (changes.level.currentValue === 0) {
        this.elRef.nativeElement.parentElement.setAttribute('data-level', '0');
      } else if (changes.level.currentValue === 1) {
        this.elRef.nativeElement.parentElement.setAttribute('data-level', '1');
      } else if (changes.level.currentValue === 2) {
        this.elRef.nativeElement.parentElement.setAttribute('data-level', '2');
      }
    }
  }
}
