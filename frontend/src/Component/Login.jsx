import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDispatch } from "react-redux";
<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogIn, Mail, Lock, X } from "lucide-react";
=======
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LogIn, Mail, Lock } from "lucide-react";
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
import { login } from "../Store/slicer";
import axiosInstance from "../Config/apiconfig";
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
<<<<<<< HEAD
        sessionStorage.setItem("token", response?.data?.token);
=======
        sessionStorage.setItem('token', response?.data?.token);
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
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
<<<<<<< HEAD
    <div className="max-w-md mx-auto bg-white mt-20 rounded-lg shadow-md p-8">
=======
    <div className="max-w-md mx-auto bg-white mt-20 rounded-lg shadow-md p-8 ">
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
      <div className="text-center mb-8">
        <div className="bg-indigo-100 rounded-full p-3 w-12 h-12 mx-auto mb-4 flex items-center justify-center">
          <LogIn className="text-indigo-600" size={24} />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
        <p className="text-gray-600 mt-2">Sign in to your account</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
<<<<<<< HEAD
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
=======
          <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="email"
              {...register("email")}
<<<<<<< HEAD
              className="pl-10 input-field w-full border rounded-md py-2 px-3"
=======
              className="pl-10 input-field"
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
              placeholder="email@example.com"
            />
          </div>
          {errors.email && (
<<<<<<< HEAD
            <p className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
=======
            <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
          )}
        </div>

        <div>
<<<<<<< HEAD
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
=======
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="password"
              {...register("password")}
<<<<<<< HEAD
              className="pl-10 input-field w-full border rounded-md py-2 px-3"
=======
              className="pl-10 input-field"
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
              placeholder="••••••••"
            />
          </div>
          {errors.password && (
<<<<<<< HEAD
            <p className="mt-1 text-sm text-red-600">
              {errors.password.message}
            </p>
=======
            <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
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
<<<<<<< HEAD
=======

 
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
    </div>
  );
}

<<<<<<< HEAD
function LoginModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="relative w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-700"
        >
          <X size={20} />
        </button>
        <Login />
      </div>
    </div>
  );
}

export default Login;
export { LoginModal };
=======
export default Login;
>>>>>>> 75695b22ada2085138891a591339d35f252a19fc
