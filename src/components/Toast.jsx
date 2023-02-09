import React from "react";
import { useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function Toast({ type }) {
  useEffect(() => {
    // console.log("ReactToast");
    notify(type);
  }, []);

  const notify = (type) => {
    if (type == "success") {
      toast.success("Property added Successfully");
    } else {
      toast.error("Failed to add Property");
    }
  };

  return (
    <div>
      {/* <button onClick={notify}>Notify!</button> */}
      <ToastContainer
        position="bottom-right"
        type="success"
      />
    </div>
  );
}

export default Toast;
