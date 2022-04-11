import { RuleBuilder } from "../rule-builder";
import { IValidationContext } from "./validation-context.interface";


export interface IValidator<TModel extends Object> {
  errors: IValidationContext;
  IsValid: boolean;
  HasBeenValidated: boolean;
  setup: () => void;
  validate: () => boolean;
  RuleFor: (property: keyof TModel) => RuleBuilder<TModel, keyof TModel>;
}
