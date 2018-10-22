import { Component, OnInit, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ProjectsService } from '../projects.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Project } from '../../project';

@Component({
  selector: 'app-delete-project-confirmation',
  templateUrl: './delete-project-confirmation.component.html',
  styleUrls: ['./delete-project-confirmation.component.scss'],
})
export class DeleteProjectConfirmationComponent implements OnInit {
  constructor(
    private projectsService: ProjectsService,
    private router: Router,
    public dialogRef: MatDialogRef<DeleteProjectConfirmationComponent>,
    @Inject(MAT_DIALOG_DATA) private project: Project,
  ) {}

  ngOnInit() {}

  delete() {
    this.projectsService.deleteProject(this.project.id);
    this.router.navigate(['/projects']);
    this.close();
  }

  close() {
    this.dialogRef.close();
  }
}
