import ChiefEditor from "../Pages/ChiefEditor";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

function RequireChiefEditor({ user }) {
  if (user !== undefined) {
    return user.user.userType === "chief" ? <ChiefEditor /> : <Home />;
  } else {
    return <Login />;
  }
}

export default RequireChiefEditor;
