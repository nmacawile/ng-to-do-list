import { Component, OnInit, Input } from '@angular/core';
import { Task } from '../../../task';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.scss'],
})
export class TaskComponent implements OnInit {
  @Input()
  task: Task;
  taskForm: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.taskForm = this.fb.group({
      name: { value: this.task.name, disabled: true },
      description: { value: this.task.description, disabled: true },
      due: { value: this.task.due, disabled: true },
      priority: { value: this.task.priority, disabled: true },
    });
  }
}
