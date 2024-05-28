import { useGetMyOrders } from "../api/OrderApi";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import Loading from "@/components/Loading";
import OrderStatusDetails from "@/components/OrderStatusDetails";
import { AspectRatio } from "@/components/ui/aspect-ratio";
export default function OrderStatusPage() {
  const { orders, isLoading } = useGetMyOrders();
  if (isLoading) {
    return <Loading />;
  }

  if (!orders || orders.length == 0) {
    return (
      <div className="flex justify-center items-center text-xl h-screen">
        <p>No Orders found</p>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
          <div className="grid gap-10 md:grid-cols-2">
            <OrderStatusDetails order={order} />
            <AspectRatio ratio={16 / 5}>
              <img
                className="rounded-md object-cover h-full w-full "
                src={order.restaurant.imageUrl}
                alt={order.restaurant.restaurantName}
              />
            </AspectRatio>
          </div>
        </div>
      ))}
    </div>
  );
}
