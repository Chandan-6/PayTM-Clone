import Heading from "../components/heading/Heading";
import { Input, Button } from "@material-tailwind/react";
import AvatarInitial from "../components/avatar/AvatarInitial";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useLocation } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function Send() {
  const location = useLocation();
  const [transferDetails, setTransferDetails] = useState({
    toID: "",
    amount: 0,
    firstName : '',
    lastName : ''
  });

  useEffect(() => {
    if (location.state) {
      if (location.state.toID) {
        setTransferDetails({ ...transferDetails, toID: location.state.toID, firstName : location.state.firstName, lastName: location.state.lastName });
      }
    }
  }, [location.state]);

  const onTransfer = async (e) => {
    e.preventDefault();

    try {
      const token = Cookies.get("pmtc_token");

      const response = await axios.post(
        `${baseURL}/api/v1/account/transfer`,
        {
          toID : transferDetails.toID,
          amount : transferDetails.amount,
        },
        {
          headers: {
            "content-type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if(response.data.success){
        toast.success("Transaction Successfull.");
      }
      else{
        toast.error(response.data.message);
      }

    } catch (error) {
      toast.error("Server issue | Please try again");
    }
  };

  return (
    <div className="h-screen mx-auto flex justify-center items-center bg-gray-50">
      <div className="w-[350px] h-[250px] shadow-xl rounded-lg border border-gray-200 px-5 py-6 flex flex-col justify-between items-center ">
        <Heading lable={"Send Money"} />

        <div className="flex flex-col items-center justify-center w-full space-y-4">
          <div className="w-full flex justify-start items-center space-x-4">
            <AvatarInitial bgCustom={"bg-green-600"} initial={transferDetails?.firstName?.[0] || 'U'} />
            <p className="font-semibold tracking-wide">{transferDetails.firstName}{' '}{transferDetails.lastName}</p>
          </div>

          <div className="w-full space-y-2">
            <Input name="amount" onChange={(e) => setTransferDetails({...transferDetails, amount : e.target.value})} label="Enter amount in (₹)" type="number" />
            <Button onClick={(e) => onTransfer(e)} className="w-full bg-green-600">Transfer</Button>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
