import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { Task } from '../../task';
import { Project } from '../../project';


@Component({
  selector: 'app-new-task-form',
  templateUrl: './new-task-form.component.html',
  styleUrls: ['./new-task-form.component.scss'],
})
export class NewTaskFormComponent implements OnInit {
  newTaskForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    public dialogRef: MatDialogRef<NewTaskFormComponent>,
    @Inject(MAT_DIALOG_DATA) private project: Project,
  ) {}

  ngOnInit() {
    this.newTaskForm = this.fb.group({
      name: ['', [Validators.required]],
      description: [null],
      due: [null],
      priority: [
        5,
        [Validators.required, Validators.min(1), Validators.max(10)],
      ],
    });
  }

  taskFormFieldError(fieldName, errorCode) {
    return this.newTaskForm.get(fieldName).hasError(errorCode);
  }

  create() {
    if (this.newTaskForm.valid) {
      this.projectsService.createTask(this.project.id, this.newTaskForm.value);
      this.dialogRef.close();
    }
  }

  close() {
    this.dialogRef.close();
  }
}
