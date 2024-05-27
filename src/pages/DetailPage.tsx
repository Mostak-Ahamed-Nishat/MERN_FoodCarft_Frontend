import { useCreateCheckoutSession } from "@/api/OrderApi";
import { useGetRestaurant } from "@/api/RestaurantApi";
import CheckoutButton from "@/components/CheckoutButton";
import Loading from "@/components/Loading";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { UserFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "sonner";

export type CartItem = {
  _id: string;
  name: string;
  price: number;
  quantity: number;
};

function DetailPage() {
  //Get the restaurantId from parameter
  const { restaurantId } = useParams();
  const { restaurant, isLoading } = useGetRestaurant(restaurantId);

  const { createCheckoutSession, isLoading: isCheckoutLoading } =
    useCreateCheckoutSession();

  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
    return storedCartItems ? JSON.parse(storedCartItems) : [];
  });

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

  //Checkout

  const onCheckout = async (userFormData: UserFormData) => {
    if (!restaurant) {
      return;
    }

    //Create the cartItem object to send the API
    const checkoutData = {
      cartItems: cartItems.map((cartItem) => ({
        menuItemId: cartItem._id,
        name: cartItem.name,
        quantity: cartItem.quantity.toString(),
      })),
      restaurantId: restaurant._id,
      deliveryDetails: {
        name: userFormData.name,
        addressLine1: userFormData.addressLine1,
        city: userFormData.city,
        country: userFormData.country,
        email: userFormData.email as string,
      },
    };

    const data = await createCheckoutSession(checkoutData);
    //Redirect to the url that stripe return
    if (data && data.url) {
      // Redirect to the URL that Stripe returns
      window.location.href = data.url;
    } else {
      // Handle error case when URL is not present
      toast.error("Error: Checkout session URL not found.");
    }
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
              <CheckoutButton
                disabled={cartItems.length == 0}
                onCheckout={onCheckout}
                isLoading={isCheckoutLoading}
              />
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DetailPage;
