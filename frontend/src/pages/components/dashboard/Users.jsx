import { Input, Button } from "@material-tailwind/react";
import AvatarInitial from "../avatar/AvatarInitial";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function Users() {
  const navigate = useNavigate();
  const [ allUsers, setAllUsers ] = useState([]);
  const [ Filter, setFilter ] = useState("");

  useEffect(() => {

    const fetchAllUsers = async () => {
        try {
            const token = Cookies.get("pmtc_token");
         
            const response = await axios.get(`${baseURL}/api/v1/user/allUsers?Filter=` + Filter,{
                headers : {
                    'content-type' : 'application/json',
                    Authorization : `Bearer ${token}`
                }
            });

            if(response.data.success){
                setAllUsers(response.data.allUsers);
            }
            else{
                console.log("Falied to fetch users!!");
            }
            
         } catch (error) {
             console.log(error);
         }   
    };

    fetchAllUsers();
    
}, [Filter]);

  return (
    <div className="w-full flex flex-col justify-center items-start space-y-2">
      <p className="font-semibold">Users</p>
      <div className="w-full">
        <div className="mb-4 mt-2">
          <Input name="searchUsers" onChange={(e) => setFilter(e.target.value)} label="Search Users..." />
        </div>

        <div className="space-y-3">
            {
              allUsers.map((user, index) => (
              <div key={index} className="flex justify-between items-center">
                <div className="flex justify-center items-center space-x-3">
                  <AvatarInitial bgCustom={'bg-cyan-200'} initial={user?.firstName?.[0] || "U"} />
                  <p>{user.firstName}{' '}{user.lastName}</p>
                </div>
                <div>
                  <Button onClick={() => navigate("/sendMoney", { state : {toID : user._id, firstName : user.firstName, lastName : user.lastName}})} size="sm">Send Money</Button>
                </div>
              </div>

              ))
            }
        </div>
      </div>
    </div>
  );
}
