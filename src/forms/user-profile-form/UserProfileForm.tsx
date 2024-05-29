import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SafeUser } from "@/types";
import { useEffect } from "react";
import Loading from "@/components/Loading";

const formSchema = z.object({
  //email is optional because it's readonly field. No need to add validation it'll always be there
  email: z.string().optional(),
  name: z.string().min(3, "Name at least 3 character").max(40),
  addressLine1: z
    .string()
    .min(5, "Address should be more than 5 character")
    .max(80),
  city: z.string().min(3, "City should be more than 3 character").max(40),
  country: z.string().min(3, "Country should be more than 3 character").max(40),
});

//extract the type
export type UserFormData = z.infer<typeof formSchema>;

//Update profile props type
type Props = {
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  currentUser: SafeUser;
  title: string;
  buttonText: string;
};

//********Update profile component
const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title = "User Profile",
  buttonText = "Submit",
}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: currentUser,
  });

  //Set default value
  useEffect(() => {
    form.reset(currentUser);
  }, [currentUser, form]);

  return (
    <div className="py-10">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSave)}
          className=" space-y-4 bg-gray-50 rounded-lg md:p-10 p-10"
        >
          <div>
            <h2 className=" text-2xl font-bold">{title}</h2>
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
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex flex-col md:flex-row gap-4 ">
            {/* Address  */}
            <FormField
              control={form.control}
              name="addressLine1"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input {...field} className="bg-white" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* City  */}
            <FormField
              control={form.control}
              name="city"
              render={({ field }) => {
                return (
                  <FormItem className="flex-1">
                    <FormLabel>City</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
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
                  <FormItem className="flex-1">
                    <FormLabel>Country</FormLabel>
                    <FormControl>
                      <Input {...field} className="bg-white" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
          </div>

          {isLoading ? (
            <Loading />
          ) : (
            <Button className=" bg-orange-500" type="submit">
              {buttonText}
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default UserProfileForm;
