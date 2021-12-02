import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [];

  constructor(private loggingService:LoggingService,
    private http:HttpClient) { }

    //url = 'http://localhost:8010/api/assignments';
    url = 'https://api-mbds-2021-2022.herokuapp.com/api/assignments';

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);

    return this.http.get<Assignment[]>(this.url);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    //let a = this.assignments.find(elem => elem.id === id);

    //return of(a);

    return this.http.get<Assignment>(this.url + "/" + id);
  }

  addAssignment(assignment:Assignment):Observable<any> {
    //this.assignments.push(assignment);

    this.loggingService.log(assignment.nom, "ajouté");

    //return of("Assignment ajouté");

    return this.http.post(this.url, assignment);
  }

  updateAssignment(assignment:Assignment|undefined):Observable<any> {
    // ici on fait l'update, typiquement un appel http PUT
    // vers un web service qui fera un update dans une BD

    if(assignment)
      this.loggingService.log(assignment.nom, "ajouté");

    //return of("Assignment modifié");
    return this.http.put(this.url, assignment);
  }

  deleteAssignment(assignment:Assignment):Observable<any> {
    this.loggingService.log(assignment.nom, "supprimé");

    return this.http.delete(this.url + "/" + assignment._id);
  }
}
