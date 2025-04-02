import { useLocation, useNavigate } from "react-router-dom";

function NavigateButton() {
  const navigate = useNavigate();
  const location = useLocation();

  return location.pathname !== "/news" ? (
    <div
      className="gap-5 flex cursor-pointer bg-[#D9D9D9] hover:bg-[#949494] p-2 font-bold hover:scale-105 tr pointer-events-auto"
      onClick={() => navigate("/news")}
    >
      <span>Last News</span>
      <span>📰</span>
    </div>
  ) : (
    <></>
  );
}

export default NavigateButton;
