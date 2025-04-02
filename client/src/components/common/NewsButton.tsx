import { useNavigate } from "react-router-dom";
import arrow from "../../assets/arrow.svg";

function NewsButton() {
  const navigate = useNavigate();

  return (
    <div
      className="flex justify-between items-center bg-[#D9D9D9] md:pl-12 px-5 hover:bg-[#bcbcbc] pr-8 md:gap-24 gap-5 h-[50px] hover:scale-105 cursor-pointer hover:gap-32 tr"
      onClick={() => navigate("/news")}
    >
      <span className="thunder-m-lc-font select-none font-bold md:text-5xl text-2xl md:-mb-7 text-nowrap">
        Last news
      </span>

      <span className="">
        <img src={arrow} alt="arrow" />
      </span>
    </div>
  );
}

export default NewsButton;
