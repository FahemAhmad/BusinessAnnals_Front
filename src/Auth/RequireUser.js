import User from "../Pages/User";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

function RequireUser({ user }) {
  if (user !== undefined) {
    return user.user.userType === "user" ? <User /> : <Home />;
  } else {
    return <Login />;
  }
}

export default RequireUser;
