import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function namedValidator(
  name: string,
  validator: ValidatorFn
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const error = {};
    error[name] = { value: control.value };

    const hasError = validator(control);
    return hasError ? error : null;
  };
}
