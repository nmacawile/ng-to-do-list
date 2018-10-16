import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ProjectsService } from './projects.service';
import { Observable } from 'rxjs';
import { Project } from '../project';

@Component({
  selector: 'projects-root',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(
    private media: ObservableMedia,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit() {
    this.projects$ = this.projectsService.getProjects();
  }

  get smallScreen() {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }
}
