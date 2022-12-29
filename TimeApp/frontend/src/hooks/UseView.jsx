import { useContext } from "react";
import View from "../context/ViewProvider";


const useView = () => {
    return useContext(View);
}

export default useView;