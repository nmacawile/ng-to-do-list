import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../../project';
import { MatDialog } from '@angular/material';
import { NewProjectFormComponent } from '../new-project-form/new-project-form.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit, OnDestroy {
  projects: Project[];
  projectsSub: Subscription;

  constructor(
    private projectsService: ProjectsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.projectsSub = this.projectsService
      .getProjects()
      .subscribe(projects => (this.projects = projects));
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }

  openNewProjectForm() {
    this.dialog.open(NewProjectFormComponent, { width: '400px' });
  }
}
