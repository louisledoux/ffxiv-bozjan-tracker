import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./pages/homepage/homepage.module').then(m => m.HomepageModule)
    },
    {
        path: 'homepage',
        redirectTo: '',
        pathMatch: 'full'
    },
    {
        path: 'tracker/:id',
        loadChildren: () => import('./pages/tracker/tracker.module').then(m => m.TrackerModule)
    }
];

@NgModule({
    declarations: [],
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}