import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// Custom styling for error toasts
const successToastStyle = {
  backgroundColor: "#06bc0b", // Red background
  color: "white"
};

const successProgressStyle = {
  backgroundColor: "white"
};

// Custom styling for error toasts
const errorToastStyle = {
  backgroundColor: "#EF4444", // Red background
  color: "white"
};

const errorProgressStyle = {
  backgroundColor: "white"
};

export const successToast = ( message : string) =>
  toast.success(message, {
    progressStyle: successProgressStyle,
    style: successToastStyle,
    position: "top-right",
    autoClose: 3000
  });

export const errorToast = ( message :  string) => {
  toast.error(message, {
    progressStyle: errorProgressStyle,
    style: errorToastStyle,
    position: "top-right",
    autoClose: 3000
  });
};
