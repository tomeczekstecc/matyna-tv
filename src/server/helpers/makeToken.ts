import jwt from "jsonwebtoken";

export const makeJWTToken = async (user, type = 'reset') => {
  const secret = type === 'reset' ? process.env.JWT_SECRET_RESET : process.env.JWT_SECRET_VERIFY
  return await jwt.sign({
      id: user.id,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
    }, secret, {
      expiresIn: process.env.JWT_SECRET_EXP,
    }
  ) as string
}
