import { FormGroup, FormControl, Validators } from '@angular/forms';
import { namedValidator } from './named.validator';

describe('namedValidator', () => {
  const fakeName = 'jimmypesto';
  let control;
  let validator;

  beforeEach(() => {
    control = new FormControl(1);
    validator = namedValidator(fakeName, Validators.min(3));
  });

  it('should rename the validator if the validator is truthy.', () => {
    const result = validator(control);
    expect(result).toBeDefined();
    expect(result.min).toBeUndefined();
    expect(result[fakeName]).toStrictEqual({ value: 1 });
  });

  it('should return null if the validator is falsey.', () => {
    control.setValue(4);
    const result = validator(control);
    expect(result).toBeNull();
  });
});
