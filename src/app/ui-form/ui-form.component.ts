import { Component, OnInit } from '@angular/core';
import { ControlProperties, ChildControls } from './controlproperties';
import { forEach } from '@angular/router/src/utils/collection';
import { FormGroup } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { DomSanitizer } from '@angular/platform-browser';
import { element } from 'protractor';

@Component({
	selector: 'app-ui-form',
	templateUrl: './ui-form.component.html',
	styleUrls: [ './ui-form.component.css' ]
})
export class UiFormComponent implements OnInit {
	controls = [
		{ name: 'section', type: 'section', dspname: 'section', template: '<h4>section</h4>', id: 0, controls: [], className: 'col-xs-8 col-sm-8 col-md-10 col-lg-10 inline-section-header' },
		{ name: 'input', type: 'htmlcontrol', dataType: 'input', className: 'col-sm-6', dspname: 'input', id: 0 },
		{ name: 'select', type: 'htmlcontrol', dataType: 'select', className: 'col-sm-6', dspname: 'select', id: 0 },
		{ name: 'checkbox', type: 'htmlcontrol', dataType: 'checkbox', className: 'col-sm-6', dspname: 'checkbox', id: 0 },
		{ name: 'radio button', type: 'htmlcontrol', dataType: 'radio', className: 'col-sm-6', dspname: 'radio', id: 0 }
	];
	tabs = [ { name: 'Code', class: 'active' }, { name: 'Preview Code', class: '' }, { name: 'Paste Json', class: '' } ];
	count = 1;
	droppedControls: ControlProperties[] = [];
	properties: any;
	formlyField: any = [];
	public model: any;
	public fields: any;
	pageTitle: any = 'Display';
	form = new FormGroup({});
	downLoadUrl: any;
	pastedJSON: any;
	fileName: any;
	formlyJson: any;
	constructor(private sanitizer: DomSanitizer) {}
	ngOnInit() {}

	onControlDrop(e: any) {
		this.count++;
		const obj2 = Object.assign({}, e.dragData);
		obj2.id = this.count;
		obj2.controls = [];
		this.droppedControls.push(obj2);
	}

	onChildDrop(e: any, index) {
		if (e.dragData && e.dragData.type === 'htmlcontrol') {
			this.count++;
			const obj2 = Object.assign({}, e.dragData);
			obj2.id = this.count;
			this.droppedControls[index].controls.push(obj2);
		}
	}

	getProperty(item, $event) {
		this.removeClassNames('.activeElement');
		$event.target.classList.add('activeElement');
		this.properties = item;
	}

	makeActive(index) {
		this.formlyField = [];
		for (let i = 0; i < this.tabs.length; i++) {
			if (index === i) {
				this.tabs[i]['class'] = 'active';
			} else {
				this.tabs[i]['class'] = '';
			}
		}
		if (index === 1) {
			this.droppedControls.forEach((item) => {
				const header = {
					template: item.template,
					className: item.className
				};
				if (item.sectionName) {
					header['data'] = {
						sectionType: item.sectionName
					};
				}
				const section = {
					wrappers: 'section',
					fieldGroupClassName: 'row',
					fieldGroup: []
				};
				item.controls.forEach((child) => {
					const field = {
						key: child.dspname,
						type: child.dataType,
						className: child.className,
						templateOptions: {
							label: child.label,
							required: child.required,
							objectName: child.objectName,
							fieldName: child.fieldName
						}
					};
					if (child.defaultValue) {
						field['defaultValue'] = child.defaultValue;
					}
					if (child.expressionProperties) {
						field['expressionProperties'] = child.expressionProperties;
					}
					if (child.hideExpression) {
						field['hideExpression'] = child.hideExpression;
					}
					if (child.data) {
						field['data'] = child.data;
					}
					if (child.picklist) {
						const values = child.picklist.split(';');
						const options = [];
						values.forEach((val) => {
							options.push({ label: val, value: val });
						});
						field['templateOptions']['options'] = options;
					}
					section.fieldGroup.push(field);
				});
				this.formlyField.push(header);
				this.formlyField.push(section);
			});
			this.fields = JSON.parse(JSON.stringify(this.formlyField));
			console.log(this.fields);
			//  Object.assign([], this.formlyField);
		}
		if (index === 2) {
			this.pastedJSON = JSON.stringify(this.droppedControls, null, 2);
		}
	}
	saveWork() {
		this.saveToFileSystem(JSON.stringify(this.droppedControls, null, 2));
	}
	finish() {}

	removeChild(k, x) {
		this.droppedControls[k].controls.splice(x, 1);
	}

	remove(k) {
		this.droppedControls.splice(k, 1);
	}
	loadPastedJson() {
		this.droppedControls = JSON.parse(this.pastedJSON);
	}

	private saveToFileSystem(response) {
		this.fileName = this.pageTitle.toLowerCase().replace(' ', '-') + '.json';
		const blob = new Blob([ response ], { type: 'application/json' });
		const url = window.URL.createObjectURL(blob);
		const uri = this.sanitizer.bypassSecurityTrustUrl(url);
		console.log(uri);
		this.downLoadUrl = uri;
		setTimeout(function() {
			document.getElementById('down').click();
			window.URL.revokeObjectURL(url);
		}, 200);
	}

	convertFormlyJsonToDrop() {
		const jsonData = JSON.parse(this.formlyJson);
		this.droppedControls = [];
		let section: ControlProperties;
		jsonData.forEach((item) => {
			if (item.template) {
				section = {
					sectionName: item.data ? item.data.sectionType : '',
					template: item.template,
					name: 'section',
					className: item.className,
					controls: []
				};
			}
			if (item.fieldGroup) {
				item.fieldGroup.forEach((child) => {
					const field: ChildControls = {
						dspname: child.key,
						name: child.type,
						type: child.type,
						dataType: child.type,
						required: child.templateOptions.required,
						label: child.templateOptions.label,
						className: child.className,
						objectName: child.templateOptions.objectName,
						fieldName: child.templateOptions.fieldName,
						hideExpression: child.hideExpression,
						data: child.data,
						defaultValue: child.defaultValue,
						expressionProperties: child.expressionProperties
					};
					section.controls.push(field);
				});
			}
			if (section && section.controls.length > 0) {
				this.droppedControls.push(section);
			}
		});
	}

	removeClassNames(cls) {
		const elements = document.querySelectorAll(cls);
		elements.forEach((ele) => {
			console.log(ele);
			ele.classList.remove(cls.replace('.', ''));
		});
	}
}
