import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyBootstrapModule } from '@ngx-formly/bootstrap';
import { NgDragDropModule } from 'ng-drag-drop';
import { UiFormComponent } from './ui-form/ui-form.component';
import { SortablejsModule } from 'angular-sortablejs';
import { SectionComponent } from './ui-form/section';
const appRoutes: Routes = [ { path: '', redirectTo: 'ui-form', pathMatch: 'full' }, { path: 'ui-form', component: UiFormComponent } ];

@NgModule({
	declarations: [ AppComponent, UiFormComponent, SectionComponent ],
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRoutes),
		NgDragDropModule.forRoot(),
		FormsModule,
		SortablejsModule,
		ReactiveFormsModule,
		FormlyModule.forRoot({
			validationMessages: [
				{
					name: 'required',
					message: (err, field) => (field['data'] && field['data']['validationMessage'] ? `${field['data']['validationMessage']}` : `${field.templateOptions.label.replace('(MM/DD/YYYY)', '')} is required.`)
				}
			],
			wrappers: [ { name: 'section', component: SectionComponent } ]
		}),
		FormlyBootstrapModule
	],
	providers: [],
	bootstrap: [ AppComponent ]
})
export class AppModule {}
