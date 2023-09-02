import { useContext } from "react";
import Context from "../Components/User/Context/Context"; 

const useUserContext = () => useContext(Context)

export default useUserContext;