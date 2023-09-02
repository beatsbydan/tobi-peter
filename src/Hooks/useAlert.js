import { useContext } from "react";
import AlertContext from "../Components/UI/AlertContext/AlertContext";

const useAlert = () => useContext(AlertContext);

export default useAlert