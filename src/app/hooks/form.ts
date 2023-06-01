import { useState } from "react";

type FormState = {
  loading: boolean;
  errorMsg: string;
};
const initState = {
  loading: false,
  errorMsg: "",
};
export function useFormState(initalState: FormState = initState) {
  const [state, setState] = useState(initalState);

  function setLoading(state: boolean) {
    setState((p) => ({
      ...p,
      loading: state,
    }));
  }
  function setErrorMsg(msg: string) {
    setState((p) => ({
      ...p,
      errorMsg: msg,
    }));
  }

  return { setLoading, setErrorMsg, ...state };
}
