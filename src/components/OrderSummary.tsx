import { CartItem } from "@/pages/DetailPage";
import { Restaurant } from "@/types";
import { CardContent, CardHeader, CardTitle } from "./ui/card";
import { Trash } from "lucide-react";
import { Separator } from "./ui/separator";
import { Badge } from "./ui/badge";

type Props = {
  restaurant?: Restaurant;
  cartItems?: CartItem[];
  removeFromCart: (cartItem: CartItem) => void;
};

export default function OrderSummary({
  restaurant,
  cartItems,
  removeFromCart,
}: Props) {
  const getTotalCost = () => {
    const totalInPence =
      cartItems?.reduce(
        (total, cartItem) => total + cartItem.price * cartItem.quantity,
        0
      ) || 0;

    const deliveryPrice = restaurant?.deliveryPrice ?? (0 as number);
    const totalWithDelivery = totalInPence + deliveryPrice;

    return (totalWithDelivery / 100).toFixed(2);
  };

  return (
    <>
      <CardHeader>
        <CardTitle className="text-2xl font-bold tracking-tight flex justify-between">
          <span>Your Order</span>
          <span>£{getTotalCost()}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-5">
        {cartItems?.map((item) => (
          <div key={item._id} className="flex justify-between">
            <span>
              <Badge variant="outline" className="mr-2">
                {item.quantity}
              </Badge>
              {item.name}
            </span>
            <span className="flex items-center gap-1">
              <Trash
                className="cursor-pointer"
                color="red"
                size={20}
                onClick={() => removeFromCart(item)}
              />
              £{((item.price * item.quantity) / 100).toFixed(2)}
            </span>
          </div>
        ))}
        <Separator />
        <div className="flex justify-between">
          <span>Delivery</span>
          <span>£{((restaurant?.deliveryPrice ?? 0) / 100).toFixed(2)}</span>
        </div>
        <Separator />
      </CardContent>
    </>
  );
}
