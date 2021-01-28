import { FormControl, FormGroup } from '@angular/forms';
import { confirmPasswordValidator } from './confirm-password.validator';

describe('confirmPasswordValidator', () => {
  let form;
  let validator;

  beforeEach(() => {
    form = new FormGroup({
      password: new FormControl('bobsburgers'),
      password2: new FormControl('bobsburgers')
    });
    validator = confirmPasswordValidator('password', 'password2');
  });

  it('should return undefined if strings are equal.', () => {
    const result = validator(form);
    expect(result).toBeUndefined();
  });

  it('should set error on second control if strings are not equal.', () => {
    const { password, password2 } = form.controls;
    password.setValue('jimmypestos');
    const result = validator(form);
    expect(result).toBeUndefined();
    expect(password2.hasError('confirmPasswordValidator')).toBeTruthy();
    expect(password2.errors.confirmPasswordValidator).toBe(true);
  });

  it('should break if second control already has an error.', () => {
    const { password2 } = form.controls;
    password2.setErrors({ fakeError: 'derp' });
    const result = validator(form);

    expect(result).toBeUndefined();
    expect(password2.hasError('confirmPasswordValidator')).toBeFalsy();
    expect(password2.hasError('fakeError')).toBeTruthy();
  });
});
