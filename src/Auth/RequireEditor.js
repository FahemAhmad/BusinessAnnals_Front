import Home from "../Pages/Home";
import Login from "../Pages/Login";
import ReviewEditor from "../Pages/ReviewEditor";

function RequireEditor({ user }) {
  if (user !== undefined) {
    return user.user.userType === "editor" ? <ReviewEditor /> : <Home />;
  } else {
    return <Login />;
  }
}

export default RequireEditor;
