import { IModel } from "../interfaces";
import { ValidatorContext } from "../validator-context";

export function IsBooleanRule<TModel extends IModel, TProperty extends keyof TModel>(model: TModel, property: TProperty, value: TModel[TProperty], context: ValidatorContext<TModel, TProperty>): boolean {
  return typeof value === 'boolean';
}
