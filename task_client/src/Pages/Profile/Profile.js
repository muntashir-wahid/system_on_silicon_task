import React, { useContext } from "react";
import { Link } from "react-router-dom";
import SectionWrapper from "../../components/SectionWrapper/SectionWrapper";
import { AuthContext } from "../../store/AuthProvider";

const Profile = () => {
  const { currUser } = useContext(AuthContext);

  return (
    <SectionWrapper className="min-h-screen p-12">
      <h2 className="text-center text-4xl font-semibold mb-8">
        Welcome to your profile <br />
        <span className="text-primary">{currUser?.fullName}</span>
      </h2>
      <div className="flex gap-8 w-full md:max-w-xl md:mx-auto">
        <figure>
          <img
            src={currUser?.imageUrl}
            className="max-h-80"
            alt={currUser?.fullName}
          />
        </figure>
        <div className="text-xl space-y-3">
          <p>Full Name: {currUser?.fullName}</p>
          <p>Email: {currUser?.email}</p>
          <Link
            to={`/profile/${currUser?._id}/update`}
            className="btn btn-primary"
          >
            Edit Profile
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
};

export default Profile;
