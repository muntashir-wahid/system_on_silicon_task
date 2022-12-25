import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import ErrorPage from "../../Pages/Error/ErrorPage";
import Login from "../../Pages/Login/Login";
import Profile from "../../Pages/Profile/Profile";
import ProfileUpdate from "../../Pages/ProfileUpdate/ProfileUpdate";
import Registration from "../../Pages/Registration/Registration";
import TermsAndConditions from "../../Pages/TermsAndConditions/TermsAndConditions";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { index: true, element: <Registration /> },
      { path: "login", element: <Login /> },
      {
        path: "profile/:id",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "profile/:id/update",
        element: (
          <PrivateRoute>
            <ProfileUpdate />
          </PrivateRoute>
        ),
      },
      { path: "terms", element: <TermsAndConditions /> },
    ],
  },
]);

export default router;
