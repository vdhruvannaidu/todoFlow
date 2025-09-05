import { Component } from '@angular/core';
import { HlmInputDirective } from '@spartan-ng/helm/input';


@Component({
  selector: 'searchbar',
  imports: [HlmInputDirective],
  templateUrl: './searchbar.html',
  styleUrl: './searchbar.scss'
})
export class Searchbar {

}
