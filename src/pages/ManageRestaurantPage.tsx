import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useGetMyRestaurantOrders,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";
import Loading from "@/components/Loading";
import OrderItemCard from "@/components/OrderItemCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ManageRestaurantForm from "@/forms/mage-restaurant-form/ManageRestaurantForm";

export default function ManageRestaurantPage() {
  //Create a restaurant
  const { createRestaurant, isLoading } = useCreateMyRestaurant();

  //Get the restaurant data
  const { restaurant } = useGetMyRestaurant();

  //Update the restaurant
  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  //Get the orders
  const { getOrders, isLoading: isGetOrdersLoading } =
    useGetMyRestaurantOrders();

  if (isLoading) {
    return <Loading />;
  }

  if (isGetOrdersLoading) {
    return <Loading />;
  }
  //Get the truthy value is the restaurant exist or not
  const isEditing = !!restaurant;

  return (
    <>
      <Tabs defaultValue="orders" className="mt-6">
        <TabsList>
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="restaurant">Manage Restaurant</TabsTrigger>
        </TabsList>

        <TabsContent
          value="orders"
          className=" space-y-5 bg-gray-50 pg-10 rounded-lg p-8 mb-6"
        >
          <h2 className="text-2xl font-bold">
            {getOrders?.length} Active Orders
          </h2>
          {getOrders?.map((order) => (
            <OrderItemCard order={order} />
          ))}
        </TabsContent>

        <TabsContent
          value="restaurant"
          className=" space-y-5 bg-gray-50 pg-10 rounded-lg"
        >
          <ManageRestaurantForm
            onSave={isEditing ? updateRestaurant : createRestaurant}
            isLoading={isLoading || isUpdateLoading}
            restaurant={restaurant}
          />
        </TabsContent>
      </Tabs>
    </>
  );
}
