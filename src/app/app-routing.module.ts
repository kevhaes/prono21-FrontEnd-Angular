import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { UserComponent } from "./user/user.component";
import { MatchComponent } from "./match/match.component";
import { AddMatchComponent } from "./admin/add-match/add-match.component";
import { AddUserComponent } from "./add-user/add-user.component";
import { LoginComponent } from "./login/login.component";
import { LogoutComponent } from "./logout/logout.component";
import { AuthGaurdService } from "./service/auth-gaurd.service";
import { AdminComponent } from "./admin/admin.component";
import { HomeComponent } from "./home/home.component";
import { TeamComponent } from "./team/team.component";
import { BetComponent } from "./bet/bet.component";
import { AdminBetComponent } from "./admin/admin-bet/admin-bet.component";
import { AdminHomeComponent } from "./admin/admin-home/admin-home.component";
import { MatchDetailsComponent } from "./match/match-details/match-details.component";
import { UserDetailsComponent } from "./user/user-details/user-details.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { ShoutBoxComponent } from "./shout-box/shout-box.component";
// import { LeaderboardComponent } from "./user/leaderboard/leaderboard.component";

const routes: Routes = [
  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGaurdService],
    children: [
      {
        path: "bets",
        component: BetComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: "match/:id/match-details",
        component: MatchDetailsComponent,
        pathMatch: "full",
        canActivate: [AuthGaurdService],
      },
      {
        path: "users/:id",
        component: UserDetailsComponent,
        pathMatch: "full",
        canActivate: [AuthGaurdService],
      },
      {
        path: "shoutbox",
        component: ShoutBoxComponent,
        pathMatch: "full",
        canActivate: [AuthGaurdService],
      },
    ],
  },

  {
    path: "adduser",
    component: AddUserComponent,
    canActivate: [AuthGaurdService],
  },

  { path: "login", component: LoginComponent },
  {
    path: "logout",
    component: LogoutComponent,
    canActivate: [AuthGaurdService],
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGaurdService],
    children: [
      {
        path: "",
        component: AdminHomeComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: "users",
        component: UserComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: "matches",
        component: MatchComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: "addMatch",
        component: AddMatchComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: "teams",
        component: TeamComponent,
        canActivate: [AuthGaurdService],
      },
      {
        path: "admin-bet",
        component: AdminBetComponent,
        canActivate: [AuthGaurdService],
      },
    ],
  },
  { path: "404", component: NotFoundComponent },
  { path: "**", redirectTo: "404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
