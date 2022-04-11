import { ValidatorContext } from "../validator-context";

export type ValidatorAction<TModel extends Object, TProperty extends keyof TModel> = (context: ValidatorContext<TModel, TProperty>) => void;
