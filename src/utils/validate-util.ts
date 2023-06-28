import { z } from "zod";

export const minLength = (length: number, value: string): boolean => {
  const schema = z.object({
    value: z.string().min(length)
  });
  
  const data = { value };
  const result = schema.safeParse(data);
  
  if (result.success) {
    return false;
  } else {
    return true;
  }
}

export const maxLength = (length: number, value: string): boolean => {
  const schema = z.object({
    value: z.string().max(length)
  });
  
  const data = { value };
  const result = schema.safeParse(data);
  if (result.success) {
    return false;
  } else {
    return true;
  }
}

export const isEmail = (value: string): boolean => {
  const schema = z.object({
    value: z.string().email()
  });
  const data = { value };
  const result = schema.safeParse(data);
  if (result.success) {
    return false;
  } else {
    return true;
  }
}

export const isNotOnlyNumber = (value: string) => {
  const schema = z.object({
    value: z.coerce.number().int()
  });
  const data = { value };
  const result = schema.safeParse(data);
  if (result.success) {
    return true;
  } else {
    return false;
  }
}