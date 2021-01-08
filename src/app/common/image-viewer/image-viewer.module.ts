import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageViewerComponent } from './image-viewer.component';
import { ImageViewerConfig } from './image-viewer-config.model';
import { FullscreenDirective } from './fullscreen.directive';




@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    FullscreenDirective,
    ImageViewerComponent
  ],
  exports: [
    FullscreenDirective,
    ImageViewerComponent
  ]
})
export class ImageViewerModule { 
  static forRoot(config?: ImageViewerConfig): ModuleWithProviders<ImageViewerModule> {
    return {
      ngModule: ImageViewerModule,
      providers: [{provide: 'config', useValue: config}]
    };
  }
}
