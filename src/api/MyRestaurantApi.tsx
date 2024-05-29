import { Order, Restaurant } from "@/types";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//Get restaurant
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getRestaurantRequest = async () => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get data.");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery(
    "fetchMyRestaurant",
    getRestaurantRequest
  );

  return { restaurant, isLoading };
};

// create restaurant  : Promise<SafeRestaurant>
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isLoading,
    isSuccess,
    error,
  } = useMutation(createMyRestaurantRequest, {
    onSuccess: () => {
      queryClient.invalidateQueries("fetchMyRestaurant");
      toast.success("Data updated successfully");
    },
    onError: () => {
      toast.error("Unable to update data");
    },
  });

  if (isSuccess) {
    toast.success("Restaurant created!");
  }

  if (error) {
    console.log(error);
    toast.error("Unable to create restaurant");
  }

  return { createRestaurant, isLoading };
};

//Update restaurant
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const updateMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Unable to update");
    }

    return response.json();
  };

  const { mutate: updateRestaurant, isLoading } = useMutation(
    updateMyRestaurantRequest,
    {
      onSuccess: () => {
        queryClient.invalidateQueries("fetchMyRestaurant");
        toast.success("Data updated successfully");
      },
      onError: () => {
        toast.error("Unable to update data");
      },
    }
  );

  return { updateRestaurant, isLoading };
};

//Get the orders from customer
export const useGetMyRestaurantOrders = () => {
  const { getAccessTokenSilently } = useAuth0();
  const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
    const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/restaurant/orders`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get the orders for restaurant owner");
    }
    return response.json();
  };

  const {
    data: getOrders,
    isLoading,
    error,
  } = useQuery("fetchMyRestaurantOrders", getMyRestaurantOrdersRequest);

  if (error) {
    toast.error(error.toString());
  }

  return { getOrders, isLoading };
};

type UpdateOrderStatusRequest = {
  orderId: string;
  status: string;
};

//Update the orders status for customer
export const useUpdateMyRestaurantOrder = () => {
  const { getAccessTokenSilently } = useAuth0();

  const useUpdateMyRestaurantOrderRequest = async (
    updateStatusOrderRequest: UpdateOrderStatusRequest
  ) => {
    const accessToken = await getAccessTokenSilently();

    console.log("Hitting the api");
    console.log(updateStatusOrderRequest);

    const response = await fetch(
      `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ status: updateStatusOrderRequest.status }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to update status");
    }
    return response.json();
  };

  const {
    mutate: updateOrderStatus,
    isLoading,
    error,
    isSuccess,
  } = useMutation(useUpdateMyRestaurantOrderRequest);

  if (isSuccess) {
    toast.success("Order Status Updated");
  }

  if (error) {
    toast.error(error.toString());
  }

  return { updateOrderStatus, isLoading };
};
