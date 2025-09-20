import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideMinus } from '@ng-icons/lucide';
import { hlm } from '@spartan-ng/brain/core';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { type ClassValue } from 'clsx';

@Component({
	selector: 'hlm-input-otp-separator',
	imports: [HlmIconDirective, NgIcon],
	providers: [provideIcons({ lucideMinus })],
	template: `
		<ng-icon hlm name="lucideMinus" />
	`,
	host: {
		role: 'separator',
		'[class]': '_computedClass()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HlmInputOtpSeparatorComponent {
	public readonly userClass = input<ClassValue>('inline-flex', { alias: 'class' });

	protected readonly _computedClass = computed(() => hlm(this.userClass()));
}
