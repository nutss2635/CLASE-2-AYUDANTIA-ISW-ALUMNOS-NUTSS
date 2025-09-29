import { handleSuccess, handleErrorClient, handleErrorServer } from "../Handlers/responseHandlers.js";
import { updateUserProfile, deleteUserProfile } from "../services/user.service.js";

export function getPublicProfile(req, res) {
  handleSuccess(res, 200, "Perfil público obtenido exitosamente", {
    message: "¡Hola! Este es un perfil público. Cualquiera puede verlo.",
  });
}

export function getPrivateProfile(req, res) {
  const user = req.user;
  handleSuccess(res, 200, "Perfil privado obtenido exitosamente", {
    message: `¡Hola, ${user.email}! Este es tu perfil privado. Solo tú puedes verlo.`,
    userData: user,
  });
}

// 🔹 Modificar perfil
export async function patchUserProfile(req, res) {
  try {
    const userId = req.user.id;
    const updatedUser = await updateUserProfile(userId, req.body);
    handleSuccess(res, 200, "Perfil actualizado exitosamente", {
      id: updatedUser.id,
      email: updatedUser.email,
    });
  } catch (error) {
    handleErrorServer(res, 500, "Error al actualizar perfil", error.message);
  }
}

// 🔹 Eliminar perfil
export async function deleteUserAccount(req, res) {
  try {
    const userId = req.user.id;
    await deleteUserProfile(userId);
    handleSuccess(res, 200, "Perfil eliminado exitosamente", { id: userId });
  } catch (error) {
    handleErrorServer(res, 500, "Error al eliminar perfil", error.message);
  }
}
