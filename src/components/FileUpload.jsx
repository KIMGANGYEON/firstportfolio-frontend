import React, { useEffect, useRef } from "react";
import Dropzone from "react-dropzone";
import axiosInstance from "../utils/axios";

const FileUpload = ({ images, onImageChange }) => {
  const handleDrop = async (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    try {
      const response = await axiosInstance.post(
        "/products/image",
        formData,
        config
      );
      onImageChange([...images, response.data.fileName]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (scrollRef.current) {
        const scrollAmount = event.deltaY;
        scrollRef.current.scrollLeft += scrollAmount;
      }
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false });

      return () => {
        container.removeEventListener("wheel", handleWheel);
      };
    }
  }, []);
  const scrollRef = useRef(null);
  const baseUrl = "http://localhost:4000/";

  const handleDelete = (image) => {
    const currendIndex = images.indexOf(image);
    let newImages = [...images];
    newImages.splice(currendIndex, 1);
    onImageChange(newImages);
  };
  return (
    <div>
      <div className="img-box2" ref={scrollRef}>
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img src={`${baseUrl}/${image}`} alt="" />
          </div>
        ))}
      </div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section>
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <button
                className="image-btn"
                onClick={(event) => {
                  event.preventDefault();
                }}
              >
                이미지 업로드
              </button>
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

export default FileUpload;
