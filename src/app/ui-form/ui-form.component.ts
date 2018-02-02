import { Component, OnInit } from '@angular/core';
import { ControlProperties } from './controlproperties';

@Component({
	selector: 'app-ui-form',
	templateUrl: './ui-form.component.html',
	styleUrls: [ './ui-form.component.css' ]
})
export class UiFormComponent implements OnInit {
	controls = [
		{ name: 'section', type: 'section', className: 'col-sm-12 inline-header', dspname: '', id: 0, controls: [] },
		{ name: 'input', type: 'htmlcontrol', dataType: 'input', className: 'col-sm-6', dspname: '', id: 0 },
		{ name: 'select', type: 'htmlcontrol', dataType: 'select', className: 'col-sm-6', dspname: '', id: 0 },
		{ name: 'checkbox', type: 'htmlcontrol', dataType: 'checkbox', className: 'col-sm-6', dspname: '', id: 0 },
		{ name: 'radio button', type: 'htmlcontrol', dataType: 'radio', className: 'col-sm-6', dspname: '', id: 0 }
	];
	count = 1;
	droppedControls: ControlProperties[] = [];
	properties: any;
	constructor() {}
	ngOnInit() {}

	onControlDrop(e: any) {
		this.count++;
		const obj2 = Object.assign({}, e.dragData);
		obj2.id = this.count;
		this.droppedControls.push(obj2);
	}

	onChildDrop(e: any, childObject: any) {
		debugger;
		if (e.dragData.type === 'htmlcontrol') {
			this.count++;
			const obj2 = Object.assign({}, e.dragData);
			obj2.id = this.count;
			childObject.controls.push(obj2);
		}
	}

	getControlData(e: ControlProperties) {
		this.properties = {};
		this.properties = e;
	}

	updateItem(e) {
		const itemIndex = this.droppedControls.findIndex((item) => item.id === e.id);
		this.droppedControls[itemIndex] = e;
	}

	removeItem(item: any, list: Array<any>) {
		const index = list
			.map(function(e) {
				return e.name;
			})
			.indexOf(item.name);
		list.splice(index, 1);
	}
}
