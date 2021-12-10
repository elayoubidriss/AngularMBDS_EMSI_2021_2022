import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort,Sort } from '@angular/material/sort';
import { ignoreElements } from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Assignment } from './assignment.model';
import {PageEvent} from '@angular/material/paginator';
import { Router } from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import { DialogContentComponentComponent } from './dialog-content-component/dialog-content-component.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit, AfterViewInit {
  couleur = 'orange';
  ajoutActive = false;

  assignments: Assignment[] = [];
  // slider pour changer la limite
  sliderLimit:number=20;

  // Pour pagination
  page: number = 1;
  limit: number = 20;
  totalDocs:number=0;
  totalPages: number=0;
  hasPrevPage: boolean = false;
  prevPage: number = 0;
  hasNextPage: boolean=false;
  nextPage: number = 0;

  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu', 'update', 'delete'];

  pageEvent?: PageEvent;
  pageIndex = 0;
  length = 100;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  dataSource = new MatTableDataSource<Assignment>();

  @ViewChild(MatSort) sort!: MatSort;

  constructor(private assignmentsService: AssignmentsService,
              private authService:AuthService,
              private _liveAnnouncer: LiveAnnouncer,
              private router: Router,
              private dialog: MatDialog,
              private dialogComponent: DialogContentComponentComponent,
              private _snackBar:MatSnackBar) {
              }

  ngOnInit(): void {
    console.log('Appelé avant affichage');
    // appelée avant l'affichage du composant
    // on demande les donnnées au service de gestion des assignments
    this.getAssignments();
    this.getEvent(this.pageEvent);
    this.pageEvent = this.getEvent();
    this.assignmentsService.getAssignmentsPagine(0,20).subscribe((data)=>{
      this.dataSource = data.docs;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  getAssignments() {
    this.assignmentsService.getAssignmentsPagine(this.page, this.limit).subscribe((data) => {
      this.assignments = data.docs;
      this.page = data.page;
       this.limit = data.limit;
       this.totalDocs = data.totalDocs;
       this.totalPages = data.totalPages;
       this.hasPrevPage = data.hasPrevPage;
       this.prevPage = data.prevPage;
       this.hasNextPage = data.hasNextPage;
       this.nextPage = data.nextPage;
       console.log("données reçues");
    });
  }

  getEvent(event?:PageEvent){
    this.assignmentsService.getAssignmentEvent(event).subscribe(
      response =>{
        if(response.error) {
          console.log(response);
        } else {
          if(this.pageEvent) {
            this.dataSource = response.docs;
            this.length = this.totalDocs;
          }
        }
      },
      error =>{
        console.log("erreur");
      }
    );
    return event;
  }

  changeLimit() {
    console.log("change limit")
    this.limit = this.sliderLimit;
    this.getAssignments();
  }

  pagePrecedente() {
      this.page = this.prevPage ;
      this.getAssignments();
  }

  pageSuivante() {
      this.page = this.nextPage ;
      this.getAssignments();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignments();
  }

  premierePage() {
    this.page = 1;
    this.getAssignments();
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }

  onDelete(assignment?:Assignment) {
    if (assignment) {
      this.assignmentsService
        .deleteAssignment(assignment)
        .subscribe((reponse) => {
          console.log(reponse.message);
          this._snackBar.open(reponse.message, 'OK');
          // on retourne à la page d'accueil APRES qu'on soit sur
          // que la suppression ait bien été effectuée
          this.router.navigate(['/home']);
        });
      // on cache l'affichage du detail puisqu'il a été supprimé
      assignment = undefined;
    }
  }

  onClickEdit(assignment?:Assignment) {
    this.router.navigate(['/assignment', assignment?.id, 'edit'], {
      queryParams: {
        nom: 'TOTO',
        prenom: 'TITI',
        age: 50,
      },
      fragment: 'edit',
    });
  }

  openDialog(assignment?:Assignment) {
    let dialogRef = this.dialog.open(DialogContentComponentComponent);
    dialogRef.componentInstance.assignmentDelete = assignment;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  isAdmin() {
    return this.authService.loggedIn;
  }
}


