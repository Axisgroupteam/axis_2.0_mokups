import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginSchema } from "./schema";
import FormError from "@/molecules/form-error";
import Password from "@/molecules/password";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "@/redux/slice/auth.slice";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = (data) => {
    // Set dummy user credentials
    const dummyUserData = {
      email: data.email,
      name: "Super Admin",
      role: "superadmin",
      id: "1",
      token: "dummy-token-12345",
    };

    // Dispatch login action
    dispatch(loginUser(dummyUserData));

    // Store token in localStorage
    localStorage.setItem("token", dummyUserData.token);

    // Navigate to app
    navigate("/app");
  };

  return (
    <div className="flex w-full justify-center items-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="pb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="w-[400px]">
            <div className="mb-4 p-3 bg-slate-100 rounded-md border border-slate-200">
              <p className="text-sm font-semibold text-slate-700 mb-1">Dummy Credentials:</p>
              <p className="text-xs text-slate-600">Email: admin@example.com</p>
              <p className="text-xs text-slate-600">Password: admin123</p>
            </div>
            <div className="flex flex-col gap-2">
              <Label>Email address</Label>
              <Controller
                control={control}
                name="email"
                render={({ field: { onChange, value } }) => (
                  <Input
                    type="text"
                    placeholder="john@example.com"
                    onChange={onChange}
                    value={value}
                  />
                )}
              />
            </div>

            <div className="flex flex-col  pt-3">
              <Label>Password</Label>
              <Password
                type="text"
                fieldName={"password"}
                control={control}
                placeholder="**********"
                errors={errors}
              />
            </div>

            <Button type="submit" className="mt-2 w-full">
              Login
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default LoginPage;
