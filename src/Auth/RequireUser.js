import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Publisher from "../Pages/Publisher/Publisher";

function RequireUser({ user }) {
  if (user !== undefined) {
    return user.user.userType === "user" ? <Publisher /> : <Home />;
  } else {
    return <Login />;
  }
}

export default RequireUser;
