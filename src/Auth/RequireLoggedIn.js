import Login from "../Pages/Login";
import Submission from "../Pages/Submission";

function RequireAuth({ user }) {
  if (user !== undefined) {
    return <Submission id={user?.user.userId} />;
  } else {
    return <Login submit={true} />;
  }
}

export default RequireAuth;
