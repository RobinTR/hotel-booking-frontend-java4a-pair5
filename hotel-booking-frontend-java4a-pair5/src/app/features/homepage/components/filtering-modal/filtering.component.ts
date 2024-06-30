import { Component } from '@angular/core';
import { FiltersComponent } from '../filters/filters.component';

@Component({
  selector: 'app-filtering',
  standalone: true,
  imports: [FiltersComponent],
  templateUrl: './filtering.component.html',
  styleUrl: './filtering.component.scss'
})
export class FilteringComponent {

}
