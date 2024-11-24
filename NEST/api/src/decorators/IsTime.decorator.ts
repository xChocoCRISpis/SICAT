import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

export function IsTime(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isTime",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          // Verificar si el valor es una cadena y cumple con el formato HH:mm:ss
          const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
          return typeof value === "string" && timeRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} debe ser un tiempo válido en el formato HH:mm:ss.`;
        },
      },
    });
  };
}
