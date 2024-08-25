import React, { useState } from "react";
import { useRouter } from "next/navigation";

const UserSignIn = () => {
  const router = useRouter();
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  if (userLoggedIn) {
    return router.push("/Home");
  }
  const handleUserLoggedIn = () => {
    setUserLoggedIn(true);
  };

  return (
    <div>
      <button onClick={handleUserLoggedIn}>Sign In Page</button>
    </div>
  );
};

export default UserSignIn;
