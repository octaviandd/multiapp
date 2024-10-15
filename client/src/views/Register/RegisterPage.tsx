/** @format */

import { Button } from "@/components/layout/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/layout/card";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "@/components/layout/form";
import { Input } from "@/components/layout/input";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  first_name: z.string().nonempty({
    message: "First name is required.",
  }),
  last_name: z.string().nonempty({
    message: "Last name is required.",
  }),
  email: z.string().min(5, {
    message: "Must be a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirm_password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});
const randomFirstNames = ['Tom', 'John', 'Emma', 'Olivia', 'Liam', 'Noah', 'Sophia', 'Ava', 'James', 'Mia'];
const randomLastNames = ['Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis', 'Rodriguez', 'Martinez'];
const randomEmail = ['@gmail.com', '@yahoo.com', '@hotmail.com', '@outlook.com', '@icloud.com', '@protonmail.com', '@aol.com', '@zoho.com', '@yandex.com', '@mail.com'];

export function RegisterForm() {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      first_name: randomFirstNames[Math.floor(Math.random() * randomFirstNames.length)],
      last_name: randomLastNames[Math.floor(Math.random() * randomLastNames.length)],
      email: randomFirstNames[Math.floor(Math.random() * randomFirstNames.length)] + randomLastNames[Math.floor(Math.random() * randomLastNames.length)] + randomEmail[Math.floor(Math.random() * randomEmail.length)],
      password: "password",
      confirm_password: "password",
    },
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    }).then((res) => {
      if (res.status == 201) {
        navigate("/");
      } else {
        console.log(res);
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center w-full">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Register</CardTitle>
          <CardDescription>
            Enter your data below to register your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
              <FormField
                control={form.control}
                name="first_name"
                render={({ field, formState }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>First Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      {formState.errors.first_name?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="last_name"
                render={({ field, formState }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Last Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      {formState.errors.last_name?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field, formState }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      {formState.errors.email?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field, formState }) => (
                  <FormItem className="grid gap-2 relative">
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormDescription>
                      {formState.errors.password?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirm_password"
                render={({ field, formState }) => (
                  <FormItem className="grid gap-2">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>

                    <FormDescription>
                      {formState.errors.confirm_password?.message}
                    </FormDescription>
                  </FormItem>
                )}
              />
              <div className="grid gap-4 mt-4">
                <Button type="submit" className="w-full">
                  Register
                </Button>
              </div>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link to="/login" className="underline">
              Login
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
