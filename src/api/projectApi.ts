import api from "@/lib/axios";
import {
  dashboardProjectSchema,
  type Project,
  type ProjectFormData,
} from "@/types";
import { isAxiosError } from "axios";

export async function createProject(dato: ProjectFormData) {
  try {
    const { data } = await api.post("/projects", dato);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const { data } = err.response;
      throw new Error(data.error);
    }
  }
}

export async function getProjects() {
  try {
    const { data } = await api.get("/projects");
    const res = dashboardProjectSchema.safeParse(data);
    if (res.success) {
      return res.data;
    }
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const { data } = err.response;
      throw new Error(data.error);
    }
  }
}

export async function getProjectById(id: Project["_id"]) {
  try {
    const { data } = await api.get(`/projects/${id}`);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const { data } = err.response;
      throw new Error(data.error);
    }
  }
}

type ProjectAPIType = {
  formData: ProjectFormData;
  projectId: Project["_id"];
};

export async function updateProject({ formData, projectId }: ProjectAPIType) {
  try {
    const { data } = await api.put<string>(`/projects/${projectId}`, formData);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const { data } = err.response;
      throw new Error(data.error);
    }
  }
}

export async function deleteProject(id: Project["_id"]) {
  try {
    const { data } = await api.delete<string>(`/projects/${id}`);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const { data } = err.response;
      throw new Error(data.error);
    }
  }
}
