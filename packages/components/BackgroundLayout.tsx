import { RootState } from "@youmeet/global-config/store";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  GlobalState,
  setBackground,
} from "@youmeet/global-config/features/global";

const images = [
  "https://res.cloudinary.com/de822mdsy/image/upload/v1691349767/youmeet-official/webp/sunset2_ifyify.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1691349759/youmeet-official/webp/sunset_ctov4g.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1691349772/youmeet-official/webp/tree_haipnp.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1691349746/youmeet-official/webp/magnolia-trees_q0uqao.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1683739112/youmeet-official/misc/mountains_ccu6f1.webp",
  "https://res.cloudinary.com/de822mdsy/image/upload/v1691349752/youmeet-official/webp/nature_hqk4vq.webp",
];

const productImg =
  "https://res.cloudinary.com/de822mdsy/image/upload/v1691349994/youmeet-official/webp/sunset2-modified_weymh7.webp";

const BackgroundLayout: FC<{
  children: React.ReactElement;
  newClasses?: string;
  newStyles?: { [key: string]: number | string };
  product?: boolean;
  error?: boolean;
}> = ({ children, product, newStyles, error }) => {
  const { background, lastModification } = useSelector(
    (state: RootState) => state.global as GlobalState
  );
  const dispatch = useDispatch();

  function randomIntFromInterval(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  const changeBackground = () => {
    const diffMs = new Date().getTime() - new Date(lastModification).getTime();
    const diffMin = Number(Math.round(diffMs / 1000 / 60).toFixed(0));

    if (diffMin > 30) {
      let newBackground = background;
      while (newBackground === background) {
        const random = randomIntFromInterval(0, 5);
        newBackground = random;
      }
      dispatch(
        setBackground({
          background: newBackground,
          lastModification: new Date().getTime(),
        })
      );
    }
  };

  useEffect(() => {
    changeBackground();
  }, []);

  return (
    <div className="flex-1 flex flex-col w-full" style={{ ...newStyles }}>
      <div
        className="w-full h-full flex-1 flex-center relative linear-gradient bg-blend-luminosity"
        style={
          // !error
          //   ? {
          //       background: `linear-gradient(90deg, white, rgba(167, 202, 212, 0.29), ${blueGrey[50]}, rgba(167, 202, 212, 0.29), white)`,
          //       ...newStyles,
          //     }
          //   :
          {
            backgroundImage: product
              ? `linear-gradient(130deg, rgba(69, 90, 100, 0.79), rgba(144, 164, 174, 0.49), rgba(144, 164, 174, 0.49)), url(${productImg})`
              : `linear-gradient(rgba(236,239,241,0.79), rgba(255,255,255,0.79)), url(${images[background]})`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            ...newStyles,
          }
        }
      >
        {children}
      </div>
    </div>
  );
};

export default BackgroundLayout;
