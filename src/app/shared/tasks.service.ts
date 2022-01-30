import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import * as moment from 'moment';

export interface Task {
  id?: string;
  title: string;
  date?: string;
}

interface CreateResponse {
  name: string;
}

@Injectable({ providedIn: 'root' })
export class TasksService {
  static url =
    'https://planer-lschanov-default-rtdb.europe-west1.firebasedatabase.app/tasks';

  constructor(private http: HttpClient) {}

  load(date: moment.Moment): Observable<Task[]> {
    return this.http
      .get<Task[]>(`${TasksService.url}/${date.format('DD-MM-YYYY')}.json`)
      .pipe(
        map((tasks) => {
          if (!tasks) {
            return [];
          }
          return Object.entries(tasks).map((key) => ({
            id: key[0],
            title: key[1].title,
            date: key[1].date,
          }));
        })
      );
  }

  create(task: Task): Observable<Task> {
    return this.http
      .post<CreateResponse>(`${TasksService.url}/${task.date}.json`, task)
      .pipe(
        map((res) => {
          return { ...task, id: res.name };
        })
      );
  }

  remove(task: Task): Observable<void> {
    return this.http.delete<void>(
      `${TasksService.url}/${task.date}/${task.id}.json`
    );
  }
}
