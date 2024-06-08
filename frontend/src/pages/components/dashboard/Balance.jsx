import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function Balance(){
    const [ userBalance, setUserBalance ] = useState(0);

    useEffect(() => {

        const fetchBalance = async () => {
            try {
                const token = Cookies.get("pmtc_token");
             
                const response = await axios.get(`${baseURL}/api/v1/account/balance`,{
                    headers : {
                        'content-type' : 'application/json',
                        Authorization : `Bearer ${token}`
                    }
                });

                if(response.data.success){
                    setUserBalance(response.data.balance);
                }
                else{
                    console.log("Falied to fetch Balance!!");
                }
                
             } catch (error) {
                 console.log(error);
             }   
        };

        fetchBalance();
        
    }, []);
    return (
        <p className="flex justify-center items-center space-x-2"><span className="font-semibold tracking-wide">Your Balance</span><span>{userBalance}/-</span></p>
    )
}