import {
  FormDescription,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { cuisineList } from "@/config/restaurant-options-config";
import { useFormContext } from "react-hook-form";
import CuisineCheckbox from "./CuisineCheckbox";

export default function CuisinesSection() {
  const { control } = useFormContext();

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold">Cuisines</h2>

        <FormDescription>
          Select cuisines that your restaurant serves
        </FormDescription>

        <FormField
          control={control}
          name="cuisines" // Correct field name
          render={({ field }) => (
            <FormItem>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-1">
                {cuisineList.map((cuisineItem) => (
                  <CuisineCheckbox
                    key={cuisineItem}
                    cuisine={cuisineItem}
                    field={field}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
}
