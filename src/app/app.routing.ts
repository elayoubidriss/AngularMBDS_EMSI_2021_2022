import { Routes } from "@angular/router";
import { AddAssignmentComponent } from "./assignments/add-assignment/add-assignment.component";
import { AssignmentDetailComponent } from "./assignments/assignment-detail/assignment-detail.component";
import { AssignmentsComponent } from "./assignments/assignments.component";

const routes:Routes = [
  {
    path:"",
    component:AssignmentsComponent
  },
  {
    path:"home",
    component:AssignmentsComponent
  },
  {
    path:"add",
    component:AddAssignmentComponent
  },
  {
    path:"assignment/:id",
    component:AssignmentDetailComponent
  },
  // appelé lorsque aucune route n'a matché...
  {
    path: '**',
    redirectTo: '/not-found.html'
  }
]

export {routes}
