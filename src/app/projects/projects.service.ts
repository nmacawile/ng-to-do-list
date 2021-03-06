import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map, debounceTime, catchError } from 'rxjs/operators';
import { Project } from '../project';
import { User } from '../user';
import { Task } from '../task';
import { AuthService } from '../core/auth.service';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(private afs: AngularFirestore, private authService: AuthService) {}

  getProjects(): Observable<Project[]> {
    return this.authService.user$.pipe(
      switchMap((user: User) => {
        return this.afs
          .collection<User>('users')
          .doc(user.uid)
          .collection<Project>('projects')
          .snapshotChanges();
      }),
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Project;
          const id = a.payload.doc.id;
          return { id, ...data };
        }),
      ),
      catchError(e => of(null)),
    );
  }

  getProject(id: string): Observable<Project> {
    return this.authService.user$.pipe(
      switchMap((user: User) => {
        return this.afs
          .collection<User>('users')
          .doc(user.uid)
          .collection<Project>('projects')
          .doc(id)
          .snapshotChanges();
      }),
      map(action => {
        const data = action.payload.data() as Project;
        data.tasks.forEach(
          task => (task.due = task.due ? (task.due as any).toDate() : null),
        );
        const id = action.payload.id;
        return { id, ...data };
      }),
      catchError(e => of(null)),
    );
  }

  createProject(name: string) {
    return this.authService.user$
      .pipe(
        map((user: User) =>
          this.afs
            .collection<User>('users')
            .doc(user.uid)
            .collection<Project>('projects')
            .add({ name: name, tasks: [] }),
        ),
      )
      .toPromise();
  }

  updateProject(id: string, data: any) {
    return this.authService.user$
      .pipe(
        debounceTime(200),
        map((user: User) =>
          this.afs
            .collection<User>('users')
            .doc(user.uid)
            .collection<Project>('projects')
            .doc(id)
            .update(data),
        ),
      )
      .toPromise();
  }

  deleteProject(id: string) {
    return this.authService.user$
      .pipe(
        map((user: User) =>
          this.afs
            .collection<User>('users')
            .doc(user.uid)
            .collection<Project>('projects')
            .doc(id)
            .delete(),
        ),
      )
      .toPromise();
  }

  createTask(projectId: string, task: Task) {
    return this.authService.user$
      .pipe(
        map((user: User) =>
          this.afs
            .collection<User>('users')
            .doc(user.uid)
            .collection<Project>('projects')
            .doc(projectId)
            .update({
              tasks: firestore.FieldValue.arrayUnion({
                completed: false,
                ...task,
              }),
            }),
        ),
      )
      .toPromise();
  }

  deleteTask(projectId: string, task: Task) {
    return this.authService.user$
      .pipe(
        map((user: User) =>
          this.afs
            .collection<User>('users')
            .doc(user.uid)
            .collection<Project>('projects')
            .doc(projectId)
            .update({
              tasks: firestore.FieldValue.arrayRemove(task),
            }),
        ),
      )
      .toPromise();
  }
}
