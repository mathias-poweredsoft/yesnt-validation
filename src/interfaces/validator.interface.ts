import { RuleBuilder } from "../rule-builder";
import { IModel } from "./model.interface";
import { IValidationContext } from "./validation-context.interface";


export interface IValidator<TModel extends IModel> {
  errors: IValidationContext;
  IsValid: boolean;
  HasBeenValidated: boolean;
  setup: () => void;
  validate: () => boolean;
  RuleFor: (property: keyof TModel) => RuleBuilder<TModel, keyof TModel>;
}
