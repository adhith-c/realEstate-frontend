import { useSelector } from "react-redux";
import { selectCurrentUser, selectCurrentToken } from "./authSlice";
import { Link } from "react-router-dom";

const Welcome = () => {
  const user = useSelector(selectCurrentUser);
  const token = useSelector(selectCurrentToken);

  const Welcome = user ? `Welcome ${user}` : "Welcome";
  const tokenAbbr = `${token.slice(0, 9)}...`;

  //   const content = (
  //     <section>
  //       <h1>Welcome</h1>
  //       <p>{tokenAbbr}</p>
  //       <p>
  //         <Link to="/userslist">Go to Users List</Link>
  //       </p>
  //     </section>
  //   );

  return (
    <section>
      <h1>Welcome</h1>
      <p>{tokenAbbr}</p>
      <p>
        <Link to="/userslist">Go to Users List</Link>
      </p>
    </section>
  );
};

export default Welcome;
