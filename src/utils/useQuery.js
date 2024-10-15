// import { useLocation } from "react-router";

// export default () => {
//   return new URLSearchParams(useLocation().search);
// };

export const useHash = ()=>{
    return new URLSearchParams(window.location.hash);
}

export default ()=> {
    return new URLSearchParams(window.location.search);
}
