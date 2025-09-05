import { Component } from '@angular/core';
import { HlmBadgeDirective } from '@spartan-ng/helm/badge';
import { LucideAngularModule, Clock} from 'lucide-angular';
import { HlmCheckboxComponent } from '@spartan-ng/helm/checkbox';
import { HlmCheckboxImports } from '@spartan-ng/helm/checkbox';
import { HlmLabelDirective } from '@spartan-ng/helm/label';

@Component({
  selector: 'todos-list',
  imports: [HlmBadgeDirective, LucideAngularModule,HlmCheckboxImports,HlmLabelDirective,  HlmCheckboxComponent],
  templateUrl: './todos-list.html',
  styleUrl: './todos-list.scss'
})
export class TodosList {
  readonly clock = Clock;
  todos = [];
}
