// All the hooks that will interact with the user api endpoint will be here

import { SafeUser } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { toast } from "sonner";

// ************Create a user
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

type CreateUserRequest = {
  auth0Id: string;
  email: string;
};

export const useCreateUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    if (!response.ok) {
      throw new Error("Failed to create user /f");
    }
  };

  const {
    mutateAsync: createUser,
    isLoading,
    isError,
    isSuccess,
  } = useMutation(createMyUserRequest);

  return { createUser, isError, isLoading, isSuccess };
};

//************Update a user
type UpdateMyUserRequest = {
  name: string;
  city: string;
  addressLine1: string;
  country: string;
};

export const useUpdateMyUser = () => {
  //Get the token
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (formData: UpdateMyUserRequest) => {
    const accessToken = await getAccessTokenSilently();

    //Send the request to API
    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user information /f");
    }
    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isLoading,
    isError,
    isSuccess,
    error,
    reset,
  } = useMutation(updateMyUserRequest);

  if (isSuccess) {
    toast.success("Your data is updated");
  }

  if (isError) {
    toast.error("Failed to update data");
  }

  return { updateUser, isLoading, isError, isSuccess, error, reset };
};

// *********** Get the user data

export const useGetUser = (): Promise<SafeUser> => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async () => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get user data from db");
    }
    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    isError,
    error,
  } = useQuery("fetchCurrentUser", getMyUserRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { currentUser, isLoading };
};
