import { Routes } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { ForgotPasswordComponent } from './Component/forgot-password/forgot-password.component';
import { HomeComponent } from './Component/home/home.component';
import { DashboardComponent } from './Component/dashboard/dashboard.component';
import { AccountComponent } from './Component/account/account.component';
import { AuthGuardService } from './Services/AuthGuard-Service/auth-guard.service';
import { SkillsComponent } from './Component/Pages/skills/skills.component';
import { SkillComponent } from './Component/Pages/skill/skill.component';
import { SoftwareApplicationsComponent } from './Component/Pages/software-applications/software-applications.component';
import { SoftwareApplicationComponent } from './Component/Pages/software-application/software-application.component';
import { TimelinesComponent } from './Component/Pages/timelines/timelines.component';
import { TimelineComponent } from './Component/Pages/timeline/timeline.component';
import { ProjectsComponent } from './Component/Pages/projects/projects.component';
import { ProjectComponent } from './Component/Pages/project/project.component';
import { MessageComponent } from './Component/message/message.component';
import { ResetPasswordComponent } from './Component/reset-password/reset-password.component';

export const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent

  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent

  },
  {
    path: 'password/reset/:id',
    component: ResetPasswordComponent

  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuardService],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent

      },
      {
        path: 'account',
        component: AccountComponent

      },
      {
        path: 'skills',
        component: SkillsComponent

      },
      {
        path: 'skill/:id',
        component: SkillComponent,
      },
      {
        path: 'timelines',
        component: TimelinesComponent

      },
      {
        path: 'timeline/:id',
        component: TimelineComponent,
      },
      {
        path: 'softwareApplications',
        component: SoftwareApplicationsComponent

      },
      {
        path: 'softwareApplication/:id',
        component: SoftwareApplicationComponent,
      },
      {
        path: 'projects',
        component: ProjectsComponent

      },
      {
        path: 'project/:id',
        component: ProjectComponent,
      },
      {
        path: 'message',
        component: MessageComponent

      },
      {
        path: '',
        redirectTo: 'dashboard', pathMatch: 'full'

      }, // Default child route
    ],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: 'login' },
];
