import { isAxiosError } from "axios";
import api from "@/lib/axios";
import type { Project, TeamMember, TeamMemberForm } from "@/types/index";

type TeamUsers = {
  id: TeamMember["_id"];
  formData: TeamMemberForm;
  projectId: Project["_id"];
};

export async function findUserByEmail({
  formData,
  projectId,
}: Pick<TeamUsers, "formData" | "projectId">) {
  try {
    const url = `/projects/${projectId}/team/find`;
    const { data } = await api.post<TeamMember>(url, formData);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message =
        error.response?.data.error || "Error al buscar el usuario";
      throw new Error(message);
    }
    throw new Error("Error inesperado al buscar el usuario");
  }
}

export async function addUserToProject({
  projectId,
  id,
}: Pick<TeamUsers, "projectId" | "id">) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.post<string>(url, { id });
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.error;
      throw new Error(message);
    }
    throw new Error("Error inesperado al agregar el usuario");
  }
}

export async function getProyectTeam(projectId: Project["_id"]) {
  try {
    const url = `/projects/${projectId}/team`;
    const { data } = await api.get<TeamMember[]>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.error;
      throw new Error(message);
    }
    throw new Error("Error inesperado al obtener el equipo del proyecto");
  }
}

export async function deleteUserFromProject({
  projectId,
  userId,
}: {
  projectId: Project["_id"];
  userId: TeamMember["_id"];
}) {
  try {
    const url = `/projects/${projectId}/team/${userId}`;
    const { data } = await api.delete<string>(url);
    return data;
  } catch (error) {
    if (isAxiosError(error)) {
      const message = error.response?.data.error;
      throw new Error(message);
    }
    throw new Error("Error inesperado al eliminar el usuario del proyecto");
  }
}
