import { useEffect, useRef, useCallback, useState } from "react";
import Footer from "./components/common/Footer";
import Header from "./components/common/Header";
import MainPage from "./components/home/MainPage";
import Manifiesto from "./components/pages/Manifiesto";
import Funcion from "./components/pages/Funcion";
import Notesis from "./components/pages/Notesis";
import Nosotros from "./components/pages/Nosotros";
import { useAppContext } from "./context/ScrollingContext";
import { HashRouter, Route, Routes } from "react-router-dom";
import MainNewsPage from "./components/news/MainNewsPage";
import { FaArrowRightLong } from "react-icons/fa6";
import NavigateButton from "./components/common/NavigateButton";

function App() {
  const { page, setPage } = useAppContext();

  const containerRef = useRef<HTMLDivElement>(null);
  const targetDivRef = useRef<HTMLDivElement>(null);
  const manifiestoDivRef = useRef<HTMLDivElement>(null);
  const funcionDivRef = useRef<HTMLDivElement>(null);
  const notesisDivRef = useRef<HTMLDivElement>(null);
  const nosotrosDivRef = useRef<HTMLDivElement>(null);

  // Función para hacer scroll al hacer clic en un apartado
  const scrollToTarget = useCallback(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    let target;

    switch (page) {
      case 1:
        target = manifiestoDivRef.current;
        break;
      case 2:
        target = funcionDivRef.current;
        break;
      case 3:
        target = notesisDivRef.current;
        break;
      case 4:
        target = nosotrosDivRef.current;
        break;
      default:
        target = targetDivRef.current;
    }

    if (target) {
      container.scrollTo({
        top: target.offsetTop - container.offsetTop,
        behavior: "smooth",
      });
    }
  }, [page]);

  useEffect(() => {
    scrollToTarget();
  }, [page, scrollToTarget]);

  const [sideBar, setSideBar] = useState(false);

  return (
    <HashRouter>
      <div className="w-full h-screen bg-[#F7F6F2] flex justify-center items-center select-none relative overflow-x-hidden">
        <Header setSideBar={setSideBar} />

        <Routes>
          <Route
            path="/"
            element={
              <div
                className="h-screen flex  w-full max-w-[1920px] md:overflow-hidden overflow-y-auto flex-col"
                ref={containerRef}
              >
                <div
                  className="w-full min-h-screen flex justify-center items-center"
                  ref={targetDivRef}
                >
                  <div className="h-[80px] md:h-0"></div>
                  <MainPage />
                </div>
                <div
                  className="w-full min-h-screen flex justify-center items-center"
                  ref={manifiestoDivRef}
                >
                  <div className="h-[80px] md:h-0"></div>
                  <Manifiesto />
                </div>
                <div
                  className="w-full min-h-screen flex justify-center items-center"
                  ref={funcionDivRef}
                >
                  <div className="h-[80px] md:h-0"></div>
                  <Funcion />
                </div>
                <div
                  className="w-full min-h-screen flex justify-center items-center"
                  ref={notesisDivRef}
                >
                  <div className="h-[80px] md:h-0"></div>
                  <Notesis />
                </div>
                <div
                  className="w-full min-h-screen flex justify-center items-center"
                  ref={nosotrosDivRef}
                >
                  <div className="h-[80px] md:h-0"></div>
                  <Nosotros />
                </div>
              </div>
            }
          />
          <Route path="/news" element={<MainNewsPage />} />
        </Routes>
        <Footer />

        {/* Fondo oscuro para cerrar el sidebar al hacer click afuera */}
        {sideBar && (
          <div
            className="fixed inset-0 bg-opacity-50 z-[99]"
            onClick={() => setSideBar(false)}
          />
        )}

        <div
          className={`absolute w-[60%] h-full right-0 tr top-0 z-[100] bg-[#4747471c] backdrop-blur-lg md:hidden flex flex-col gap-10 p-5 ${
            sideBar ? "" : "translate-x-full"
          }`}
        >
          <span className="w-full flex justify-start items-start mb-10 text-2xl">
            <FaArrowRightLong
              className="hover:scale-105 tr cursor-pointer"
              onClick={() => setSideBar(false)}
            />
          </span>
          <span className="tr select-none cursor-pointer">
            <span
              className={`tr select-none cursor-pointer font-bold p-2 hover:bg-[#D9D9D9] ${
                page == 1 ? "underline" : ""
              }`}
              onClick={() => {
                setPage(1);
                setSideBar(false);
              }}
            >
              Nuestro Manifiesto 📜
            </span>
          </span>
          <span className="tr select-none cursor-pointer">
            <span
              className={`tr select-none cursor-pointer font-bold p-2 hover:bg-[#D9D9D9] ${
                page == 2 ? "underline" : ""
              }`}
              onClick={() => {
                setPage(2);
                setSideBar(false);
              }}
            >
              Cómo Funciona 🔍
            </span>
          </span>
          <span className="tr select-none cursor-pointer">
            <span
              className={`tr select-none cursor-pointer font-bold p-2 hover:bg-[#D9D9D9] ${
                page == 3 ? "underline" : ""
              }`}
              onClick={() => {
                setPage(3);
                setSideBar(false);
              }}
            >
              Las Notésis 📌
            </span>
          </span>
          <span className="tr select-none cursor-pointer">
            <span
              className={`tr select-none cursor-pointer font-bold p-2 hover:bg-[#D9D9D9] ${
                page == 4 ? "underline" : ""
              }`}
              onClick={() => {
                setPage(4);
                setSideBar(false);
              }}
            >
              Sobre Nosotros 🎭
            </span>
          </span>
        </div>

        <div
          className={`tr lg:hidden pointer-events-none fixed bottom-0 right-0 md:mr-16 md:mb-16 mr-5 mb-16 ${
            page !== 0 ? "" : "translate-x-full opacity-0"
          }`}
        >
          <NavigateButton />
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
