import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { columns, fields } from './filesystem';

@Directive({
  selector: '[cellDirective]',
})
export class CellDirective implements OnInit {
  @Input() dataItem: any;
  @Input() columnIndex: string;
  fields = fields;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (
      +this.columnIndex !== 0 &&
      this.dataItem[fields[this.columnIndex]]?.name
    ) {
      console.log(this.dataItem, this.columnIndex);
      if (this.dataItem.level === 1) {
        console.log('back');
        this.renderer.setStyle(
          this.elRef.nativeElement,
          'background-color',
          '#73AA67'
        );
      }

      // this.renderer.setStyle(
      //   this.elRef.nativeElement.parentElement,
      //   'background-color',
      //   'red'
      // );
    }
  }
}
