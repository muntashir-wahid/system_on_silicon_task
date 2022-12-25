import React, { useContext } from "react";
import Lottie from "react-lottie";
import { useForm } from "react-hook-form";
import SectionWrapper from "../../components/SectionWrapper/SectionWrapper";
import registerAnimation from "../../assets/registerAnimation.json";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import { Link } from "react-router-dom";
import { AuthContext } from "../../store/AuthProvider";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: registerAnimation,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Registration = () => {
  const { createUserHandler } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = (data) => {
    const newUser = {
      ...data,
    };

    createUserHandler(newUser);
    reset();
  };

  return (
    <SectionWrapper className="p-8">
      <h2 className="text-center font-semibold text-4xl mb-12">
        Please Register
      </h2>
      <div className="flex flex-col-reverse lg:flex-row gap-5">
        <div className="w-full md:w-2/3 md:mx-auto lg:w-1/2 p-6 bg-base-200 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit(submitHandler)}>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Full Name</span>
              </label>
              <input
                {...register("fullName", {
                  required: "Full name is required",
                })}
                type="text"
                placeholder="Ex: Muntashir Wahid"
                className="input input-bordered w-full"
              />
              {errors?.fullName && (
                <FormErrorMessage message={errors?.fullName?.message} />
              )}
            </div>
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
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Photo URL</span>
              </label>
              <input
                {...register("imageUrl", {
                  required: "Image is required",
                })}
                placeholder="Ex: https://examplephoto.com"
                type="text"
                className="input input-bordered w-full"
              />
              {errors?.imageUrl && (
                <FormErrorMessage message={errors?.imageUrl?.message} />
              )}
            </div>
            <div className="form-control w-full my-5">
              <input
                type="submit"
                value="Register"
                className="btn btn-primary"
              />
            </div>
          </form>
          <div className="my-5">
            <p>
              Already have an account?
              <Link to="/login" className="btn btn-link p-0">
                Login
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

export default Registration;
