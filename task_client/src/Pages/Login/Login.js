import React, { useContext } from "react";
import Lottie from "react-lottie";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import registerAnimation from "../../assets/registerAnimation.json";
import SectionWrapper from "../../components/SectionWrapper/SectionWrapper";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import { AuthContext } from "../../store/AuthProvider";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: registerAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Login = () => {
  const { loginHandler } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = (data) => {
    toast("Loging in your account.Please wait...");

    loginHandler(data);
    reset();
  };

  return (
    <SectionWrapper className="p-8">
      <h2 className="text-center font-semibold text-4xl mb-12">Please Login</h2>

      <div className="flex items-center flex-col-reverse lg:flex-row gap-5">
        <div className="w-full h-full md:w-2/3 md:mx-auto lg:w-1/2 p-6 bg-base-200 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                })}
                type="email"
                placeholder="Ex: example@gmail.com"
                className="input input-bordered w-full"
              />
              {errors?.email && (
                <FormErrorMessage message={errors?.email?.message} />
              )}
            </div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password should be more then 6 charecters",
                  },
                })}
                placeholder="Ex: abc123"
                type="password"
                className="input input-bordered w-full"
              />
              {errors?.password && (
                <FormErrorMessage message={errors?.password?.message} />
              )}
            </div>

            <div className="form-control w-full my-5">
              <input type="submit" value="Login" className="btn btn-primary" />
            </div>
          </form>
          <div className="my-5">
            <p>
              Haven't an account?
              <Link to="/" className="btn btn-link p-0">
                Register
              </Link>
            </p>
          </div>
        </div>
        <div className="hidden sm:block sm:w-full lg:w-1/2">
          <Lottie options={defaultOptions} height={500} width={500} />
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Login;
