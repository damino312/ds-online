"use server";

import { InputType, ReturnType } from "./types";
import { db } from "@/lib/db";
import { createSafeAction } from "@/lib/create-safe-action";
import { SignUp } from "./schema";
import { hash } from "bcrypt";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { login, name, email, password } = data;
  if (!login || !name || !email || !password) {
    return {
      error: "Login, name, email or password is incorrect",
    };
  }
  let user;
  try {
    const isRegistered = await db.user.findFirst({
      where: {
        user_login: login,
        user_email: email,
      },
    });
    if (isRegistered) {
      return {
        error: "User with this login or email already exists",
      };
    }
    user = await db.user.create({
      data: {
        user_login: login,
        user_name: name,
        user_email: email,
        user_password: await hash(password, 10),
      },
    });
  } catch (error) {
    console.error(error);
    return {
      error: "Something went wrong",
    };
  }
  return { data: user };
};

export const signUp = createSafeAction(SignUp, handler);
