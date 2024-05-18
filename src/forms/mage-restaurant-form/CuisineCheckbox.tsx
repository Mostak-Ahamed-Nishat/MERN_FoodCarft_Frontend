import { Checkbox } from "@/components/ui/checkbox";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { ControllerRenderProps, FieldValues } from "react-hook-form";

type Props = {
  cuisine: string;
  field: ControllerRenderProps<FieldValues, "cuisines">;
};

export default function CuisineCheckbox({ cuisine, field }: Props) {
  return (
    <FormItem className="flex flex-row items-center space-x-1 skew-y-0 mt-2">
      <FormControl>
        <Checkbox
          className="bg-white"
          // checked={Array.isArray(field.value) && field.value.includes(cuisine)}
          checked={field.value.includes(cuisine)}
          onCheckedChange={(checked) => {
            if (checked) {
              //Add the cuisine to the array
              field.onChange([...field.value, cuisine]);
            } else {
              field.onChange(
                field.value.filter((value: string) => value !== cuisine)
              );
            }
          }}
        />
      </FormControl>
      <FormLabel className="text-sm font-normal">{cuisine}</FormLabel>
    </FormItem>
  );
}
