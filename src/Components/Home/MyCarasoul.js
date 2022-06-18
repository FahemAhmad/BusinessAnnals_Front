import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import React from "react";
import CarasoulImage from "../../Assets/carasoul.jpg";
import "../../Pages/Home.css";

function MyCarasoul() {
  return (
    <Carousel
      showThumbs={false}
      showArrows={true}
      showIndicators={true}
      showStatus={false}
    >
      <div>
        <img
          src={CarasoulImage}
          alt="CarasoulCover"
          height={300}
          style={{
            objectFit: "cover",
            filter: "blur(2px)",
            WebkitFilter: "blur(2px)",
          }}
        />
        <p className="caraText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
      </div>
      <div>
        <img
          src={CarasoulImage}
          alt="CarasoulCover"
          height={300}
          style={{
            objectFit: "cover",
            filter: "blur(2px)",
            WebkitFilter: "blur(2px)",
          }}
        />
        <p className="caraText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
      </div>
      <div>
        <img
          src={CarasoulImage}
          alt="CarasoulCover"
          height={300}
          style={{
            objectFit: "cover",
            filter: "blur(2px)",
            WebkitFilter: "blur(2px)",
          }}
        />
        <p className="caraText">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
          varius enim in eros elementum tristique. Duis cursus, mi quis viverra
          ornare, eros dolor interdum nulla, ut commodo diam libero vitae erat.
        </p>
      </div>
    </Carousel>
  );
}

export default MyCarasoul;
