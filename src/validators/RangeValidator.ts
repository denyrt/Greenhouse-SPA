import { Directive, Input } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";

@Directive({
    selector: '[range]',
    providers: [{ provide: NG_VALIDATORS, useExisting: RangeValidator, multi: true }]
})
export class RangeValidator implements Validator {
    @Input('minValue') minValue: number = Number.MIN_VALUE;
    @Input('maxValue') maxValue: number = Number.MAX_VALUE;

    validate(control: AbstractControl): ValidationErrors | null {
        let value = Number.parseFloat(control.value);
        if (isNaN(value)) return null;
        
        if (value < this.minValue) return { range: true, data: { minValue: this.minValue, maxValue: this.maxValue} };
        if (value > this.maxValue) return { range: true, data: { minValue: this.minValue, maxValue: this.maxValue} };
        return null;
    }
}