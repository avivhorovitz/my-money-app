import { projectAuth } from "../firebase/config";

import { useState, useEffect } from "react";
import { useAuthContext } from "./useAuthContext";

export const useLogin = () => {
  const [isCancelled, setIsCancelled] = useState(false);

  const [isPending, setIsPending] = useState(null);
  const [error, setError] = useState(null);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    //sign the user out
    try {
      const response = await projectAuth.signInWithEmailAndPassword(
        email,
        password
      );

      //dispatch logout action
      dispatch({ type: "LOGIN", payload: response.user });

      //update state
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
  return { login, error, isPending };
};
