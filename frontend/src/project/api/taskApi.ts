import { baseApi } from "@/utils/axiosConfig";

export const getAllTask = async (token: string, projectId: string) => {
  try {
    const response = await baseApi.get(`/api/v1/tasks/${projectId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching projects:", error);
    throw error;
  }
};

//create project
export const createTask = async (
  token: string,
  data: {
    title: string;
    description: string;
    projectId: string;
    status?: string;
  }
) => {
  try {
    const response = await baseApi.post("/api/v1/tasks", data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

//update task
export const updateTask = async (
  token: string,
  data: {
    title?: string;
    description?: string;
    projectId?: string;
    status?: string;
  },
  taskId: string
) => {
  try {
    const response = await baseApi.patch(`/api/v1/tasks/${taskId}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};

//delete task
export const deleteTask = async (token: string, taskId: string) => {
  try {
    const response = await baseApi.delete(`/api/v1/tasks/${taskId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    throw error;
  }
};
