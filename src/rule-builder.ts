import { AbstractValidator } from "./abstract-validator";
import { ValidatorContext } from "./validator-context";
import { IValidatorAction } from "./interfaces/validator-action.interface";
import { IsObjectRule } from "./rules/is-object.rule";
import { IsStringRule } from "./rules/is-string.rule";
import { IsNumberRule } from "./rules/is-number.rule";
import { Class } from "./types/class.type";
import { ValidatorFunction } from "./types/validator-function.type";
import { ValidatorAction } from "./types/validator-action.type";
import { IsRequiredRule } from "./rules/is-required.rule";

export class RuleBuilder<TModel extends Object, TProperty extends keyof TModel> {
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

  SetValidator<TValidatorModel extends Object>(validator: Class<AbstractValidator<TValidatorModel>>) {
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