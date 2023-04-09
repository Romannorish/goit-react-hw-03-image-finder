import { ThreeCircles } from "react-loader-spinner";
import { ThreeCirclesWrapper } from "./Loader.styled";

export const Loader = () => {
  return (
    <ThreeCirclesWrapper>
      <ThreeCircles
        height="100"
        width="100"
        color="#4fa94d"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel="three-circles-rotating"
        outerCircleColor=""
        innerCircleColor=""
        middleCircleColor=""
      />
    </ThreeCirclesWrapper>
  );
};

export default Loader;