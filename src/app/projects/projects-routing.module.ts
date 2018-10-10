import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectsComponent } from './projects.component';
import { ProjectComponent } from './project/project.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
  {
    path: '',
    component: ProjectsComponent,
    children: [
      {
        path: '',
        component: IndexComponent,
      },
      {
        path: ':id',
        component: ProjectComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectsRoutingModule {}
