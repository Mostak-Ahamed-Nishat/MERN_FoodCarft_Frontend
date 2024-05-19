import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection";
import CuisinesSection from "./CuisinesSection";
import { Separator } from "@/components/ui/separator";
import MenuSection from "./MenuSection";
import ImageSection from "./ImageSection";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";

type Props = {
  onSave: (restaurantFormData: FormData) => void;
  isLoading: boolean;
};

const formSchema = z.object({
  restaurantName: z
    .string({
      required_error: "Restaurant Name is required",
    })
    .min(5, "Name can't be less than 5 char")
    .trim(),
  city: z.string({
    required_error: "city Name is required",
  }),
  country: z.string({
    required_error: "city Name is required",
  }),
  //We always get sting data by form. make it number
  deliveryPrice: z.coerce.number({
    required_error: "Delivery price is required",
    invalid_type_error: "Must be a valid number",
  }),
  estimatedDeliveryTime: z.coerce.number({
    required_error: "Estimated Delivery Time is required",
    invalid_type_error: "Must be a valid number",
  }),
  cuisines: z.array(z.string()).nonempty({
    message: "Please select at least one item",
  }),
  menuItem: z
    .array(
      z.object({
        name: z.string().min(3, "Item name required"),
        price: z.coerce.number({
          required_error: "Item Price is required",
          invalid_type_error: "Must be a valid number",
        }),
      })
    )
    .nonempty({
      message: "Please select at least one item",
    }),

  imageFIle: z.instanceof(File, { message: "Image is required" }),
});

//Form data type
type formData = z.infer<typeof formSchema>;

const onSubmit = (formDataJson: formData) => {
  //   Todo - convert formDataJson to a new formData object
};

function ManageRestaurantForm({ onSave, isLoading }: Props) {
  const form = useForm<formData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cuisines: [],
      menuItems: [{ name: "", price: 0 }],
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className=" space-y-8 bg-gray-50 p-10 rounded-lg my-10 "
      >
        <DetailsSection />
        <Separator className="my-4" />
        <CuisinesSection />
        <Separator className="my-4" />
        <MenuSection />
        <Separator className="my-4" />
        <ImageSection />
        {isLoading ? <LoadingButton /> : <Button type="submit">Submit</Button>}
      </form>
    </Form>
  );
}

export default ManageRestaurantForm;
