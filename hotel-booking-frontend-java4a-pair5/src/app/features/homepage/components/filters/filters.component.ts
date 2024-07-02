import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-filters',
  standalone: true,
  imports: [ReactiveFormsModule ],
  templateUrl: './filters.component.html',
  styleUrl: './filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FiltersComponent  {

@Output() filterChanged = new EventEmitter<{ minPrice: number, maxPrice: number ,  featureIds: number[]}>();
filtersForm!:FormGroup



constructor(private formBuilder: FormBuilder) {
  this.filtersForm = this.formBuilder.group({
    minPrice: [''], // varsayılan değer boş bırakıldı
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
  const featureIds = this.getSelectedFeatures(); // Seçili özellik ID'lerini alıyoruz

  this.filterChanged.emit({ minPrice, maxPrice, featureIds });
}
private getSelectedFeatures(): number[] {
  const selectedFeatures: number[] = [];

  if (this.filtersForm.get('Check1')?.value) {
    selectedFeatures.push(1); // Check1 seçili ise 1 numaralı özelliği ekliyoruz
  }
  if (this.filtersForm.get('Check2')?.value) {
    selectedFeatures.push(2); // Check2 seçili ise 2 numaralı özelliği ekliyoruz
  }
  if (this.filtersForm.get('Check3')?.value) {
    selectedFeatures.push(3); // Check3 seçili ise 3 numaralı özelliği ekliyoruz
  }
  if (this.filtersForm.get('Check4')?.value) {
    selectedFeatures.push(4); // Check4 seçili ise 4 numaralı özelliği ekliyoruz
  }
  if (this.filtersForm.get('Check5')?.value) {
    selectedFeatures.push(5); // Check5 seçili ise 5 numaralı özelliği ekliyoruz
  }

  return selectedFeatures;
}

}
