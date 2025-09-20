import { Directive, computed, inject, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { BrnSelectLabelDirective } from '@spartan-ng/brain/select';
import type { ClassValue } from 'clsx';
import { HlmSelectContentDirective } from './hlm-select-content.directive';

@Directive({
	selector: '[hlmSelectLabel], hlm-select-label',
	hostDirectives: [BrnSelectLabelDirective],
	host: {
		'[class]': '_computedClass()',
	},
})
export class HlmSelectLabelDirective {
	private readonly _selectContent = inject(HlmSelectContentDirective);
	private readonly _stickyLabels = computed(() => this._selectContent.stickyLabels());
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected _computedClass = computed(() =>
		hlm(
			'text-muted-foreground px-2 py-1.5 text-xs',
			this._stickyLabels() ? 'sticky top-0 bg-popover block z-[2]' : '',
			this.userClass(),
		),
	);
}
