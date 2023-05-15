import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { columns, fields } from './filesystem';

@Directive({
  selector: '[cellDirective]',
})
export class CellDirective implements OnInit {
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
      this.renderer.addClass(this.elRef.nativeElement.parentElement, 'available')
    }

    if (
      +this.columnIndex !== 0 &&
      this.dataItem[fields[this.columnIndex]]?.name
    ) {
      console.log(this.dataItem, this.columnIndex, this.column, this.rowIndex, this.level);
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
}
