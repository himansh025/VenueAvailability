import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogIn, Mail, Lock } from "lucide-react";
import { login } from "../Store/slicer";
import axiosInstance from "../config/apiconfig";
import { useState } from "react";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await axiosInstance.post("/users/login", data);
      const user = response.data.user;
      if (user) {
        dispatch(login({ user }));
        sessionStorage.setItem('token', response?.data?.token);
        toast.success("Login successful!");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white mt-20 rounded-lg shadow-md p-8 ">
      <div className="text-center mb-8">
        <div className="bg-indigo-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
          <LogIn className="text-indigo-600" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              {...register("email")}
              className="pl-10 input-field"
              placeholder="email@example.com"
            />
          </div>
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              {...register("password")}
              className="pl-10 input-field"
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
          )}
        </div>

        <button
          type="submit"
          className="btn-primary w-full flex items-center justify-center px-4 py-2 rounded-3xl bg-blue-400 gap-2"
          disabled={isSubmitting || loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-500"></div>
          ) : (
            <>
              <LogIn size={18} />
              Sign In
            </>
          )}
        </button>
      </form>

 
    </div>
  );
}

export default Login;