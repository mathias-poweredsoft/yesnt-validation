import { ValidatorContext } from "../validator-context";

export function IsRequiredRule<TModel extends Object, TProperty extends keyof TModel>(model: TModel, property: TProperty, value: TModel[TProperty], context: ValidatorContext<TModel, TProperty>): boolean {
  console.log(`${property} is required!`, (property in model));
  const result = (property in model);
  if (!result)
    context.AddFailure(`${property} is required`);
  return result;
}
