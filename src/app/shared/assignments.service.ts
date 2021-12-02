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

    url = 'http://localhost:8010/api/assignments';

  getAssignments():Observable<Assignment[]> {
    //return of(this.assignments);

    return this.http.get<Assignment[]>(this.url);
  }

  getAssignment(id:number):Observable<Assignment|undefined> {
    let a = this.assignments.find(elem => elem.id === id);

    return of(a);
  }

  addAssignment(assignment:Assignment):Observable<string> {
    this.assignments.push(assignment);

    this.loggingService.log(assignment.nom, "ajouté");

    return of("Assignment ajouté");
  }

  updateAssignment(assignment:Assignment|undefined):Observable<string> {
    // ici on fait l'update, typiquement un appel http PUT
    // vers un web service qui fera un update dans une BD

    // en attendant on n'a rien besoin de faire, puisque
    // l'objet passé en paramètre EST un pointeur vers la case
    // du tableau des assignments. On a DEJA modifié la valeur
    // pointée dans le tableau.

    // pas besoin d'aller chercher dans le tableau où se trouve
    // assignment passé en paramètre. C'EST DEJA un pointeur vers la case
    // en question (une référence)

    if(assignment)
      this.loggingService.log(assignment.nom, "ajouté");

    return of("Assignment modifié");
  }

  deleteAssignment(assignment:Assignment):Observable<string> {
    const position = this.assignments.indexOf(assignment);
    // pos et nb éléments à supprimer...
    this.assignments.splice(position, 1);

    this.loggingService.log(assignment.nom, "supprimé");

    return of("Assignment supprimé");
  }
}
