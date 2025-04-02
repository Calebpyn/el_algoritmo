import { useLocation } from "react-router-dom";
import { useAppContext } from "../../context/ScrollingContext";

function Footer() {
  const { page, setPage } = useAppContext();

  const location = useLocation();

  return location.pathname !== "/news" ? (
    <div className="w-full h-screen pt-[130px] fixed bottom-0 md:flex hidden justify-between px-10 font-bold text-lg pointer-events-none tr-slow">
      <span
        className={`tr-slow select-none cursor-pointer pointer-events-none   ${
          page == 0 ? "translate-y-full mb-14" : ""
        }`}
      >
        <span
          className={`tr select-none cursor-pointer pointer-events-auto font-bold p-2 hover:bg-[#D9D9D9] ${
            page == 1 ? "underline" : ""
          }`}
          onClick={() => setPage(1)}
        >
          Nuestro Manifiesto 📜
        </span>
      </span>
      <span
        className={`tr-slow select-none cursor-pointer pointer-events-none   ${
          page == 0 ? "translate-y-full mb-14" : ""
        }`}
      >
        <span
          className={`tr select-none cursor-pointer pointer-events-auto font-bold p-2 hover:bg-[#D9D9D9] ${
            page == 2 ? "underline" : ""
          }`}
          onClick={() => setPage(2)}
        >
          Cómo Funciona 🔍
        </span>
      </span>
      <span
        className={`tr-slow select-none cursor-pointer pointer-events-none   ${
          page == 0 ? "translate-y-full mb-14" : ""
        }`}
      >
        <span
          className={`tr select-none cursor-pointer pointer-events-auto font-bold p-2 hover:bg-[#D9D9D9] ${
            page == 3 ? "underline" : ""
          }`}
          onClick={() => setPage(3)}
        >
          Las Notésis 📌
        </span>
      </span>
      <span
        className={`tr-slow select-none cursor-pointer pointer-events-none   ${
          page == 0 ? "translate-y-full mb-14" : ""
        }`}
      >
        <span
          className={`tr select-none cursor-pointer pointer-events-auto font-bold p-2 hover:bg-[#D9D9D9] ${
            page == 4 ? "underline" : ""
          }`}
          onClick={() => setPage(4)}
        >
          Sobre Nosotros 🎭
        </span>
      </span>
    </div>
  ) : (
    <></>
  );
}

export default Footer;
