import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function NamedPatternValidator(
  name: string,
  pattern: RegExp
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const error = {};
    error[name] = { value: control.value };

    // if (control.hasError) {
    //   return;
    // }

    return !pattern.test(control.value) ? error : null;
  };
}
