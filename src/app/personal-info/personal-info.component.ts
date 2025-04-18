import { CommonModule } from '@angular/common';
import { Component, OnInit, Output, EventEmitter, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ProgressService } from '../services/progress.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
})
export class PersonalInfoComponent implements OnInit {
  @Output() next = new EventEmitter<any>();
  @Output() previous = new EventEmitter<void>();

  personalInfoForm: FormGroup;
  cities: string[] = [
    'New York', 'Los Angeles', 'Chicago', 'Houston', 'Phoenix',
    'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'
  ];
  states: string[] = [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Florida', 'Georgia'
  ];
  zipCodes: string[] = [
    '10001', '90001', '60601', '77001', '85001',
    '19101', '78201', '92101', '75201', '95101'
  ];

  filteredCities: string[] = [];
  filteredStates: string[] = [];
  filteredZipCodes: string[] = [];

  // Dropdown visibility states
  showCityDropdown = false;
  showStateDropdown = false;
  showZipCodeDropdown = false;

  constructor(private fb: FormBuilder,private progressService: ProgressService) {
    this.personalInfoForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: [''],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      address: [''],
      city: [''],
      state: [''],
      zipCode: [''],
      linkedIn: [''],
      portfolio: [''],
      objective: ['']
    });

    // Initialize filtered lists
    this.filteredCities = this.cities;
    this.filteredStates = this.states;
    this.filteredZipCodes = this.zipCodes;
  }

  ngOnInit(): void {
    // Subscribe to form value changes for filtering
    this.personalInfoForm.get('city')?.valueChanges.subscribe(value => {
      this.filteredCities = this.filterItems(value, this.cities);
    });

    this.personalInfoForm.get('state')?.valueChanges.subscribe(value => {
      this.filteredStates = this.filterItems(value, this.states);
    });

    this.personalInfoForm.get('zipCode')?.valueChanges.subscribe(value => {
      this.filteredZipCodes = this.filterItems(value, this.zipCodes);
    });

    this.personalInfoForm.valueChanges.subscribe(values => {
      this.progressService.updateFormData(values);
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown-container')) {
      this.closeAllDropdowns();
    }
  }

  private closeAllDropdowns(): void {
    this.showCityDropdown = false;
    this.showStateDropdown = false;
    this.showZipCodeDropdown = false;
  }

  toggleCityDropdown(): void {
    this.showCityDropdown = !this.showCityDropdown;
    if (this.showCityDropdown) {
      this.showStateDropdown = false;
      this.showZipCodeDropdown = false;
    }
  }

  toggleStateDropdown(): void {
    this.showStateDropdown = !this.showStateDropdown;
    if (this.showStateDropdown) {
      this.showCityDropdown = false;
      this.showZipCodeDropdown = false;
    }
  }

  toggleZipCodeDropdown(): void {
    this.showZipCodeDropdown = !this.showZipCodeDropdown;
    if (this.showZipCodeDropdown) {
      this.showCityDropdown = false;
      this.showStateDropdown = false;
    }
  }

  private filterItems(value: string, items: string[]): string[] {
    const filterValue = value.toLowerCase();
    return items.filter(item => item.toLowerCase().includes(filterValue));
  }

  selectCity(city: string): void {
    this.personalInfoForm.patchValue({ city });
    this.showCityDropdown = false;
  }

  selectState(state: string): void {
    this.personalInfoForm.patchValue({ state });
    this.showStateDropdown = false;
  }

  selectZipCode(zipCode: string): void {
    this.personalInfoForm.patchValue({ zipCode });
    this.showZipCodeDropdown = false;
  }

  onNext(): void {
    if (this.personalInfoForm.valid) {
      const formData = {
        ...this.personalInfoForm.value,
        fullName: `${this.personalInfoForm.value.firstName} ${this.personalInfoForm.value.lastName}`.trim()
      };
      this.next.emit(formData);
    } else {
      // Mark all fields as touched to show validation messages
      Object.keys(this.personalInfoForm.controls).forEach(key => {
        this.personalInfoForm.get(key)?.markAsTouched();
      });
    }
  }

  onPrevious(): void {
    this.previous.emit();
  }

  get firstName() { return this.personalInfoForm.get('firstName'); }
  get email() { return this.personalInfoForm.get('email'); }
  get phone() { return this.personalInfoForm.get('phone'); }
}

