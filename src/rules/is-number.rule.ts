import { ValidatorContext } from "../validator-context";

export function IsNumberRule<TModel extends Object, TProperty extends keyof TModel>(model: TModel, property: TProperty, value: TModel[TProperty], context: ValidatorContext<TModel, TProperty>): boolean {
  return typeof value === 'number';
}
