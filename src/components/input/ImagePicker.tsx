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
      {images.length > 0 && (
        <div className="image-picker-display">
          {images.map((image) => (
            <img
              key={image.name}
              src={URL.createObjectURL(image)}
              className="image-picker-image"
              alt=""
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ImagePicker;
