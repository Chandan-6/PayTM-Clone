import { Button, Typography } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export default function FormSubmitButton(props) {
  const navigate = useNavigate();

  return (
    <>
      <Button onClick={(e) => props.fun(e)} className="mt-6" fullWidth>
        {props.btnTxt}
      </Button>
      <Typography color="gray" className="mt-4 text-center font-normal">
        {props.warning}{" "}
        <a onClick={() => navigate(`${props.to}`)} href="#" className="font-medium text-gray-900">
          {props.toTxt}
        </a>
      </Typography>
    </>
  );
}
