import { useTypedSelector } from "../redux/store";

export const useAuth = () => {
  const {email, token, id} = useTypedSelector(state => state.user);

  return {
    isAuth: Boolean(email),
    email,
    token,
    id
  }
}