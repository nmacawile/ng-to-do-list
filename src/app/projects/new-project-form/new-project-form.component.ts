import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../projects.service';
import { Project } from '../../project';

@Component({
  selector: 'app-new-project-form',
  templateUrl: './new-project-form.component.html',
  styleUrls: ['./new-project-form.component.scss'],
})
export class NewProjectFormComponent implements OnInit {
  newProjectForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    public dialogRef: MatDialogRef<NewProjectFormComponent>,
  ) {}

  ngOnInit() {
    this.newProjectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
    });
  }

  create() {
    if (this.newProjectForm.valid) {
      this.projectsService.createProject(this.newProjectForm.get('name').value);
      this.close();
    }
  }

  close() {
    this.dialogRef.close();
  }

  projectFormFieldError(fieldName, errorCode) {
    return this.newProjectForm.get(fieldName).hasError(errorCode);
  }
}
