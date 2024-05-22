import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import Loading from "@/components/Loading";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { MenuItem as MenuItemType } from "@/types";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

function DetailPage() {
  const { restaurantId } = useParams();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  if (isLoading) {
    return (
      <div className="flex justify-center text-center align-middle">
        <Loading />
      </div>
    );
  }

  // Add item to cart
  const addToCart = (menuItem: MenuItemType) => {
    setCartItems((prevCartItems) => {
      // Check if the item already exists in the cart
      const existingCartItem = prevCartItems.find(
        (cartItem) => cartItem._id === menuItem._id
      );
      let updatedCartItems;

      // If the item is already in the cart, increase the quantity
      if (existingCartItem) {
        updatedCartItems = prevCartItems.map((cartItem) =>
          cartItem._id === existingCartItem._id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      } else {
        // If the item is not in the cart, add the item with quantity 1
        updatedCartItems = [
          ...prevCartItems,
          {
            _id: menuItem._id,
            name: menuItem.name,
            price: menuItem.price,
            quantity: 1,
          },
        ];
      }

      // Save updated cart items to session storage
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedCartItems)
      );

      return updatedCartItems;
    });
  };

  // Remove item from cart
  const removeFromCart = (menuItem: MenuItemType) => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.filter(
        (item) => item._id !== menuItem._id
      );

      // Save updated cart items to session storage
      sessionStorage.setItem(
        `cartItems-${restaurantId}`,
        JSON.stringify(updatedItems)
      );

      return updatedItems;
    });
  };

  return (
    <div className="flex flex-col gap-10 my-8">
      {/* Header Image */}
      <AspectRatio ratio={16 / 5}>
        <img
          src={restaurant?.imageUrl}
          className="rounded-md object-cover h-full w-full"
        />
      </AspectRatio>
      {/* Menu Items and checkout grid */}
      <div className="grid md:grid-cols-[4fr_2fr] gap-5">
        {/* Left side menu item */}
        <div>
          {/* Restaurant header info */}
          <RestaurantInfo restaurant={restaurant} />

          {/* Restaurant Item list */}
          <div className="text-2xl font-bold tracking-tight py-6">Menu</div>

          {restaurant?.menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem._id}
              menuItem={menuItem}
              addToCart={() => addToCart(menuItem)}
            />
          ))}
        </div>

        {/* Right side checkout card */}
        <div>
          <Card>
            {/* Order summary  */}
            <OrderSummary
              restaurant={restaurant}
              cartItems={cartItems}
              removeFromCart={removeFromCart}
            />
            {/* Order footer button  */}
            <CardFooter>
              <CheckoutButton />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
