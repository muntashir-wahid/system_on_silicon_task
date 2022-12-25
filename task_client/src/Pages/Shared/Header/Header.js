import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../store/AuthProvider";

const Header = () => {
  const { currUser, logoutHandler } = useContext(AuthContext);

  return (
    <header>
      <nav className="navbar bg-base-200">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost normal-case text-xl">
            Dev Profile
          </Link>
        </div>
        <div className="flex-none">
          {currUser?._id ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full">
                  <img src={currUser?.imageUrl} alt="User" />
                </div>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li>
                  <Link
                    to={`/profile/${currUser?._id}`}
                    className="justify-between"
                  >
                    Profile
                  </Link>
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
