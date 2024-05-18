import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useFormContext } from "react-hook-form";

export default function DetailsSection() {
  const { control } = useFormContext();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Details</h2>

        <FormDescription>
          Enter the details about your restaurant
        </FormDescription>

        <FormField
          control={control}
          name="restaurantName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  className="bg-white"
                  placeholder="Restaurant Name"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex gap-4">
          <FormField
            control={control}
            name="city"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>City</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white "
                    placeholder="Enter your city"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="country"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Country</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    className="bg-white"
                    placeholder="Enter country name"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex gap-4">
          <FormField
            control={control}
            name="deliveryPrice"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Delivery Price ($)</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" placeholder="1.50$" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="estimatedDeliveryTime"
            render={({ field }) => (
              <FormItem className="flex-1">
                <FormLabel>Estimated Delivery Time (minutes)</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" placeholder="15" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </div>
  );
}
