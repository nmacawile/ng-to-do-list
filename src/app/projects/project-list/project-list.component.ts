import { Component, OnInit } from '@angular/core';
import { ObservableMedia, MediaChange } from '@angular/flex-layout';
import { ProjectsService } from '../projects.service';
import { Observable } from 'rxjs';
import { Project } from '../../project';

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
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.scss'],
})
export class ProjectListComponent implements OnInit {
  sideNav = SIDE_NAV_DRAWER;

  projects$: Observable<Project[]>;

  constructor(
    private media: ObservableMedia,
    private projectsService: ProjectsService,
  ) {}

  ngOnInit() {
    this.media.subscribe((mediaChange: MediaChange) => {
      if (mediaChange.mqAlias === 'xs' || mediaChange.mqAlias === 'sm') {
        this.sideNav = SIDE_NAV_DRAWER;
      } else {
        this.sideNav = SIDE_NAV_FIXED;
      }
    });

    this.projects$ = this.projectsService.getProjects();
  }
}
