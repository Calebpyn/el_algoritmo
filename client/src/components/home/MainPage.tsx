import logo from "../../assets/algo_logo.svg";
import NavigateButton from "../common/NavigateButton";
import NewsButton from "../common/NewsButton";

function MainPage() {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="flex justify-center items-center flex-col gap-10 -mt-14">
        <span>
          <img src={logo} alt="logo" />
        </span>
        <span className="md:flex hidden">
          <NewsButton />
        </span>
        <span className="md:hidden flex text-3xl">
          <NavigateButton />
        </span>
        <span className="md:px-0 px-5">
          <span className="font-bold md:text-2xl text-xl text-center">
            <p>
              “Si está en tendencia, es porque alguien quiere que lo leas.
              <br />
              Nosotros te diremos{" "}
              <text className="relative">
                por qué
                <span className="absolute w-full h-[80%] bg-red-400/35 left-0 -bottom-[30%]"></span>
              </text>
              .”
            </p>
          </span>
        </span>
      </div>
    </div>
  );
}

export default MainPage;
