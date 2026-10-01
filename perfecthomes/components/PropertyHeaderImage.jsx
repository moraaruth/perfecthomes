import Image from "next/image";
import { useState } from "react";

const PropertyHeaderImage = ({ image }) => {
  const [imageError, setImageError] = useState(false);
  
  const displayImage = imageError || !image ? '/placeholder.jpg' : image;

  return (
    <section>
      <div className="container-xl m-auto">
        <div className="grid grid-cols-1">
          <Image
            src={displayImage}
            alt="Property header image"
            className="object-cover h-[400px] w-full"
            width={800}
            height={400}
            sizes="100vw"
            priority={true}
            onError={() => setImageError(true)}
            unoptimized={image?.includes('res.cloudinary.com')}
          />
        </div>
      </div>
    </section>
  );
};

export default PropertyHeaderImage;
