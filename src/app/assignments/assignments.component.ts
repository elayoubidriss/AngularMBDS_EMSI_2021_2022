import { LiveAnnouncer } from '@angular/cdk/a11y';
import { AfterViewInit, ViewChild, Component, OnInit } from '@angular/core';
import { MatSort, Sort } from '@angular/material/sort';
import { ignoreElements } from 'rxjs';
import { AssignmentsService } from '../shared/assignments.service';
import { AuthService } from '../shared/auth.service';
import { Assignment } from './assignment.model';
import {PageEvent, MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.component.html',
  styleUrls: ['./assignments.component.css'],
})
export class AssignmentsComponent implements OnInit {
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

  displayedColumns: string[] = ['id', 'nom', 'dateDeRendu', 'rendu'];

  pageEvent?: PageEvent;
  dataSource: any;
  pageIndex = 1;
  length = 100;
  pageSize = 20;
  pageSizeOptions: number[] = [5, 10, 25, 50];

  constructor(private assignmentsService: AssignmentsService,
              private authService:AuthService,
              private _liveAnnouncer: LiveAnnouncer) {}

  @ViewChild(MatSort) sort: MatSort = new MatSort();

  ngOnInit(): void {
    console.log('Appelé avant affichage');
    // appelée avant l'affichage du composant
    // on demande les donnnées au service de gestion des assignments
    this.getAssignments();
    this.getEvent(this.pageEvent);
    this.pageEvent = this.getEvent();
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

  deco() {
    this.authService.logOut();
  }

  announceSortChange(sortState: Sort) {
    // This example uses English messages. If your application supports
    // multiple language, you would internationalize these strings.
    // Furthermore, you can customize the message to add additional
    // details about the values being sorted.
    if (sortState.direction) {
      this._liveAnnouncer.announce(`Sorted ${sortState.direction}ending`);
    } else {
      this._liveAnnouncer.announce('Sorting cleared');
    }
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
}
