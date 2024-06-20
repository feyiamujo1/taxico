import { Loader2 } from "lucide-react";

const LoadingBox = () => {
  return (
    <div className="w-full h-[400px] flex gap-2 items-center justify-center text-link-ash">
      <Loader2 className="mr-2 h-6 w-6 animate-spin" />
      <p>Loading, please wait...</p>
    </div>
  );
};

export default LoadingBox;
