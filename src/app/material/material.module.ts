import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule, MatButtonModule, MatIconModule } from '@angular/material';

@NgModule({
  imports: [CommonModule],
  exports: [MatToolbarModule, MatButtonModule, MatIconModule],
  declarations: [],
})
export class MaterialModule {}
