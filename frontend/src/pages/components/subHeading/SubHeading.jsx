import { Typography } from "@material-tailwind/react";

export default function SubHeading(props) {
  return (
    <Typography color="gray" className="mt-1 font-normal">
      {props.text}
    </Typography>
  );
}
