import { IModel } from "../interfaces";
import { ValidatorContext } from "../validator-context";

export type ValidatorAction<TModel extends IModel, TProperty extends keyof TModel> = (context: ValidatorContext<TModel, TProperty>) => void;
