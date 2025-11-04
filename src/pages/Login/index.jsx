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
import { loginThunk } from "@/redux/thunk/auth.thunk";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get loading and error state from Redux
  const { isLoading, error } = useSelector((state) => state.auth);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
  });

  const onSubmit = async (data) => {
    const result = await dispatch(loginThunk(data));
    if (loginThunk.fulfilled.match(result)) {
      navigate("/auth-loading");
    }
  };

  return (
    <div className="flex w-full justify-center items-center h-full ">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="pb-6">
          <CardHeader className="text-center">
            <CardTitle className="text-xl">Login</CardTitle>
            <CardDescription>
              Enter your credentials to get started
            </CardDescription>
          </CardHeader>

          <CardContent className="w-[400px]">
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

            <FormError error={error} />

            <Button type="submit" className="mt-2 w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  Create Account <Loader2 className="animate-spin size-5" />
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default LoginPage;
