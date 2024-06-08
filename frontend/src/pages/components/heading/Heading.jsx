import { Typography } from "@material-tailwind/react";

export default function Heading(props) {
  return (
    <Typography variant="h4" color="blue-gray">
      {props.lable}
    </Typography>
  );
}
