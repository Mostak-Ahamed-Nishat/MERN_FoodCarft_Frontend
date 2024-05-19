import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import ManageRestaurantForm from "@/forms/mage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  //Create a restaurant
  const { createRestaurant, isLoading } = useCreateMyRestaurant();
  //Get the restaurant data
  const { restaurant } = useGetMyRestaurant();
  //Update the restaurant
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  //Get the truthy value is the restaurant exist or not

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isLoading || isUpdateLoading}
      restaurant={restaurant}
    />
  );
}
