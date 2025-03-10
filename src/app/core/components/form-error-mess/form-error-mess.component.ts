// https://stackoverflow.com/questions/40680321/get-all-validation-errors-from-angular-2-formgroup
import { Component, OnInit, Input } from '@angular/core';
import { AbstractControl, FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-form-error-mess',
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './form-error-mess.component.html'
})
export class FormErrorMessComponent implements OnInit {
  // https://stackoverflow.com/questions/46422007/error-error-no-value-accessor-for-form-control-with-unspecified-name-attribute

  @Input() control!: AbstractControl;
  @Input() controlName!: string;

  constructor() {}

  ngOnInit() {}

  getErrorMessage() {
    if (this.control.invalid && (this.control.dirty || this.control.touched)) {
      const errors: any = this.control.errors;
      const errorTypeNames = Object.keys(errors);
      if (errorTypeNames && errorTypeNames.length) {
        let errorType = errorTypeNames.includes('matDatepickerParse') ? 'matDatepickerParse' : errorTypeNames[0];
        let text;
        switch (errorType) {
          case 'matDatepickerParse':
            text = 'Invalid date format';
            break;
          case 'uploadFileFailed':
            text = 'File upload failed';
            break;
          case 'required':
            text = 'This field is required';
            break;
          case 'pattern':
            text = `${this.controlName} has wrong pattern`;
            break;
          case 'email':
            text = `${this.controlName} has wrong email format`;
            break;
          case 'min':
            text = `${this.controlName} has wrong value ( Min: ${errors.min.min} )`;
            break;
          case 'max':
            text = `${this.controlName} has wrong value ( Max: ${errors.max.max} )`;
            break;
          case 'minlength':
            text = `${this.controlName} has wrong length ( Min length: ${errors.minlength.requiredLength} )`;
            break;
          case 'maxlength':
            text = `${this.controlName} has wrong length ( Max length: ${errors.maxlength.requiredLength} )`;
            break;
          case 'notSame':
            text = `${this.controlName} must be same`;
            break;
          case 'hasSpecialCharacters':
            text = `Field mustn't contain the following special characters ${errors.specialCharacters.join(' ')} `;
            break;
            case 'minLengthArray':
              text = `${this.controlName} has wrong length ( Min length: ${errors.requiredLength} )`;
              break;
          default:
            text = `${this.controlName}: ${errors[errorType]} : ${errors['error_value']} `;
        }
        return text;
      }
    }
    return null
  }
}
