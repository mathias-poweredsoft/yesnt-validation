import { IValidator } from "./interfaces/validator.interface";
import { IValidationContext } from "./interfaces/validation-context.interface";
import { RuleBuilder } from "./rule-builder";

export abstract class AbstractValidator<TModel extends Object> implements IValidator<TModel> {
  private _rules: RuleBuilder<TModel, keyof TModel>[] = [];
  private _hasBeenValidated: boolean = false;

  get IsValid() {
    return this._hasBeenValidated && !this.HasError(this.errors);
  }

  get HasBeenValidated() {
    return this._hasBeenValidated;
  }

  constructor(protected model: TModel, public errors: IValidationContext = {}) {
    this.setup();
  }

  abstract setup(): void;

  private executeRuleBuilders(builders: RuleBuilder<any, any>[]): void {
    for (let builder of builders) {
      this.errors[builder.property as string] = {
        messages: []
      };

      // validate children validators first
      if (builder.validators.length > 0 && builder.model[builder.property]) {
        this.errors[builder.property as string].child = {};
        const validators = builder.validators
          .map(validator => {
            return new validator(builder.model[builder.property], this.errors[builder.property as string].child);
          });

        for (let validator of validators)
          validator.validate();
      }

      // validate the rule of ourself
      for (let validator of builder.rules) {
        console.log(`property => ${builder.property}`, validator.validator, typeof validator.validator);

        const result = (validator as any).validator(builder.model, builder.property, builder.model[builder.property], builder.context);

        if (!validator.afterActions) continue;

        for (let action of validator.afterActions)
          action(builder.context);

        // stop the rule validation here if a rule tell us to stop
        if (result !== undefined && !result)
          break;
      }

      if (builder.context.errors.length > 0) {
        const messages = builder.context.errors
          .filter(t => t)
          .map(t => t.message) as string[];

        const errors = this.errors[builder.property as string].messages;
        this.errors[builder.property as string].messages = [...errors, ...messages];
      }
    }
  }

  private HasError(context?: IValidationContext): boolean {
    if (!context) return false;
    for (let property of Object.keys(context)) {
      const vc = context[property];
      if (vc.messages.length > 0) return true;
      if (this.HasError(vc.child)) return true;
    }
    return false;
  }

  validate(): boolean {
    this.executeRuleBuilders(this._rules);
    this._hasBeenValidated = true;
    return !this.HasError(this.errors);
  }

  RuleFor(property: keyof TModel): RuleBuilder<TModel, keyof TModel> {
    const builder = new RuleBuilder(this.model, property);
    this._rules.push(builder);
    return builder;
  }
}