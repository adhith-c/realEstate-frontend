import { useGetUsersQuery } from "./usersApiSLice";
import { Link } from "react-router-dom";
const usersList = () => {
  const {
    data: users,
    isLoading,
    isSuccess,
    isError,
    error,
  } = useGetUsersQuery();
  let content;
  if (isLoading) {
    // content = <p>Loading...</p>;
    return <p>Loading...</p>;
  } else if (isSuccess) {
    // content = (
    //   <div>
    //     <h1>usersList</h1>
    //     <ul>
    //       {users.map((user, i) => {
    //         return <li key={i}>{user.username}</li>;
    //       })}
    //     </ul>
    //     <Link to="/login">go to login</Link>
    //   </div>
    // );
    return (
      <div>
        <h1>usersList</h1>
        <ul>
          {users.map((user, i) => {
            return <li key={i}>{user.username}</li>;
          })}
        </ul>
        <Link to="/login">go to login</Link>
      </div>
    );
  }

  //   return content;
};

export default usersList;
