import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import ErrorPage from "../../Pages/Error/ErrorPage";
import Login from "../../Pages/Login/Login";
import Profile from "../../Pages/Profile/Profile";
import Registration from "../../Pages/Registration/Registration";
import TermsAndConditions from "../../Pages/TermsAndConditions/TermsAndConditions";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Registration /> },
      { path: "login", element: <Login /> },
      { path: "profile/:id", element: <Profile /> },
      { path: "terms", element: <TermsAndConditions /> },
    ],
  },
]);

export default router;
