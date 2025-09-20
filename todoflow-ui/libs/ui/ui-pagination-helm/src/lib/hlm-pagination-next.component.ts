import { BooleanInput } from '@angular/cdk/coercion';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { lucideChevronRight } from '@ng-icons/lucide';
import { hlm } from '@spartan-ng/brain/core';
import { ButtonVariants } from '@spartan-ng/helm/button';
import { HlmIconDirective } from '@spartan-ng/helm/icon';
import { ClassValue } from 'clsx';
import { HlmPaginationLinkDirective } from './hlm-pagination-link.directive';

@Component({
	selector: 'hlm-pagination-next',
	imports: [HlmPaginationLinkDirective, NgIcon, HlmIconDirective],
	providers: [provideIcons({ lucideChevronRight })],
	template: `
		<a
			[class]="_computedClass()"
			hlmPaginationLink
			[link]="link()"
			[queryParams]="queryParams()"
			[queryParamsHandling]="queryParamsHandling()"
			[size]="size()"
			[attr.aria-label]="ariaLabel()"
		>
			<span [class]="_labelClass()">{{ text() }}</span>
			<ng-icon hlm size="sm" name="lucideChevronRight" />
		</a>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HlmPaginationNextComponent {
	public readonly userClass = input<ClassValue>('', { alias: 'class' });
	/** The link to navigate to the next page. */
	public readonly link = input<RouterLink['routerLink']>();
	/** The query parameters to pass to the next page. */
	public readonly queryParams = input<RouterLink['queryParams']>();
	/** How to handle query parameters when navigating to the next page. */
	public readonly queryParamsHandling = input<RouterLink['queryParamsHandling']>();

	/** The aria-label for the next page link. */
	public readonly ariaLabel = input<string>('Go to next page', { alias: 'aria-label' });
	/** The text to display for the next page link. */
	public readonly text = input<string>('Next');
	/** Whether the button should only display the icon. */
	public readonly iconOnly = input<boolean, BooleanInput>(false, {
		transform: booleanAttribute,
	});
	protected readonly _labelClass = computed(() => (this.iconOnly() ? 'sr-only' : 'hidden sm:block'));

	protected readonly size = computed<ButtonVariants['size']>(() => (this.iconOnly() ? 'icon' : 'default'));

	protected readonly _computedClass = computed(() =>
		hlm('gap-1', !this.iconOnly() ? 'sm:pr-2.5' : '', this.userClass()),
	);
}
