import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appTaskdirective]'
})
export class TaskdirectiveDirective {

  constructor(el: ElementRef) { 
  	el.nativeElement.style.backgroundColor = 'transparent';
  }

}


/*
CREATE src/app/tasks/taskdirective.directive.spec.ts (252 bytes)
CREATE src/app/tasks/taskdirective.directive.ts (155 bytes)
UPDATE src/app/app.module.ts (754 bytes)
*/
