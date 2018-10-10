import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IndexComponent } from './index/index.component';
@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
  ],
  declarations: [ProjectsComponent, ProjectComponent, IndexComponent]
})
export class ProjectsModule { }
