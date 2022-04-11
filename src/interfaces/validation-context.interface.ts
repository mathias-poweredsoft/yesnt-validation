
export interface IValidationContext {
  [property: string]: {
    child?: IValidationContext;
    messages: string[];
  };
}
