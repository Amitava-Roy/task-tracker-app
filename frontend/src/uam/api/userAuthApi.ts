import { baseApi } from "@/utils/axiosConfig";
import toast from "react-hot-toast";

type UserRegistration = {
  email: string;
  password: string;
  name: string;
};
//sing up user
export const signUpUser = async (data: UserRegistration) => {
  try {
    const response = await baseApi.post("/api/v1/user/signUp", {
      username: data.name,
      email: data.email,
      password: data.password,
    });
    return response.data;
  } catch (error) {
    toast.error("Error signing up user");
    console.error("Error signing up user:", error);
    throw error;
  }
};

//sign in user
export const signInUser = async (data: { email: string; password: string }) => {
  try {
    const response = await baseApi.post("/api/v1/user/signIn", data);
    return response.data;
  } catch (error) {
    console.error("Error signing in user:", error);
    throw error;
  }
};
