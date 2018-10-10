import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreDocument,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Project } from '../project';
import { User } from '../user';
import { Task } from '../task';
import { AuthService } from '../core/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProjectsService {
  constructor(
    private afs: AngularFirestore,
    private authService: AuthService,
  ) {}

  getProjects(): Observable<Project[]> {
    return this.authService.user.pipe(
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
    );
  }

  getProject(id: string): Observable<Project> {
    return this.authService.user.pipe(
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
        const id = action.payload.id;
        return { id, ...data };
      }),
    );
  }
}
