import { useGetMyOrders } from "../api/OrderApi";
import OrderStatusHeader from "@/components/OrderStatusHeader";
import Loading from "@/components/Loading";
export default function OrderStatusPage() {
  const { orders, isLoading } = useGetMyOrders();
  if (isLoading) {
    return <Loading />;
  }

  if (!orders || orders.length == 0) {
    return (
      <div className="flex justify-center items-center text-xl">
        No Orders found
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {orders.map((order) => (
        <div className="space-y-10 bg-gray-50 p-10 rounded-lg">
          <OrderStatusHeader order={order} />
        </div>
      ))}
    </div>
  );
}
