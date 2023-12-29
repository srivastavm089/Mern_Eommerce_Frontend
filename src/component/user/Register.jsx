import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./register.css";
import { register as Register, clearErrors } from "../../redux/action/userAction";
import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../Loader";

export default function SignUp() {
  const [avatarLink, setAvatarLink] = useState(null);
  const [avatarPreview, setAvatarPreview] = useState(
    "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/800px-User-avatar.svg.png"
  );
  const { error, loading, isAuthenticated } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();




  useEffect(() => {
    toast.error(error, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    dispatch(clearErrors());
    if (isAuthenticated) {
      navigate("/account");
    }
  }, [dispatch , error, isAuthenticated, navigate]);





  return (
    <Fragment>
  {
    !loading ?      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        className="mx-auto h-10 w-auto"
        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
        alt="Your Company"
      />
      <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
        Sign in to your account
      </h2>
    </div>

    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form
        className="space-y-6"
        onSubmit={handleSubmit(
          ({ name, email, password, confirmPassword, avatar }) => {
            const reader = new FileReader();
            reader.readAsDataURL(avatar[0]);
            reader.onload = () => {
              if (reader.readyState == 2) {
                setAvatarLink(reader.result);
              }
            };

            dispatch(
              Register(name, email, password, (avatar = avatarLink))
            );
          }
        )}
        encType="multipart/form-data"
      >
        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Name
            </label>
          </div>
          <div className="mt-2">
            <input
              placeholder="Name"
              id="name"
              {...register("name", {
                required: "Name is required",
                minLength: {
                  value: 4,
                  message: "name charcter should be more then 4",
                },
                maxLength: {
                  value: 15,
                  message: "maximum chracter limit exceed",
                },
              })}
              type="text"
              autoComplete="current-name"
              formNoValidate
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.name && (
              <p className="text-red-500 text-center text-sm">
                {errors.name.message}
              </p>
            )}
          </div>
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6 text-gray-900"
          >
            Email address
          </label>
          <div className="mt-2">
            <input
              placeholder="Email"
              id="email"
              {...register("email", {
                required: "Email Id is required",
                pattern: {
                  value: /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/gim,
                  message: "Please Enter a correct mail id ",
                },
              })}
              autoComplete="email"
              formNoValidate
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.email && (
              <p className="text-red-500 text-center text-sm">
                {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Password
            </label>
          </div>
          <div className="mt-2">
            <input
              placeholder="Password"
              id="password"
              {...register("password", {
                required: "Password is required",
                pattern: {
                  value:
                    /^(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?!.*\s).*$/gm,
                  message: `- at least 8 characters
                  - must contain at least 1 uppercase letter, 1 lowercase letter, and 1 number
                  - Can contain special characters`,
                },
              })}
              type="password"
              autoComplete="current-password"
              formNoValidate
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
            {errors.password && (
              <p className="text-red-500 text-center text-sm">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>

        <div>
          <div className="mt-2 flex gap-2">
            <img src={avatarPreview} alt="logo" className="w-8" />
            <input
              {...register("avatar")}
              type="file"
              onChange={(e) => {
                const reader = new FileReader();
                reader.readAsDataURL(e.target.files[0]);
                reader.onload = () => {
                  if (reader.readyState == 2) {
                    setAvatarPreview(reader.result);
                  }
                };
              }}
              id="file"
              accept="image/*"
            />
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p className="mt-10 text-center text-sm text-gray-500">
        Already have an account?{" "}
        <Link
          to="/login"
          className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
        >
          login
        </Link>
      </p>
    </div>
  </div> :<Loader/>
  }
    </Fragment>
  );
}
