import { IModel } from "./model.interface";

export interface IValidationFailure<TModel extends IModel, TProperty extends keyof TModel> {
  property: TProperty;
  message?: string;
  child?: IValidationFailure<TProperty, keyof TProperty>;
}
