export interface ControlProperties {
	id?: number;
	label?: string;
	sectionName?: string;
	hideExpression?: string;
	expressionProperties?: string;
	className?: string;
	wrappers?: string;
	name: string;
	order?: string;
	display?: boolean;
	template?: string;
	controls?: ChildControls[];
}

export interface ChildControls {
	id?: number;
	label?: string;
	dspname?: string;
	applicationObject?: string;
	picklist?: string;
	hideExpression?: string;
	expressionProperties?: string;
	className?: string;
	type: string;
	name: string;
	dataType?: string;
	optionType?: string;
	order?: string;
	sectionType?: string;
	required?: boolean;
	display?: boolean;
	data?: string;
	objectName?: string;
	fieldName?: string;
	defaultValue?: string;
}
