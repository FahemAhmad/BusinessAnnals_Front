import Editor from "../Pages/Editor/Editor";
import Home from "../Pages/Home";
import Login from "../Pages/Login";

function RequireEditor({ user }) {
  if (user !== undefined) {
    return user.user.userType === "editor" ? <Editor /> : <Home />;
  } else {
    return <Login />;
  }
}

export default RequireEditor;
