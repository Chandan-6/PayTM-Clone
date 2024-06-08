import AvatarInitial from "../avatar/AvatarInitial";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

export default function Intro() {
  const [ userData, setUserData ] = useState([]);


  useEffect(() => {
    const token = Cookies.get("pmtc_token");

    if(!token) {
      console.log("Token not found");
    }

    const decodedData = jwtDecode(token);

    setUserData(decodedData);
  }, []);


  return (
    <div className="w-full flex justify-between items-center border-b border-blue-gray-600 pb-2">
      <div className="antialiased font-medium">PayTM App</div>
      <div className="flex justify-center items-center space-x-3">
        <p>
          <span>Hello, </span>
          <span>{userData?.firstName}</span>
        </p>
        <AvatarInitial bgCustom={"bg-cyan-300"} initial={userData?.firstName?.[0] || "U"} />
      </div>
    </div>
  );
}
