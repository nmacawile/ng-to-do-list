import { Component, OnInit } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { Observable } from 'rxjs';
import { Project } from '../../project';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  projects$: Observable<Project[]>;

  constructor(private projectsService: ProjectsService) {}

  ngOnInit() {
    this.projects$ = this.projectsService.getProjects();
  }
}
