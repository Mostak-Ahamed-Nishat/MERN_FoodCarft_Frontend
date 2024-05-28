import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import Loading from "@/components/Loading";
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

  if (isLoading) {
    return <Loading />;
  }

  const isEditing = !!restaurant;

  return (
    <ManageRestaurantForm
      onSave={isEditing ? updateRestaurant : createRestaurant}
      isLoading={isLoading || isUpdateLoading}
      restaurant={restaurant}
    />
  );
}
