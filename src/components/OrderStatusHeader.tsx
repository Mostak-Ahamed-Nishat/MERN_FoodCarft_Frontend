import { Order } from "@/types";
import { Progress } from "./ui/progress";
import { ORDER_STATUS } from "@/config/order-status-config";

type Props = {
  order: Order;
};

const OrderStatusHeader = ({ order }: Props) => {
  //Config time based on need to show on the ui
  const getExpectedDelivery = () => {
    const created = new Date(order.createdAt);
    created.setMinutes(
      created.getMinutes() + order.restaurant.estimatedDeliveryTime
    );
    const hours = created.getHours();
    const minutes = created.getMinutes();

    //hour 12, minutes:2 ? paddeMinutes: 02
    const paddedMinutes = minutes < 10 ? `0 ${minutes}` : minutes;

    return `${hours}:${paddedMinutes}`;
  };

  //Get the progress value based on order status
  const getOrderStatusInfo = () => {
    return (
      ORDER_STATUS.find((o) => o.value === order.status) || ORDER_STATUS[0]
    );
  };

  return (
    <>
      <h1 className=" text-4xl font-bold tracking-tighter flex flex-col gap-5 md:flex-row md:justify-between">
        <span className="">Order Status" {getOrderStatusInfo().label}</span>
        <span>Expected by: {getExpectedDelivery()}</span>
      </h1>
      <Progress
        className="animate-pulse"
        value={getOrderStatusInfo().progressValue}
      />
    </>
  );
};
export default OrderStatusHeader;
