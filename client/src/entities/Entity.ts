import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
export class Entity {
  public constructor(private name: string,
                     private entityObj: any,
                     private http: HttpClient) {
  }

  public create(): Observable<any> {
    return this.http.post<any>('http://localhost:5000/api/v1/' + this.name, this.entityObj);
  }

  public get(idVal: string): Observable<any> {
    return this.http.get<any>('http://localhost:5000/api/v1/' + this.name + '/' + idVal);
  }

  public getEntity() {
    return this.entityObj;
  }

  public setEntity(entity: any) {
    this.entityObj = entity;
  }
}
