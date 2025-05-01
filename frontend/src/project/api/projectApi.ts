import { baseApi } from "@/utils/axiosConfig";

//get all projects
export const getAllProjects = async (token: string) => {
  try {
    const response = await baseApi.get("/api/v1/projects", {
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
export const createProject = async (
  token: string,
  data: { name: string; description: string }
) => {
  try {
    const response = await baseApi.post("/api/v1/projects", data, {
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
