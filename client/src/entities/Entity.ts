import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
export class Entity {
  public constructor(private name: string,
                     private entityObj: Object,
                     private http: HttpClient) {
  }

  public create(): Observable<Object> {
    return this.http.post<any>('http://localhost:5000/api/v1/' + this.name, this.entityObj);
  }

  public getEntity() {
    return this.entityObj;
  }

  public setEntity(entity: Object) {
    this.entityObj = entity;
  }
}
