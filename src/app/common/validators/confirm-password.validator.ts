import { FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

export function ConfirmPasswordValidator(
  controlName: string,
  matchingControlName: string
): ValidatorFn {
  return (formGroup: FormGroup): ValidationErrors | null => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (
      matchingControl.errors &&
      !matchingControl.errors.confirmPasswordValidator
    ) {
      return;
    }

    if (control.value !== matchingControl.value) {
      matchingControl.setErrors({ confirmPasswordValidator: true });
    } else {
      matchingControl.setErrors(null);
    }
  };
}
