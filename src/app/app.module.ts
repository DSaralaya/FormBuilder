import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NgDragDropModule } from 'ng-drag-drop';
import { UiFormComponent } from './ui-form/ui-form.component';

const appRoutes: Routes = [ { path: '', redirectTo: 'ui-form', pathMatch: 'full' }, { path: 'ui-form', component: UiFormComponent } ];

@NgModule({
	declarations: [ AppComponent, UiFormComponent ],
	imports: [ BrowserModule, RouterModule.forRoot(appRoutes), NgDragDropModule.forRoot(), FormsModule ],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
