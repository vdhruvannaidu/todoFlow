import { Component } from '@angular/core';
import { HlmButtonDirective } from '@spartan-ng/helm/button';
import { LucideAngularModule, Plus } from 'lucide-angular';
import { AddTodos } from './add-todos/add-todos';


@Component({
  selector: 'Header',
  imports: [HlmButtonDirective, LucideAngularModule, AddTodos],
  template: `
    <header
      class="bg-zinc-800/80 backdrop-blur-xl border-b border-gray-700 sticky top-0 z-50"
    >
      <div class="max-w-4xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center space-x-4">
            <div class="flex items-center space-x-2">
              <div
                class="w-8 h-8 bg-gradient-to-br from-blue-600 to-purple-600 rounded-lg flex items-center justify-center"
              >
                <i data-lucide="check-square" class="w-5 h-5 text-white"></i>
              </div>
              <h1
                class="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-400 bg-clip-text text-transparent"
              >
                TodoFlow
              </h1>
            </div>
            <span class="text-sm text-gray-500 hidden sm:block"
              >Stay organized, stay productive</span
            >
          </div>

          <div class="flex items-center space-x-3">
            <button class="spartan-button bg-slate-600 spartan-button-ghost p-2">
              <i data-lucide="moon" class="w-5 h-5"></i>
            </button>
          </div>
        </div>
      </div>
    </header>
  `,
  styles: ``,
})
export class Header {
    readonly plus = Plus;
    // You can add any additional properties or methods here if needed
}
