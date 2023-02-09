import React from "react";
import Modal from "react-modal";
import { MdOutlineClose } from "react-icons/md";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    width: "500px",
    transform: "translate(-50%, -50%)",
  },
};

function AboutModal({ modalState, close }) {
  if (!modalState) return null;
  return (
    <div className="w-[50rem]">
      <Modal
        isOpen={modalState}
        onRequestClose={close}
        style={customStyles}
        contentLabel="Example Modal">
        <div className="w-full h-[25rem] overflow-scroll scrollbar-hide">
          <div className=" w-full flex  justify-end ">
            <div className="cursor-pointer">
              <MdOutlineClose
                size={20}
                onClick={close}
              />
            </div>
          </div>
          <div className="w-full flex">
            <div className="flex justify-center items-center font-Jost font-bold text-3xl border-b-2 w-full">
              EDIT ABOUT ME
            </div>
          </div>
          <div className="w-full font-Jost font-black">
            <form>
              <div class="w-full mb-2 mt-2  text-black ">
                <div className="w-full mt-2">
                  <textarea
                    id="message"
                    className="block w-[90%] mx-auto p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    rows={12}
                    placeholder="I am a [city/region] real estate agent who works with home [buyers/sellers]. After graduating from [your college], I had [X experience] and took [X courses] that inspired my passion for real estate. My enthusiasm for helping others and [your skills/characteristics] help me connect with clients and provide them with the best service possible.
When I'm not assisting my real estate clients, I enjoy [spending time with family, volunteering, participating in X hobby, etc.]."></textarea>
                </div>
              </div>
              <div class="mb-4 flex items-center justify-center">
                <button
                  type="submit"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default AboutModal;
