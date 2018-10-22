import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProjectsService } from '../projects.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, tap, debounceTime } from 'rxjs/operators';
import { Project } from '../../project';
import { Task } from '../../task';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { NewTaskFormComponent } from '../new-task-form/new-task-form.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss'],
})
export class ProjectComponent implements OnInit, OnDestroy {
  project: Project;
  projectSub: Subscription;
  loading = false;
  editMode = false;

  editForm: FormGroup;

  constructor(
    private projectsService: ProjectsService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private router: Router,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.projectSub = this.route.paramMap
      .pipe(
        tap(() => {
          this.loading = true;
          this.editMode = false;
        }),
        debounceTime(300),
        switchMap(params => {
          this.loading = true;
          const id = params.get('id');
          return this.projectsService.getProject(id);
        }),
        tap(() => (this.loading = false)),
      )
      .subscribe(project => {
        this.project = project;

        if (project)
          this.editForm = this.fb.group({
            name: [project.name, [Validators.maxLength(30)]],
          });
        
      });
  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  save() {
    const name = this.editForm.get('name').value;
    if (name.trim() === '' || name === this.project.name) {
      this.toggleEdit();
    } else if (
      name.trim() !== '' &&
      name !== this.project.name &&
      this.editForm.valid
    ) {
      this.projectsService.updateProject(this.project.id, this.editForm.value);
      this.toggleEdit();
    }
  }

  delete() {
    this.projectsService.deleteProject(this.project.id);
    this.router.navigate(['/projects']);
  }

  openNewTaskForm() {
    this.dialog.open(NewTaskFormComponent, {
      width: '400px',
      data: this.project,
    });
  }

  updateTasks(tasks) {
    this.projectsService.updateProject(this.project.id, { tasks: tasks });
  }

  sort() {
    this.updateTasks(
      this.project.tasks.sort((a, b) => {
        return (
          <any>a.completed - <any>b.completed ||
          b.priority - a.priority ||
          <any>a.due - <any>b.due ||
          (a.name < b.name ? -1 : 1)
        );
      }),
    );
  }
}
