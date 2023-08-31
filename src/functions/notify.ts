import { toast } from "react-toastify";

export const notify = ({ message, time }: { message: string; time: number }) =>
  toast.success(message, {
    position: "top-right",
    autoClose: time,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "light",
  });
