import { AppDataSource } from "../config/configDB.js";
import { User } from "../entities/user.entity.js";
import bcrypt from "bcrypt";

const userRepository = AppDataSource.getRepository(User);

export async function createUser(data) {
  const hashedPassword = await bcrypt.hash(data.password, 10);

  const newUser = userRepository.create({
    email: data.email,
    password: hashedPassword,
  });

  return await userRepository.save(newUser);
}

export async function findUserByEmail(email) {
  return await userRepository.findOneBy({ email });
}

//modificar perfil
export async function updateUserProfile(userId, data) {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new Error("Usuario no encontrado");

  if (data.email) {
    user.email = data.email;
  }

  if (data.password) {
    user.password = await bcrypt.hash(data.password, 10);
  }

  return await userRepository.save(user);
}

//para eliminar perfil
export async function deleteUserProfile(userId) {
  const user = await userRepository.findOneBy({ id: userId });
  if (!user) throw new Error("Usuario no encontrado");

  return await userRepository.remove(user);
}