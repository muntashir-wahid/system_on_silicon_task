import React from "react";
import { Link } from "react-router-dom";
import SectionWrapper from "../../components/SectionWrapper/SectionWrapper";

const ErrorPage = () => {
  return (
    <SectionWrapper className="min-h-screen p-12 flex justify-center items-center">
      <div>
        <h2 className="text-3xl text-center font-medium">
          Something went wrong!
          <Link to="/" className="btn btn-link p-0 text-3xl normal-case">
            Go to home
          </Link>
        </h2>
      </div>
    </SectionWrapper>
  );
};

export default ErrorPage;
