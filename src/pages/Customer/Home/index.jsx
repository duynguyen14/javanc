import React from "react";
import ImageSlider from "../../../Components/Banner";
import Sale from "../../../Components/Sale";
import VerticalNav from "../../../Components/Navbar";
import HomeProduct from "../../../Components/HomeProduct";

const Home = () => {
  return (
    <div className="bg-test my-[-10px]">
    <div className="test ">
      <div className="flex py-[10px]">
        <div className="basis-[25%] mr-[-25px]">
          <VerticalNav/>
        </div>
        <div className="basis-[75%]">
          <div>
            <ImageSlider/>
          </div>
          <div>
            <Sale/>
          </div>
        </div>
      </div>
      <div>
        <HomeProduct/>
      </div>
      <div>

      </div>
      </div>

    </div>
  );
};

export default Home;
