
export interface IValidationFailure<TModel extends Object, TProperty extends keyof TModel> {
  property: TProperty;
  message?: string;
  child?: IValidationFailure<TProperty, keyof TProperty>;
}
