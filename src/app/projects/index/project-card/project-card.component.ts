import { Component, OnInit, Input } from '@angular/core';
import { Project } from '../../../project';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProjectsService } from '../../projects.service';
import { MatDialog } from '@angular/material';
import { DeleteProjectConfirmationComponent } from '../../delete-project-confirmation/delete-project-confirmation.component';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.scss'],
})
export class ProjectCardComponent implements OnInit {
  @Input()
  project: Project;

  editMode: boolean;

  editForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private projectsService: ProjectsService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.editForm = this.fb.group({
      name: this.project.name,
    });
  }

  toggleEdit() {
    this.editMode = !this.editMode;
  }

  save() {
    const name = this.editForm.get('name').value;
    if (
      name.trim() === '' ||
      name === this.project.name
    ) {
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
    this.dialog.open(DeleteProjectConfirmationComponent, {
      width: '400px',
      data: this.project,
    });
  }
}
