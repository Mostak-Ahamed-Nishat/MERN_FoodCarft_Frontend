import ManageRestaurantForm from "@/forms/mage-restaurant-form/ManageRestaurantForm";
import React from "react";

export default function ManageRestaurantPage() {
  return (
    <ManageRestaurantForm
      onSave={function (restaurantFormData: FormData): void {
        throw new Error("Function not implemented.");
      }}
      isLoading={false}
    />
  );
}
