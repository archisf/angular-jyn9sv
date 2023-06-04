import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IntlModule } from '@progress/kendo-angular-intl';
import { TreeListModule } from '@progress/kendo-angular-treelist';

import { HttpClientModule } from '@angular/common/http';
import { GridModule } from '@progress/kendo-angular-grid';
import { PopupModule } from '@progress/kendo-angular-popup';
import { AppComponent } from './app.component';
import { CellDirective } from './cell.directive';
import { GridContextMenuComponent } from './grid-context-menu.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    TreeListModule,
    IntlModule,
    GridModule,
    PopupModule,
    HttpClientModule,
  ],
  declarations: [AppComponent, CellDirective, GridContextMenuComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
