import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AssignmentsService } from 'src/app/shared/assignments.service';
import { Assignment } from '../assignment.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

@Component({
  selector: 'app-dialog-content-component',
  templateUrl: './dialog-content-component.component.html',
  styleUrls: ['./dialog-content-component.component.css']
})
export class DialogContentComponentComponent implements OnInit {

  @Input() assignmentDelete?: Assignment;

  constructor(private assignmentsService: AssignmentsService,
              private router:Router) { }

  ngOnInit(): void {
  }

  onDelete() {
    if (this.assignmentDelete) {
      this.assignmentsService
        .deleteAssignment(this.assignmentDelete)
        .subscribe((reponse) => {
          console.log(reponse.message);
          // on retourne à la page d'accueil APRES qu'on soit sur
          // que la suppression ait bien été effectuée
          this.router.navigate(['/home']);
        });
      // on cache l'affichage du detail puisqu'il a été supprimé
      this.assignmentDelete = undefined;
    }
  }

}
