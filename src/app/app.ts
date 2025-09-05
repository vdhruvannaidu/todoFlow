import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { Header } from './shared/components/header';
import {
  LucideAngularModule,
  UserIcon,
  ListIcon,
  CircleCheck,
  Clock,
  TriangleAlert,
  TriangleAlertIcon,
} from 'lucide-angular';

import {
  BrnProgressComponent,
  BrnProgressIndicatorComponent,
} from '@spartan-ng/brain/progress';
import {
  HlmProgressDirective,
  HlmProgressIndicatorDirective,
} from '@spartan-ng/helm/progress';
import { TodosList } from './shared/components/todos-list/todos-list';
import { Searchbar } from './shared/components/searchbar/searchbar';

@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HlmButtonDirective,
    Header,
    LucideAngularModule,
    BrnProgressComponent,
    BrnProgressIndicatorComponent,
    HlmProgressDirective,
    HlmProgressIndicatorDirective,
    TodosList,
    Searchbar,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'spartanUI';
  readonly list = ListIcon;
  readonly circlecheck = CircleCheck;
  readonly clock = Clock;
  readonly trianglealert = TriangleAlertIcon;
  public progressValue = 90;
}
