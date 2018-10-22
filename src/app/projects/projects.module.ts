import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProjectsRoutingModule } from './projects-routing.module';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { MaterialModule } from '../material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IndexComponent } from './index/index.component';
import { NewProjectFormComponent } from './new-project-form/new-project-form.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ProjectCardComponent } from './index/project-card/project-card.component';
import { LoadingSpinnerComponent } from './loading-spinner/loading-spinner.component';
import { NewTaskFormComponent } from './new-task-form/new-task-form.component';
import { TaskComponent } from './project/task/task.component';
import { SortableDirective } from './sortable.directive';
import { MainComponent } from './main/main.component';

@NgModule({
  imports: [
    CommonModule,
    ProjectsRoutingModule,
    MaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    ProjectsComponent,
    ProjectComponent,
    IndexComponent,
    NewProjectFormComponent,
    ProjectCardComponent,
    LoadingSpinnerComponent,
    NewTaskFormComponent,
    TaskComponent,
    SortableDirective,
    MainComponent,
  ],
  entryComponents: [NewProjectFormComponent, NewTaskFormComponent],
})
export class ProjectsModule {}
