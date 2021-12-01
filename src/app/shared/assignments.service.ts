import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Assignment } from '../assignments/assignment.model';
import { LoggingService } from './logging.service';

@Injectable({
  providedIn: 'root'
})
export class AssignmentsService {
  assignments:Assignment[] = [
    {
      id:0,
      nom:"Devoir Angular BUFFA",
      dateDeRendu: new Date("2021-12-18"),
      rendu : false
    },
    {
      id:1,
      nom:"Devoir BD MOPOLO",
      dateDeRendu: new Date("2021-10-10"),
      rendu : true
    },
    {
      id:2,
      nom:"Devoir Gestion projet Mr Michel Winter",
      dateDeRendu: new Date("2022-01-20"),
      rendu : false
    }
  ];

  constructor(private loggingService:LoggingService) { }

  getAssignments():Observable<Assignment[]> {
    return of(this.assignments);
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
