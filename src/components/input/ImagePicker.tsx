import React from "react";

type Props = {
  images: File[];
  setImages(files: File[]): void;
};

const ImagePicker: React.FC<Props> = ({ setImages, images }) => {
  const imageSelectHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    let f = Array.from(e.target.files ?? []);
    setImages(f);
  };

  return (
    <div>
      <label htmlFor="image-picker" className="image-picker-label">
        Select
      </label>
      <input
        type="file"
        accept="image/jpg image/jpeg image/png image/gif image/svg"
        multiple
        onChange={imageSelectHandler}
        id="image-picker"
        className="image-picker"
      />
      <div className="image-picker-display">
        {images.map((image) => (
          <img
            src={URL.createObjectURL(image)}
            className="image-picker-image"
          />
        ))}
      </div>
    </div>
  );
};

export default ImagePicker;
