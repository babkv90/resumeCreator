import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { 
  faCogs,
  faPlus,
  faTrash,
  faArrowLeft,
  faArrowRight,
  faLanguage,
  faCode,
  faTools,
  faDatabase,
  faCloud,
  faPuzzlePiece
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FontAwesomeModule],
})
export class SkillsComponent implements OnInit {
  skillsForm: FormGroup;

  // Font Awesome icons
  faCogs = faCogs;
  faPlus = faPlus;
  faTrash = faTrash;
  faArrowLeft = faArrowLeft;
  faArrowRight = faArrowRight;
  faLanguage = faLanguage;
  faCode = faCode;
  faTools = faTools;
  faDatabase = faDatabase;
  faCloud = faCloud;
  faPuzzlePiece = faPuzzlePiece;

  constructor(private fb: FormBuilder) {
    this.skillsForm = this.fb.group({
      technicalSkills: this.fb.array([
        this.createSkillFormGroup()
      ]),
      softSkills: this.fb.array([
        this.createSkillFormGroup()
      ]),
      languages: this.fb.array([
        this.createLanguageFormGroup()
      ])
    });
  }

  ngOnInit(): void {
  }

  createSkillFormGroup(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      level: ['', Validators.required]
    });
  }

  createLanguageFormGroup(): FormGroup {
    return this.fb.group({
      language: ['', Validators.required],
      proficiency: ['', Validators.required]
    });
  }

  get technicalSkills(): FormArray {
    return this.skillsForm.get('technicalSkills') as FormArray;
  }

  get softSkills(): FormArray {
    return this.skillsForm.get('softSkills') as FormArray;
  }

  get languages(): FormArray {
    return this.skillsForm.get('languages') as FormArray;
  }

  addTechnicalSkill(): void {
    this.technicalSkills.push(this.createSkillFormGroup());
  }

  addSoftSkill(): void {
    this.softSkills.push(this.createSkillFormGroup());
  }

  addLanguage(): void {
    this.languages.push(this.createLanguageFormGroup());
  }

  removeTechnicalSkill(index: number): void {
    this.technicalSkills.removeAt(index);
  }

  removeSoftSkill(index: number): void {
    this.softSkills.removeAt(index);
  }

  removeLanguage(index: number): void {
    this.languages.removeAt(index);
  }

  onSubmit(): void {
    if (this.skillsForm.valid) {
      console.log(this.skillsForm.value);
      // Handle form submission
    }
  }
}
