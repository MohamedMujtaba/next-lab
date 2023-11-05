import { z, AnyZodObject, ZodError, ZodType } from "zod";
import { fromZodError } from "zod-validation-error";

// FIXME:
export const validateSchema = async (schema: ZodType, data: any) => {
  try {
    await schema.parseAsync(data);
    return;
  } catch (error) {
    const validationError = fromZodError(error as ZodError);
    return validationError.message;
  }
};
