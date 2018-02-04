import { Component, ViewContainerRef, ViewChild, OnInit } from '@angular/core';
import { FieldType, FieldWrapper } from '@ngx-formly/core';

@Component({
  selector: 'app-wrapper-panel',
  template: `
  <div class="input-wrapper">
  <span class="{{field.templateOptions.className || ''}} help-section-label">
  <span [innerHTML]="field.templateOptions.template"></span>
  </span>
  <div>
      <template #fieldComponent></template>
  </div>
</div>
  `
})
export class SectionComponent extends FieldWrapper {
  @ViewChild('fieldComponent', { read: ViewContainerRef })
  fieldComponent: ViewContainerRef;
}
