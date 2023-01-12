import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {MatLegacyFormFieldModule as MatFormFieldModule} from "@angular/material/legacy-form-field";
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatLegacyListModule as MatListModule} from "@angular/material/legacy-list";
import {MatIconModule} from "@angular/material/icon";
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {JwtInterceptor} from "../utils/jwt.interceptor";
import {MatLegacySnackBarModule as MatSnackBarModule} from "@angular/material/legacy-snack-bar";
import {MatLegacyInputModule as MatInputModule} from "@angular/material/legacy-input";
import {MatLegacyButtonModule as MatButtonModule} from "@angular/material/legacy-button";
import {ProfileComponent} from './profile/profile.component';
import {ViewUsersComponent} from './view-users/view-users.component';
import {AuthGuard} from "../utils/auth.guard";
import {AuthGuardAdmin} from "../utils/auth.guard.admin";
import {MatLegacyTooltipModule as MatTooltipModule} from "@angular/material/legacy-tooltip";
import {MatLegacyTabsModule as MatTabsModule} from "@angular/material/legacy-tabs";
import {MatSortModule} from "@angular/material/sort";
import {MatLegacyTableModule as MatTableModule} from "@angular/material/legacy-table";
import {ViewEventsComponent} from './view-events/view-events.component';
import {CreateEventDialogComponent} from './view-events/create-event-dialog/create-event-dialog.component';
import {MatLegacyDialogModule as MatDialogModule} from "@angular/material/legacy-dialog";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatNativeDateModule} from "@angular/material/core";
import {EventDetailsComponent} from './view-events/event-details/event-details.component';
import {CreateEventSuggestionDialogComponent} from './view-events/event-details/create-event-suggestion-dialog/create-event-suggestion-dialog.component';
import {SafePipe} from "../utils/safe-pipe.pipe";
import {DragDropModule} from "@angular/cdk/drag-drop";
import { InviteUserToEventDialogComponent } from './view-events/event-details/invite-user-to-event-dialog/invite-user-to-event-dialog.component';
import {MatLegacySelectModule as MatSelectModule} from "@angular/material/legacy-select";
import { ViewEventParticipantsDialogComponent } from './view-events/event-details/view-event-participants-dialog/view-event-participants-dialog.component';

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
