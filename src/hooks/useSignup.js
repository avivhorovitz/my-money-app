import { projectAuth } from "../firebase/config";
import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      //signup user
      const response = await projectAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      if (!response) {
        throw new Error("Could not complete sign up");
      }
      //add display name to user
      await response.user.updateProfile({ displayName });

      //dispatch login action
      console.log(dispatch);
      dispatch({ type: "LOGIN", payload: response.user });
      //udpate state
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
