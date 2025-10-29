import { z } from "zod";

const UserSignupModel = z.object({
  name: z
    .string()
    .min(2, { message: "Name must be at least 2 characters long." })
    .max(50, { message: "Name must not exceed 50 characters." })
    .regex(/^[a-zA-Z0-9]+$/, {
      message: "Name can only contain alphanumeric characters (A–Z, a–z, 0–9).",
    }),

  email: z
    .string()
    .email({ message: "Please provide a valid email address." })
    .min(6, { message: "Email must be at least 6 characters long." })
    .max(50, { message: "Email must not exceed 50 characters." }),

  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." })
    .max(16, { message: "Password must not exceed 16 characters." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

const UserLoginModel = z.object({
  email: z
    .string()
    .email({ message: "Please provide a valid email address." })
    .min(6, { message: "Email must be at least 6 characters long." })
    .max(50, { message: "Email must not exceed 50 characters." }),

  password: z
    .string()
    .min(4, { message: "Password must be at least 4 characters long." })
    .max(16, { message: "Password must not exceed 16 characters." })
    .regex(/[a-z]/, {
      message: "Password must contain at least one lowercase letter.",
    })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter.",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one digit." })
    .regex(/[^a-zA-Z0-9]/, {
      message: "Password must contain at least one special character.",
    }),
});

const errorPritify = (result) => {
  return z.prettifyError(result.error);
};

export { UserSignupModel, UserLoginModel, errorPritify };
