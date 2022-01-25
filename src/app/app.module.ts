import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {MatFormFieldModule} from "@angular/material/form-field";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from "../utils/jwt.interceptor";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {ProfileComponent} from './profile/profile.component';
import {ViewUsersComponent} from './view-users/view-users.component';
import {AuthGuard} from "../utils/auth.guard";
import {AuthGuardAdmin} from "../utils/auth.guard.admin";
import {MatTooltipModule} from "@angular/material/tooltip";
import {MatTabsModule} from "@angular/material/tabs";
import {MatSortModule} from "@angular/material/sort";
import {MatTableModule} from "@angular/material/table";
import {ViewEventsComponent} from './view-events/view-events.component';
import {CreateEventDialogComponent} from './view-events/create-event-dialog/create-event-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {EventDetailsComponent} from './view-events/event-details/event-details.component';
import {CreateEventSuggestionDialogComponent} from './view-events/event-details/create-event-suggestion-dialog/create-event-suggestion-dialog.component';
import {SafePipe} from "../utils/safe-pipe.pipe";

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
    SafePipe
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
