import Login from "../Pages/Login";
import Submission from "../Pages/Submission";

function RequireAuth({ user }) {
  if (user !== undefined) {
    return <Submission />;
  } else {
    return <Login submit={true} />;
  }
}

export default RequireAuth;
