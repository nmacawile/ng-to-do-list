import { Component, OnInit, OnDestroy } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ProjectsService } from './projects.service';
import { Observable, Subscription } from 'rxjs';
import { Project } from '../project';
import { Router } from '@angular/router';

@Component({
  selector: 'projects-root',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit, OnDestroy {
  projectsSub: Subscription;
  projects: Project[];

  constructor(
    private media: ObservableMedia,
    private projectsService: ProjectsService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.projectsSub = this.projectsService
      .getProjects()
      .subscribe(projects => {
        this.projects = projects;
      });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }

  get smallScreen() {
    return this.media.isActive('xs') || this.media.isActive('sm');
  }
}
