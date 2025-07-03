import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slice";

const LogoutComp = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  localStorage.clear();
  //   console.log("dispatch");

  dispatch(logout());
  navigate("/");
};

export default LogoutComp;
