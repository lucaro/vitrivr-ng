import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { ObjectdetailsComponent } from "./objectdetails/objectdetails.component";
import { GalleryComponent } from "./gallery/gallery.component";
import { EvaluationSelectionComponent } from "./evaluation/evaluation-selection.component";
import { EvaluationComponent } from "./evaluation/evaluation.component";

/**
 * Defines the application's routes.
 */
const appRoutes: Routes = [
    {
        path: 'mediaobject/:objectId',
        component: ObjectdetailsComponent
    },
    { path: 'evaluation', component: EvaluationSelectionComponent },
    { path: 'evaluation/:participant/:template/:name', component: EvaluationComponent },
    { path: 'evaluation/:participant', component: EvaluationComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: '',  redirectTo: '/gallery', pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ],
    providers: [
    ]
})

export class AppRoutingModule { }