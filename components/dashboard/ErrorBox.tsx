import { BiError } from "react-icons/bi";

const ErrorBox = () => {
  return (
    <div className="w-full h-[400px] flex flex-col gap-2 items-center justify-center text-link-ash">
      <BiError className="text-4xl" />
      <p className="text-center">Error, something went wrong. Please reload</p>
    </div>
  );
};

export default ErrorBox;
