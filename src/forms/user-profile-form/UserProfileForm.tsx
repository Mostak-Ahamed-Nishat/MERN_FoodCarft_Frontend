import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import LoadingButton from "@/components/LoadingButton";

const formSchema = z.object({
  //email is optional because it's readonly field. No need to add validation it'll always be there
  email: z.string().optional(),
  name: z.string().min(3, "Name at least 3 character").max(40),
  addressLine1: z.string().min(1, "Address is required").max(80),
  city: z.string().min(1, "City is required").max(40),
  country: z.string().min(1, "Country is required").max(40),
});

// extract the type
type userFormData = z.infer<typeof formSchema>;

type Props = {
  onSave: (userProfileData: userFormData) => void;
  isLoading: boolean;
};

const UserProfileForm = ({ onSave, isLoading }: Props) => {
  const form = useForm<userFormData>({
    resolver: zodResolver(formSchema),
  });

  //   function onSubmit(values: userFormData) {}

  return (
    <div className="py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className=" space-y-4 bg-gray-50 rounded-lg md:p-10 p-10"
        >
          <div>
            <h2 className=" text-2xl font-bold">User Profile Form</h2>
            <FormDescription>
              View and change your profile information here
            </FormDescription>
          </div>

          {/* Email  */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} disabled className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />

          {/* Name  */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-4">
            {/* Address  */}
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                </FormItem>
              )}
            />
            {/* City  */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white" />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
            {/* Country  */}
            <FormField
              control={form.control}
              name="country"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white" />
                    </FormControl>
                  </FormItem>
                );
              }}
            />
          </div>

          {isLoading ? (
            <LoadingButton />
          ) : (
            <Button className=" bg-orange-500" type="submit">
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;
