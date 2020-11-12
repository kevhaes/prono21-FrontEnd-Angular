import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { UserComponent } from "./user/user.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AddUserComponent } from "./add-user/add-user.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HeaderComponent } from "./header/header.component";
import { FooterComponent } from "./footer/footer.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { AngularMaterialModule } from "./angular-material.module";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BasicAuthHtppInterceptorService } from "./service/basic-auth-interceptor.service";
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from "@angular/material/form-field";
import { MessageComponent } from "./shared/message/message.component";
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from "./home/home.component";
import { AdminSideNavComponent } from "./admin/admin-side-nav/admin-side-nav.component";
import { MatchComponent } from "./match/match.component";
import { AddMatchComponent } from "./admin/add-match/add-match.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatInputModule } from "@angular/material/input";
import { MatNativeDateModule } from "@angular/material/core";
import { TeamComponent } from "./team/team.component";
import { LeaderboardComponent } from "./user/leaderboard/leaderboard.component";
import { BetComponent } from "./bet/bet.component";
import { StatusToString } from "./shared/status-to-string.pipe";
import { NumberToString } from "./shared/number-to-string.pipe";
import { TruncatePipe } from "./shared/truncate.pipe";
import { MatSortModule } from "@angular/material/sort";
import { AdminBetComponent } from "./admin/admin-bet/admin-bet.component";
import { AdminHomeComponent } from "./admin/admin-home/admin-home.component";
import { MatchDetailsComponent } from "./match/match-details/match-details.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ShoutBoxComponent } from "./shout-box/shout-box.component";
import { RelativeTimePipe } from "./shared/time-ago.pipe";
import { AddPostComponent } from './shout-box/add-post/add-post.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    AddUserComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    LogoutComponent,
    MessageComponent,
    AdminComponent,
    HomeComponent,
    AdminSideNavComponent,
    MatchComponent,
    AddMatchComponent,
    TeamComponent,
    LeaderboardComponent,
    BetComponent,
    StatusToString,
    NumberToString,
    TruncatePipe,
    RelativeTimePipe,
    AdminBetComponent,
    AdminHomeComponent,
    MatchDetailsComponent,
    UserDetailsComponent,
    NotFoundComponent,
    ShoutBoxComponent,
    AddPostComponent,
  ],
  imports: [
    BrowserModule,
    AngularMaterialModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    MatSortModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: BasicAuthHtppInterceptorService,
      multi: true,
    },
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: { appearance: "fill" },
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
