import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Entity} from '../entities/Entity';

@Injectable({
  providedIn: 'root'
})
export class EntityFactoryService {

  constructor(private http: HttpClient) { }

  public createEntity(name: string,
                      entityObj: Object): Entity {
    return new Entity(name, entityObj, this.http);
  }
}
