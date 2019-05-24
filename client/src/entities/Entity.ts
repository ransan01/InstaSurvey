import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/index';
import * as _ from 'lodash';

const BAS_URL = 'http://localhost:5000/api/v1/';
export class Entity {
  public constructor(private name: string,
                     private entityObj: Object,
                     private http: HttpClient) {
  }

  public create(): Observable<Object> {
    return this.http.post<any>(BAS_URL + this.name, this.entityObj);
  }

  public get(idVal: string): Observable<Object> {
    let urlStr = BAS_URL;
    if (!_.isNil(idVal)) {
      urlStr += this.name + '/' + idVal;
    } else {
      urlStr += this.name;
    }
    return this.http.get<any>(urlStr);
  }

  public getEntity() {
    return this.entityObj;
  }

  public setEntity(entity: Object) {
    this.entityObj = entity;
  }
}
