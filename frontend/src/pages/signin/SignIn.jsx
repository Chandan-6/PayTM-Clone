import {
  Card,
  Input,
  Checkbox,
  Button,
  Typography,
} from "@material-tailwind/react";
import Heading from "../components/heading/Heading";
import SubHeading from "../components/subHeading/SubHeading";
import FormSubmitButton from "../components/formSubmitButton/FormSubmitButton";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function SignIn() {
  const navigate = useNavigate();
  const [ formData, setFromData ] = useState({
    userName : '',
    password : '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFromData({...formData, [name] : value});
  };


  const singin = async (e) => {
    e.preventDefault();

    try {
      if (
        formData.userName == "" ||
        formData.password == ""
      ) {
        toast("All fields to mandatory.");
        return;
      }

      const response = await axios.post(
        `${baseURL}/api/v1/user/signin`,
        formData
      );
      if (response.data.success) {

        Cookies.set("pmtc_token", response.data.token);
        toast.success("Sign in Successfull.");

        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
      } else {
        toast.error("Something went wrong please try again!");
      }
    } catch (error) {
      toast.error("Something went wrong please try again!");
    }
  };
  return (
    <div className="mx-auto h-screen flex justify-center items-center">   
      <Card color="transparent" shadow={false}>
        <Heading lable={"Sign In"}/>
        <SubHeading text={"Welcome back! Enter your details to login."}/>
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              User Name
            </Typography>
            <Input
              name="userName"
              size="lg"
              placeholder="UserName"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => handleChange(e)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              onChange={(e) => handleChange(e)}
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
          </div>
          <Checkbox
            label={
              <Typography
                variant="small"
                color="gray"
                className="flex items-center font-normal"
              >
                I agree the
                <a
                  href="#"
                  className="font-medium transition-colors hover:text-gray-900"
                >
                  &nbsp;Terms and Conditions
                </a>
              </Typography>
            }
            containerProps={{ className: "-ml-2.5" }}
          />
          <FormSubmitButton fun={singin} btnTxt={"sign in"} warning={"Not a user create an account?"} toTxt={"Sign Up"} to={"/signup"} />
        </form>
      </Card>
      <Toaster />
    </div>
  );
}
