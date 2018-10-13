import { Component, OnInit } from '@angular/core';
import { ObservableMedia } from '@angular/flex-layout';
import { ProjectsService } from './projects.service';
import { Observable } from 'rxjs';
import { Project } from '../project';

const SIDE_NAV_DRAWER = {
  mode: 'over',
  disableClose: false,
  opened: false,
};

const SIDE_NAV_FIXED = {
  mode: 'side',
  disableClose: true,
  opened: true,
};

@Component({
  selector: 'projects-root',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
})
export class ProjectsComponent implements OnInit {
  sideNav = { ...SIDE_NAV_DRAWER };

  projects$: Observable<Project[]>;

  constructor(
    private media: ObservableMedia,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit() {
    this.updateSideNav();

    this.media.subscribe(() => this.updateSideNav());

    this.projects$ = this.projectsService.getProjects();
  }

  updateSideNav() {
    if (!(this.media.isActive('xs') || this.media.isActive('sm'))) {
      this.sideNav = { ...SIDE_NAV_FIXED };
    } else {
      this.sideNav = { ...SIDE_NAV_DRAWER };
    }
  }
}
