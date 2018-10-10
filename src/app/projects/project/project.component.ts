import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap } from 'rxjs/operators';
import { Project } from '../../project';
import { Task } from '../../task';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  project: Project;
  projectSub: Subscription;
  loading = false;

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    this.projectSub = this.route.paramMap
      .pipe(
        switchMap(params => {
          this.loading = true;
          const id = params.get('id');
          return this.projectsService.getProject(id);
        }),
      )
      .subscribe(project => {
        this.loading = false;
        this.project = project;
      });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }
}
