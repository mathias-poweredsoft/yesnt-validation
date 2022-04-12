
import { ValidatorAction, ValidatorFunction } from "../types";
import { IModel } from "./model.interface";

export interface IValidatorAction<TModel extends IModel, TProperty extends keyof TModel> {
  validator: ValidatorFunction<TModel, TProperty>;
  afterActions?: ValidatorAction<TModel, TProperty>[];
}
