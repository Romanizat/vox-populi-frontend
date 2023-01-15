import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from "../utils/jwt.interceptor";
import {ProfileComponent} from './profile/profile.component';
import {ViewUsersComponent} from './view-users/view-users.component';
import {AuthGuard} from "../utils/auth.guard";
import {AuthGuardAdmin} from "../utils/auth.guard.admin";
import {MatSortModule} from "@angular/material/sort";
import {ViewEventsComponent} from './view-events/view-events.component';
import {CreateEventDialogComponent} from './view-events/create-event-dialog/create-event-dialog.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {EventDetailsComponent} from './view-events/event-details/event-details.component';
import {
  CreateEventSuggestionDialogComponent
} from './view-events/event-details/create-event-suggestion-dialog/create-event-suggestion-dialog.component';
import {SafePipe} from "../utils/safe-pipe.pipe";
import {DragDropModule} from "@angular/cdk/drag-drop";
import {
  InviteUserToEventDialogComponent
} from './view-events/event-details/invite-user-to-event-dialog/invite-user-to-event-dialog.component';
import {
  ViewEventParticipantsDialogComponent
} from './view-events/event-details/view-event-participants-dialog/view-event-participants-dialog.component';
import {MatTabsModule} from "@angular/material/tabs";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTableModule} from "@angular/material/table";
import {MatDialogModule} from "@angular/material/dialog";
import {MatSelectModule} from "@angular/material/select";
import {MatListModule} from "@angular/material/list";
import {MatFormFieldModule} from "@angular/material/form-field";

const appRoutes: Routes = [
  {path: "", component: LoginComponent},
  {path: "profile", component: ProfileComponent, canActivate: [AuthGuard]},
  {path: "events", component: ViewEventsComponent, canActivate: [AuthGuard]},
  {path: "event/:id", component: EventDetailsComponent, canActivate: [AuthGuard]},
  {path: "users", component: ViewUsersComponent, canActivate: [AuthGuardAdmin]}
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ViewUsersComponent,
    ViewEventsComponent,
    CreateEventDialogComponent,
    EventDetailsComponent,
    CreateEventSuggestionDialogComponent,
    SafePipe,
    InviteUserToEventDialogComponent,
    ViewEventParticipantsDialogComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    MatFormFieldModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    BrowserModule,
    HttpClientModule,
    MatSnackBarModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    MatTabsModule,
    MatSortModule,
    MatTableModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DragDropModule,
    MatSelectModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule {
}
