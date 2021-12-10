import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { AuthService } from 'src/app/shared/auth.service';
import { Assignment } from '../assignment.model';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-assignment',
  templateUrl: './add-assignment.component.html',
  styleUrls: ['./add-assignment.component.css'],
})
export class AddAssignmentComponent implements OnInit {
  // champs du formulaire
  nomAssignment?: string = '';
  dateDeRendu?: Date;

  constructor(private assignmentsService:AssignmentsService,
              private router:Router,
              private authService:AuthService,
              private _snackBar: MatSnackBar) {}

  ngOnInit(): void {}

  onSubmit() {
    console.log('nom = ' + this.nomAssignment);
    console.log('date = ' + this.dateDeRendu);

    let newAssignement = new Assignment();

    if (this.nomAssignment && this.dateDeRendu) {
      newAssignement.nom = this.nomAssignment;
      newAssignement.dateDeRendu = this.dateDeRendu;
      newAssignement.rendu = false;
      newAssignement.id = Math.round(Math.random()*10000000);

      this.assignmentsService.addAssignment(newAssignement)
      .subscribe(reponse => {
        console.log(reponse.message);
        this._snackBar.open(reponse.message, 'OK');
        // on est sur que l'ajout a bien été effectué
        // il reste à naviguer vers la page d'accueil pour
        // afficher la liste avec le nouvel assignment inséré

        // Ah, comment on fait ?
        this.router.navigate(["/home"]);
      })
    }
  }

  isAdmin() {
    return this.authService.loggedIn;
  }
}
