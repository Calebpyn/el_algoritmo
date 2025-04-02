import { createContext, useContext, useState, ReactNode } from "react";

// Definir el tipo de datos del contexto
interface AppContextType {
  page: number;
  setPage: (page: number) => void;
}

// Crear el contexto con un valor por defecto
const AppContext = createContext<AppContextType | undefined>(undefined);

// Proveedor del contexto
export function AppProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(0);

  return (
    <AppContext.Provider value={{ page, setPage }}>
      {children}
    </AppContext.Provider>
  );
}

// Hook para usar el contexto fácilmente
export function useAppContext() {
  const context = useContext(AppContext);
  if (!context)
    throw new Error("useAppContext debe usarse dentro de un AppProvider");
  return context;
}
