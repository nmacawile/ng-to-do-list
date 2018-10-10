import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Observable } from 'rxjs';
import { Project } from '../../project';
import { MatDialog } from '@angular/material';
import { NewProjectFormComponent } from '../new-project-form/new-project-form.component';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(
    private projectsService: ProjectsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.projects$ = this.projectsService.getProjects();
  }

  openNewProjectForm() {
    this.dialog.open(NewProjectFormComponent, {width: '400px'});
  }
}
