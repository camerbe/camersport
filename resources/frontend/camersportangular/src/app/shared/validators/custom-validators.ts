import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class CustomValidators {

  static atLeastOneUppercase():ValidatorFn {
    return (control:AbstractControl):ValidationErrors | null =>{
      const value = control.value as string;
      if (!value) {
        return null;
      }
      const hasUppercase = /[A-Z]/.test(value);
      return hasUppercase ? null : { atLeastOneUppercase: true };
    }
  }

  static atLeastOneSpecialCharacter():ValidatorFn {
    return (control:AbstractControl):ValidationErrors | null =>{
      const value = control.value as string;
      if (!value) {
        return null;
      }
      const hasSpecialCharacter  = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`]/.test(value);
      return hasSpecialCharacter  ? null : { atLeastOneSpecialCharacter: true };
    }
  }

  static passwordsMatch(passwordControlName: string, confirmControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const passwordControl = formGroup.get(passwordControlName);
      const confirmControl = formGroup.get(confirmControlName);

      if (!passwordControl || !confirmControl) {
        return null;
      }


      if (confirmControl.errors && confirmControl.errors['passwordsMismatch']) {
        confirmControl.setErrors(null);
      }

      
      if (passwordControl.value !== confirmControl.value) {
        // Set error on the confirm control
        confirmControl.setErrors({ passwordsMismatch: true });
        return { passwordsMismatch: true }; // Set error on the form group as well
      } else {
        // If they match, clear the error from the confirm control and form group
        confirmControl.setErrors(null); // Explicitly clear if previously set
        return null;
      }
    };
  }

}
