import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SectionWrapper from "../../components/SectionWrapper/SectionWrapper";
import { AuthContext } from "../../store/AuthProvider";

const Profile = () => {
  const { currUser } = useContext(AuthContext);

  return (
    <div className="bg-base-100">
      <SectionWrapper className="min-h-screen p-12">
        <h2 className="text-center text-4xl font-semibold mb-8">
          Welcome to your profile <br />
          <span className="text-primary">{currUser?.fullName}</span>
        </h2>
        <div className="flex flex-col items-center md:flex-row  gap-8 w-full md:max-w-3xl mx-auto">
          <figure className="w-full md:w-1/2 overflow-hidden rounded-lg">
            <img
              className="rounded-lg shadow-lg hover:scale-110 hover:transition-all"
              src={currUser?.imageUrl}
              alt={currUser?.fullName}
            />
          </figure>
          <div className="text-xl space-y-3">
            <p>Full Name: {currUser?.fullName}</p>
            <p>Email: {currUser?.email}</p>
            <p>Password: {currUser?.password}</p>
            <Link
              to={`/profile/${currUser?._id}/update`}
              className="btn btn-primary"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};
export default Profile;
