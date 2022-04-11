import { ValidatorContext } from "../validator-context";

export type ValidatorFunction<TModel extends Object, TProperty extends keyof TModel> = (model: TModel, property: TProperty, value: TModel[TProperty], context: ValidatorContext<TModel, TProperty>) => boolean | void;
