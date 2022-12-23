import React from "react";

const FormErrorMessage = ({ message, className }) => {
  return <p className={`text-red-500 my-2 ${className}`}>{message}</p>;
};

export default FormErrorMessage;
