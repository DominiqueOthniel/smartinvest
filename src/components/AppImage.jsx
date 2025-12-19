import React from 'react';

const ImageComponent = ({
  src,
  alt = "Image Name",
  className = "",
  ...props
}) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        e.target.src = "/assets/images/no_image.png"
      }}
      {...props}
    />
  );
};

const Image = ImageComponent;

export default Image;
