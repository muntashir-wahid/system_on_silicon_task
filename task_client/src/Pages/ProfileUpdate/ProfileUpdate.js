import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import FormErrorMessage from "../../components/FormErrorMessage/FormErrorMessage";
import SectionWrapper from "../../components/SectionWrapper/SectionWrapper";
import { AuthContext } from "../../store/AuthProvider";

const ProfileUpdate = () => {
  const { currUser, setIsUpdated } = useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const submitHandler = (data) => {
    console.log(data);

    fetch(
      `https://dev-profile-server.vercel.app/api/v1/users/${currUser._id}`,
      {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status === "success") {
          setIsUpdated(true);
          toast.success("Your profile is updated");
        }
      });
    reset();
    setIsUpdated(false);
  };

  return (
    <SectionWrapper className="p-6">
      <h2 className="text-4xl text-center font-semibold mb-8">
        Update your profile
      </h2>

      <div className="w-full md:max-w-xl mx-auto p-6 bg-base-200 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit(submitHandler)}>
          <div className="form-control w-full">
            <label className="label">
              <span className="label-text">Full Name</span>
            </label>
            <input
              {...register("fullName", {
                required: "New full name is required",
              })}
              type="text"
              placeholder={currUser?.fullName}
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
                required: "New email is required",
              })}
              type="email"
              placeholder={currUser?.email}
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
                required: "New password is required",
                minLength: {
                  value: 6,
                  message: "Password should be more then 6 charecters",
                },
              })}
              placeholder={currUser?.password}
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
                required: "New image is required",
              })}
              placeholder={currUser?.imageUrl}
              type="text"
              className="input input-bordered w-full"
            />
            {errors?.imageUrl && (
              <FormErrorMessage message={errors?.imageUrl?.message} />
            )}
          </div>
          <div className="form-control w-full my-5">
            <input type="submit" value="Update" className="btn btn-primary" />
          </div>
        </form>
      </div>
    </SectionWrapper>
  );
};

export default ProfileUpdate;
