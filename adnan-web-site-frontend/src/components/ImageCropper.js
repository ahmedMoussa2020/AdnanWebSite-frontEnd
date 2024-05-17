import React, { useState, useRef } from "react";
import Modal from "react-modal";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

import { resizeImage } from "../util/Helper";
//  defines an ImageCropper that takes in several props, including modalIsOpen, closeModal, uploadImageData, and setImageSrc.
const ImageCropper = ({
  modalIsOpen,
  closeModal,
  uploadImageData,
  setImageSrc,
}) => {
  // customStyles constant that styles the modal.
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      border: "none",
      backgroundColor: "transparent",
    },
  };
  
  const cropperRef = useRef();
  const [image] = useState(uploadImageData);
  // the cropImage is function asyn that crop an image. It does this by using the cropperRef to access the Cropper component.
  const cropImage = async () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      const resizedImage = await resizeImage(canvas.toDataURL());
      setImageSrc(resizedImage);
      closeModal();
    }
  };

  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
      >
        <div className="bg-white shadow rounded-lg mb-6 p-5">
          <div className="text-gray-600 text-lg font-semibold mt-2 mb-7">
            Crop Photo
          </div>

          <Cropper
            ref={cropperRef}
            src={image}
            className={"cropper"}
            aspectRatio={1}
          />

          <footer className="flex justify-end mt-8 gap-2">
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-400 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
              onClick={closeModal}
            >
              Cancel
            </button>
            <button
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-purple-600 rounded-md hover:bg-purple-400 focus:outline-none focus:bg-purple-400 focus:ring focus:ring-purple-300 focus:ring-opacity-50"
              onClick={cropImage}
            >
              Crop
            </button>
          </footer>
        </div>
      </Modal>
    </>
  );
};

export default ImageCropper;
