import api from "@/lib/axios";
import {
  taskSchema,
  type Project,
  type Task,
  type TaskFormData,
} from "@/types";
import { isAxiosError } from "axios";

type TaskAPi = {
  formData: TaskFormData;
  projectId: Project["_id"];
  taskId: Task["_id"];
  status: Task["status"];
};

export async function createTask({
  formData,
  projectId,
}: Pick<TaskAPi, "formData" | "projectId">) {
  try {
    const url = `/projects/${projectId}/task`;
    const { data } = await api.post(url, formData);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const { data } = err.response;
      throw new Error(data.message);
    }
  }
}

export async function getTaskById({
  projectId,
  taskId,
}: Pick<TaskAPi, "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/task/${taskId}`;
    const { data } = await api.get(url);
    const res = taskSchema.safeParse(data);
    if (res.success) {
      return res.data;
    }
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const { data } = err.response;
      throw new Error(data.message);
    }
  }
}

export async function updateTask({
  formData,
  projectId,
  taskId,
}: Pick<TaskAPi, "formData" | "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/task/${taskId}`;
    const { data } = await api.put<string>(url, formData);
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const { data } = err.response;
      throw new Error(data.message);
    }
  }
}

export async function deleteTask({
  projectId,
  taskId,
}: Pick<TaskAPi, "projectId" | "taskId">) {
  try {
    const url = `/projects/${projectId}/task/${taskId}`;
    const { data } = await api.delete(url);
    return data;
  } catch (err) {
    console.log(err);
    if (isAxiosError(err) && err.response) {
      const { data } = err.response;
      throw new Error(data.message);
    }
  }
}

export async function updateStatus({
  projectId,
  taskId,
  status,
}: Pick<TaskAPi, "projectId" | "taskId" | "status">) {
  try {
    const url = `/projects/${projectId}/task/${taskId}/status`;
    const { data } = await api.post(url, { status });
    return data;
  } catch (err) {
    if (isAxiosError(err) && err.response) {
      const { data } = err.response;
      throw new Error(data.message);
    }
  }
}
