import {
  Card,
  Input,
  Checkbox,
  Typography,
} from "@material-tailwind/react";
import Heading from "../components/heading/Heading";
import SubHeading from "../components/subHeading/SubHeading";
import FormSubmitButton from "../components/formSubmitButton/FormSubmitButton";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const baseURL = import.meta.env.VITE_BACKEND_URL;

export default function SignUp() {
  const navigate = useNavigate();
  const [formData, setFromData] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFromData({ ...formData, [name]: value });
  };

  const singup = async (e) => {
    e.preventDefault();
    try {
      if (
        formData.firstName == "" ||
        formData.lastName == "" ||
        formData.userName == "" ||
        formData.password == ""
      ) {
        toast("All fields to mandatory.");
        return;
      }

      const response = await axios.post(
        `${baseURL}/api/v1/user/signup`,
        formData
      );
      if (response.data.success) {
        toast.success("Signed up Successfull.");
        setTimeout(() => {
          navigate("/signin");
        }, 2000);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Something went wrong please try again!");
    }
  };

  return (
    <div className="mx-auto h-screen flex justify-center items-center">
      <Card color="transparent" shadow={false}>
        <Heading lable={"Sign Up"} />
        <SubHeading
          text={"Nice to meet you! Enter your details to register."}
        />
        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              First Name
            </Typography>
            <Input
              onChange={(e) => handleChange(e)}
              name="firstName"
              size="lg"
              placeholder="Jhon"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Last Name
            </Typography>
            <Input
              onChange={(e) => handleChange(e)}
              name="lastName"
              size="lg"
              placeholder="Wick"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              User Name
            </Typography>
            <Input
              onChange={(e) => handleChange(e)}
              name="userName"
              size="lg"
              placeholder="jw!wick007"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
            />
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              onChange={(e) => handleChange(e)}
              name="password"
              type="password"
              size="lg"
              placeholder="********"
              className=" !border-t-blue-gray-200 focus:!border-t-gray-900"
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
          <FormSubmitButton
            fun={singup}
            btnTxt={"sign up"}
            warning={"Already have an account?"}
            toTxt={"Sign In"}
            to={"/signin"}
          />
        </form>
      </Card>
      <Toaster />
    </div>
  );
}
