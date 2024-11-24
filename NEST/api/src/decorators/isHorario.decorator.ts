import { registerDecorator, ValidationOptions, ValidationArguments } from "class-validator";

/**
 * Valida que el valor cumpla con el patrón de un día de la semana, año y semestre.
 * Ejemplo válido: "LU-2024-AD", "MA-2025-EJ".
 */
export function IsHorario(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: "isDayCode",
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          const regex = /^(LU|MA|MI|JU|VI|SA)-\d{4}-(AD|EJ)$/;
          return typeof value === "string" && regex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `${args.property} must match the pattern "XX-YYYY-XX" (e.g., LU-2024-AD)`;
        },
      },
    });
  };
}
