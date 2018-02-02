import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-ui-form',
	templateUrl: './ui-form.component.html',
	styleUrls: [ './ui-form.component.css' ]
})
export class UiFormComponent implements OnInit {
	vegetables = [ { name: 'Carrot', type: 'vegetable' }, { name: 'Onion', type: 'vegetable' }, { name: 'Potato', type: 'vegetable' }, { name: 'Capsicum', type: 'vegetable' } ];

	fruits = [ { name: 'Apple', type: 'fruit' }, { name: 'Orange', type: 'fruit' }, { name: 'Mango', type: 'fruit' }, { name: 'Banana', type: 'fruit' } ];
	droppedFruits = [];
	droppedVegetables = [];
	droppedItems = [];
	fruitDropEnabled = true;
	dragEnabled = true;
	constructor() {}

	ngOnInit() {}

	onFruitDrop(e: any) {
		this.droppedFruits.push(e.dragData);
	}

	onVegetableDrop(e: any) {
		this.droppedVegetables.push(e.dragData);
	}

	onAnyDrop(e: any) {
		this.droppedItems.push(e.dragData);
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
