import { Routes } from '@angular/router';
import { MeetingComponent } from '../components';


export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: 'meeting',
        pathMatch: 'full',
    },
    {
        path: 'meeting',
        component: MeetingComponent
    }
];
