import { AbstractValidator } from "./abstract-validator";
import { IModel, IValidatorAction } from "./interfaces";
import { IsRequiredRule, IsNumberRule, IsStringRule, IsObjectRule } from "./rules";
import { Class, ValidatorFunction, ValidatorAction } from "./types";
import { ValidatorContext } from "./validator-context";

export class RuleBuilder<TModel extends IModel, TProperty extends keyof TModel> {
  protected _rules: IValidatorAction<TModel, TProperty>[] = [];
  validators: Class<AbstractValidator<any>>[] = [];

  context!: ValidatorContext<TModel, TProperty>;

  get rules() {
    const result: ReadonlyArray<IValidatorAction<TModel, TProperty>> = this._rules;
    return result;
  }

  constructor(public model: TModel, public property: TProperty) {
    this.context = new ValidatorContext(model, property);
  }

  private AddRule(expression: ValidatorFunction<TModel, TProperty>, afterActions?: ValidatorAction<TModel, TProperty>[]) {
    this._rules.push({
      validator: expression,
      afterActions: afterActions
    });
    return this;
  }

  IsRequired() {
    return this.AddRule(IsRequiredRule);
  };

  IsNumber() {
    return this.AddRule(IsNumberRule);
  }

  IsString() {
    return this.AddRule(IsStringRule);
  }

  IsObject() {
    return this.AddRule(IsObjectRule);
  }

  SetValidator<TValidatorModel extends IModel>(validator: Class<AbstractValidator<TValidatorModel>>) {
    this.validators.push(validator);
  }

  Custom(expression: ValidatorFunction<TModel, TProperty>) {
    return this.AddRule(expression);
  }

  WithMessage(message: string) {
    const callback: ValidatorAction<TModel, TProperty> = (context) => {
      if (context.errors.length === 0)
        return;
      context.errors[context.errors.length - 1]
        .message = message;
    };

    const index = this.rules.length - 1;
    if (!this._rules[index].afterActions)
      this._rules[index].afterActions = [];

    this._rules[index]
      .afterActions?.push(callback);

    return this;
  }
}