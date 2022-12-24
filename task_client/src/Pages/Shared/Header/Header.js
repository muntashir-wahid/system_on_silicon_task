import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../store/AuthProvider";

const Header = () => {
  const { currUser, logoutHandler } = useContext(AuthContext);
  console.log(currUser);

  return (
    <header>
      <nav className="navbar bg-base-100">
        <div className="flex-1">
          <a className="btn btn-ghost normal-case text-xl">Dev Profile</a>
        </div>
        <div className="flex-none">
          {currUser?._id ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src="https://placeimg.com/80/80/people" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <a className="justify-between">Profile</a>
                </li>

                <li>
                  <button onClick={logoutHandler}>Logout</button>
                </li>
              </ul>
            </div>
          ) : (
            <Link className="btn btn-primary" to="/">
              Register
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
