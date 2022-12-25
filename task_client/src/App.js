import { Fragment } from "react";
import { Toaster } from "react-hot-toast";
import { RouterProvider } from "react-router-dom";
import router from "./routes/routes/routes";

function App() {
  return (
    <Fragment>
      <Toaster position="top-center" reverseOrder={false} />
      <RouterProvider router={router} />
    </Fragment>
  );
}

export default App;
