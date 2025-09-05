import { computed, Directive, input } from '@angular/core';
import { hlm } from '@spartan-ng/brain/core';
import { provideHlmIconConfig } from '@spartan-ng/helm/icon';
import { ClassValue } from 'clsx';

@Directive({
	selector: '[hlmCommandIcon]',
	host: {
		'[class]': '_computedClass()',
	},
	providers: [provideHlmIconConfig({ size: 'sm' })],
})
export class HlmCommandIconDirective {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	protected readonly _computedClass = computed(() =>
		hlm('text-muted-foreground pointer-events-none shrink-0', this.userClass()),
	);
}
