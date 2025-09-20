import { Directive, computed, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import type { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmAlertTitle]',
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmAlertTitleDirective {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('col-start-2 line-clamp-1 min-h-4 font-medium tracking-tight', this.userClass()),
	);
}
