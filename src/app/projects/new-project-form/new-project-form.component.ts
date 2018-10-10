import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';
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
    this.newProjectForm = this.fb.group({ name: '' });
  }
  
  create() {
    this.projectsService.createProject('newww');
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
