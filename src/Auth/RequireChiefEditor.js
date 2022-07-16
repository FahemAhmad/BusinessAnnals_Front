import Chief_Editor from "../Pages/Chief Editor/Chief_Editor";
import ChiefEditor from "../Pages/ChiefEditor";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import AdminPanel from "../Pages/Shared/AdminPanel";

function RequireChiefEditor({ user }) {
  if (user !== undefined) {
    return user.user.userType === "chief" ? <Chief_Editor /> : <Home />;
  } else {
    return <Login />;
  }
}

export default RequireChiefEditor;
