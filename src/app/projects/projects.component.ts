import { Component, OnInit } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
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
    if (!(this.media.isActive('xs') || this.media.isActive('sm'))) this.sideNav.opened = true;

    this.media.subscribe((mediaChange: MediaChange) => {
      if (mediaChange.mqAlias === 'xs' || mediaChange.mqAlias === 'sm') {
        this.sideNav = { ...SIDE_NAV_DRAWER };
      } else {
        this.sideNav ={ ...SIDE_NAV_FIXED };
      }
    });

    this.projects$ = this.projectsService.getProjects();
  }
}
