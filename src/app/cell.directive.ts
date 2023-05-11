import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { fields } from './filesystem';

@Directive({
  selector: '[cellDirective]',
})
export class CellDirective implements OnInit {
  @Input() dataItem: any;
  @Input() columnIndex: string;

  constructor(private elRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    if (+this.columnIndex !== 0 && this.dataItem) {
      this.renderer.setStyle(
        this.elRef.nativeElement.parentElement,
        'background-color',
        'red'
      );
    }
  }
}
