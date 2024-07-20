import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent {
  @Output() filterChanged = new EventEmitter<{ minPrice: number, maxPrice: number, featureIds: number[] }>();
  filtersForm!: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.filtersForm = this.formBuilder.group({
      minPrice: [''],
      maxPrice: [''],
      Check1: [false],
      Check2: [false],
      Check3: [false],
      Check4: [false],
      Check5: [false]
    });
  }

  searchByFilters() {
    const minPrice = this.filtersForm.value.minPrice;
    const maxPrice = this.filtersForm.value.maxPrice;
    const featureIds = this.getSelectedFeatures();

    this.filterChanged.emit({ minPrice, maxPrice, featureIds });
  }

  private getSelectedFeatures(): number[] {
    const selectedFeatures: number[] = [];

    if (this.filtersForm.get('Check1')?.value) {
      selectedFeatures.push(1);
    }
    if (this.filtersForm.get('Check2')?.value) {
      selectedFeatures.push(2);
    }
    if (this.filtersForm.get('Check3')?.value) {
      selectedFeatures.push(3);
    }
    if (this.filtersForm.get('Check4')?.value) {
      selectedFeatures.push(4);
    }
    if (this.filtersForm.get('Check5')?.value) {
      selectedFeatures.push(5);
    }

    return selectedFeatures;
  }

}
