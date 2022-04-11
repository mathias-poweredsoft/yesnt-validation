import { IValidationFailure } from "./interfaces/validation-failure.interface";

export class ValidatorContext<TModel extends Object, TProperty extends keyof TModel> {
  errors: IValidationFailure<TModel, TProperty>[] = [];

  constructor(public model: TModel, public property: TProperty) { }

  AddFailure(message: string) {
    this.errors.push({
      property: this.property,
      message: message
    });
  }
}
