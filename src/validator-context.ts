import { IModel, IValidationFailure } from "./interfaces";

export class ValidatorContext<TModel extends IModel, TProperty extends keyof TModel> {
  errors: IValidationFailure<TModel, TProperty>[] = [];

  constructor(public model: TModel, public property: TProperty) { }

  AddFailure(message: string) {
    this.errors.push({
      property: this.property,
      message: message
    });
  }
}
