import { Component, OnInit } from '@angular/core';
import { AssignmentsService } from '../shared/assignments.service';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css']
})
export class AssignmentsComponent implements OnInit {
  couleur = 'orange';
  ajoutActive = false;

  assignments:Assignment[] = [];

  constructor(private assignmentsService:AssignmentsService) { }

  ngOnInit(): void {
    console.log("Appelé avant affichage")
    // appelée avant l'affichage du composant
    // on demande les donnnées au service de gestion des assignments

    this.getAssignments();
  }

  getAssignments() {
    this.assignmentsService.getAssignments()
    .subscribe(assignments => {
      this.assignments = assignments;
    });
  }
}
