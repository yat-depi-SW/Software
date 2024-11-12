import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";

function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export default function StatsCard({ cardProps }) {
  const { title, data, buttonText, onclick } = cardProps;

  return (
    <Card className="w-full max-w-[20rem] p-8 bg-gray-100 dark:bg-[#333333] text-gray-900 dark:text-gray-100">
      <CardHeader
        floated={false}
        shadow={false}
        color="transparent"
        className="m-0 mb-8 rounded-none border-b border-gray-300 dark:border-gray-600 pb-8 text-center"
      >
        <Typography
          variant="small"
          className="font-normal uppercase text-gray-700 dark:text-gray-300"
        >
          {title}
        </Typography>
      </CardHeader>

      <CardBody className="p-0">
        <ul className="flex flex-col gap-4">
          {data.map(({ key, value }) => (
            <li key={key} className="flex items-center  gap-1">
              <Typography className="font-normal text-gray-800 dark:text-gray-200 w-fit text-nowrap">
                {key}:
              </Typography>
              <Typography
                className="font-normal text-gray-800 dark:text-gray-200  text-ellipsis overflow-hidden whitespace-nowrap"
                title={value}
              >
                {value}
              </Typography>
            </li>
          ))}
        </ul>
      </CardBody>

      <CardFooter className="mt-12 p-0">
        <Button
          onClick={onclick}
          size="lg"
          className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100 dark:bg-blue-gray-700 dark:text-gray-200 dark:hover:bg-blue-gray-600"
          ripple={false}
          fullWidth={true}
        >
          {buttonText}
        </Button>
      </CardFooter>
    </Card>
  );
}
