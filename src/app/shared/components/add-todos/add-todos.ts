import { Component } from '@angular/core';
import { BrnDialogContentDirective, BrnDialogTriggerDirective } from '@spartan-ng/brain/dialog';
import { HlmDialogComponent, HlmDialogContentComponent, HlmDialogDescriptionDirective, HlmDialogFooterComponent,HlmDialogHeaderComponent,HlmDialogTitleDirective} from '@spartan-ng/helm/dialog';
import { LucideAngularModule, LucideIconData, Plus } from "lucide-angular";
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { HlmInputDirective } from '@spartan-ng/helm/input';
import { BrnSelectImports } from '@spartan-ng/brain/select';
import { HlmSelectImports } from '@spartan-ng/helm/select';


@Component({
  selector: 'add-todos',
  imports: [
    BrnDialogContentDirective,
    BrnDialogTriggerDirective,
    HlmDialogComponent,
    HlmDialogContentComponent,
    HlmDialogDescriptionDirective,
    HlmDialogFooterComponent,
    HlmDialogHeaderComponent,
    HlmDialogTitleDirective,
    LucideAngularModule,
    HlmButtonDirective,
    HlmInputDirective,
    BrnSelectImports, HlmSelectImports
],
  templateUrl: './add-todos.html',
  styleUrl: './add-todos.scss'
})
export class AddTodos {
readonly plus = Plus;

}
