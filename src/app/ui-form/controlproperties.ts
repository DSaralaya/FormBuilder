export interface ControlProperties {
	id?: number;
	label?: string;
	dspname?: string;
	hideExpression?: string;
	expressionProperties?: string;
	className?: string;
	type: string;
	name: string;
	order?: string;
	controls?: {
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
	}[];
}


