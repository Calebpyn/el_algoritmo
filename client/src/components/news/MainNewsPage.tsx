import { useEffect, useRef, useState } from "react";
import api from "../../api";
import CircularProgress from "@mui/material/CircularProgress";
import { FaChevronUp } from "react-icons/fa";

type Categoria = {
  id: number;
  nombre: string;
};

type Fuente = {
  id: number;
  url: string;
  autor: string;
  notesis: number;
  publday: string;
  created_at: string;
  nombre_art: string;
};

type Notesis = {
  id: number;
  titulo: string;
  contenido: string;
  categoria: Categoria;
  fuentes: Fuente[];
  publday: string;
};

type categoriesType = { id: number; name: String };

const categories: categoriesType[] = [
  { id: 1, name: "Códigos & Cafecito ☕💻" },
  { id: 2, name: "Money Talks 💸" },
  { id: 3, name: "El Chisme de la Bolsa 📉" },
  { id: 4, name: "Viral o Fake 🤥" },
  { id: 5, name: "La Realidad Virtual 🌐" },
  { id: 6, name: "Noticias del Futuro 🔮" },
];

function MainNewsPage() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [loaded, setLoaded] = useState<boolean>(true);
  const [topicsOpen, setTopicsOpen] = useState<boolean>(false);

  const [notas, setNotas] = useState<Notesis[]>([]);
  const [topics, _] = useState(categories);
  const [selectedTopic, setSelectedTopic] = useState<number>(1);

  useEffect(() => {
    const fetchNotas = async () => {
      try {
        const response = await api.get<Notesis[]>("/notesis");
        setNotas(response.data);
        setLoaded(false);
      } catch (error) {
        console.error("Error al traer las notas:", error);
      }
    };

    fetchNotas();
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [selectedTopic]);

  const topicsRef = useRef<HTMLDivElement>(null); // Ref para el contenedor de topics

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        topicsRef.current &&
        !topicsRef.current.contains(event.target as Node)
      ) {
        setTopicsOpen(false);
      }
    };

    if (topicsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [topicsOpen]);

  return loaded ? (
    <div className="w-full h-full flex justify-center items-center">
      <CircularProgress color="inherit" />
    </div>
  ) : (
    <div
      className="w-full h-full max-w-[1920px] flex justify-between items-center relative
    "
    >
      <div
        className="sm:w-[70%] w-full h-full md:pt-[140px] pt-[100px] p-10 overflow-y-auto flex flex-col gap-5 scrollbar-hide"
        ref={containerRef}
      >
        <span className="text-2xl font-bold">
          {notas.length > 0 ? notas[selectedTopic - 1]!.titulo : null}
        </span>
        <p style={{ whiteSpace: "pre-line" }}>
          {notas.length > 0 ? notas[selectedTopic - 1]!.contenido : null}
        </p>

        <span className="mt-16 font-bold text-xl flex justify-between items-center">
          <span>El dataset</span>
          <span className="text-base font-light">
            {notas[selectedTopic - 1]!.publday}
          </span>
        </span>
        <span className="gap-2 w-full flex-wrap flex mb-10">
          {notas.length > 0
            ? notas[selectedTopic - 1]!.fuentes.map((fuente, idx) => (
                <a
                  key={idx}
                  className="bg-[#D9D9D9] px-2 py-1 overflow-hidden tr cursor-pointer hover:bg-[#919191]"
                  href={fuente.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {fuente.nombre_art}
                </a>
              ))
            : null}
        </span>
      </div>
      <div className="w-[30%] h-full flex-col justify-between items-center pt-[140px] sm:flex hidden">
        <div className="w-full px-10 flex flex-col gap-5">
          {topics.map((topic, idx) => (
            <span
              key={idx}
              className={`w-full text-xl tr cursor-pointer ${
                selectedTopic == topic.id
                  ? "font-bold -ml-6"
                  : "hover:font-bold"
              }`}
              onClick={() => {
                setSelectedTopic(topic.id);
              }}
            >
              {topic.name}
            </span>
          ))}
        </div>
        <div></div>
      </div>
      <div
        className={`fixed bottom-0 sm:hidden tr flex right-0 mb-16 mr-10 bg-[#D9D9D9] shadow-xl rounded-full p-5 hover:scale-105 tr hover:bg-[#9d9d9d] cursor-pointer z-[100]`}
        onClick={() => setTopicsOpen(!topicsOpen)}
      >
        <span className={topicsOpen ? "rotate-180 tr" : "tr"}>
          <FaChevronUp />
        </span>
      </div>
      <div
        className={`fixed bottom-0 right-0 z-50 pb-36 w-[70%] tr ${
          topicsOpen ? "translate-y-0" : "translate-y-full"
        }`}
        ref={topicsRef}
      >
        <div className={`w-full pr-5 flex flex-col gap-5`}>
          {topics.map((topic, idx) => (
            <span
              key={idx}
              className={`w-full text-lg tr shadow-2xl  py-1 cursor-pointer rounded-full backdrop-blur-md px-3 ${
                selectedTopic == topic.id ? "bg-[#9191918d]" : "bg-[#d9d9d96f]"
              }`}
              onClick={() => {
                setSelectedTopic(topic.id);
              }}
            >
              {topic.name}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainNewsPage;
