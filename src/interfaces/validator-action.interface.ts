import { ValidatorAction } from "../types/validator-action.type";
import { ValidatorFunction } from "../types/validator-function.type";

export interface IValidatorAction<TModel extends Object, TProperty extends keyof TModel> {
  validator: ValidatorFunction<TModel, TProperty>;
  afterActions?: ValidatorAction<TModel, TProperty>[];
}
