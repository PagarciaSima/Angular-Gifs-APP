import { CommonModule } from '@angular/common';
import { LazyImageComponent } from './Components/lazyImage/lazy-image.component';
import { NgModule } from '@angular/core';
import { SidebarComponent } from './Components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    SidebarComponent,
    LazyImageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SidebarComponent,
    LazyImageComponent
  ]
})
export class SharedModule { }
