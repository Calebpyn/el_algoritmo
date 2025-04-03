import { useLocation, useNavigate } from "react-router-dom";
import { useAppContext } from "../../context/ScrollingContext";
import NewsButton from "./NewsButton";

type HeaderProps = {
  setSideBar: React.Dispatch<React.SetStateAction<boolean>>;
};

const Header: React.FC<HeaderProps> = ({ setSideBar }) => {
  const { page, setPage } = useAppContext();

  const location = useLocation();
  const naviagte = useNavigate();

  return (
    <div className="fixed top-0 w-full magilio-font h-auto justify-self-center items-center z-50">
      <div className="w-full flex h-full bg-[#f7f6f268] backdrop-blur-lg shadow-lg px-2 justify-between items-center pl-2">
        <span
          className="magilio-font md:text-8xl sm:text-6xl text-5xl flex items-center mt-3 select-none cursor-pointer md:flex-row flex-col"
          onClick={() => {
            if (location.pathname !== "/news") {
              setPage(0);
            } else {
              setPage(0);
              naviagte("/");
            }
          }}
        >
          <span>
            <span>el</span>
            <span>ALGORITMO.</span>
          </span>
          {location.pathname === "/news" ? (
            <span className="md:text-5xl text-xl self-start md:ml-4 md:mt-2 -mt-2">
              Las News
            </span>
          ) : null}
        </span>

        {location.pathname !== "/news" ? (
          <span
            className={`mr-4 tr lg:flex hidden ${
              page != 0 ? "" : "-translate-y-[200%] opacity-0"
            }`}
          >
            <NewsButton />
          </span>
        ) : null}

        {location.pathname !== "/news" ? (
          <span
            className="flex flex-col md:gap-3 gap-2 self-center mr-5 cursor-pointer md:hidden"
            onClick={() => setSideBar(true)}
          >
            <span className="md:w-[40px] w-[30px] h-[2px] bg-black"></span>
            <span className="md:w-[50px] w-[40px] h-[2px] bg-black"></span>
            <span className="md:w-[50px] w-[40px] h-[2px] bg-black"></span>
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default Header;
