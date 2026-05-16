import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

interface FavouriteProps {
  favourite: number[];
  addFavourite: (id: number) => void;
  removeFavourite: (id: number) => void;
  isFavourite: (id: number) => boolean;
  toggleFavourite: (id: number) => void;
  clearAll: () => void;
}

const favouriteContext = createContext<FavouriteProps | undefined>(undefined);

interface FavouriteProviderProp {
  children: ReactNode;
}
export function FavouriteProvider({ children }: FavouriteProviderProp) {
  const [favourite, setFavourite] = useState<number[]>(() => {
    const saved = localStorage.getItem("favourite");

    if (saved) {
      return JSON.parse(saved);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("favourite", JSON.stringify(favourite));
  }, [favourite]);

  function addFavourite(id: number) {
    setFavourite((prev) => [...prev, id]);
  }

  function removeFavourite(id: number) {
    setFavourite((prev) => prev.filter((favId) => favId !== id));
  }
  function isFavourite(id: number) {
    return favourite.includes(id);
  }
  function toggleFavourite(id: number) {
    setFavourite((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id],
    );
  }
  function clearAll() {
    setFavourite([]);
  }
  return (
    <favouriteContext.Provider
      value={{
        favourite,
        addFavourite,
        removeFavourite,
        isFavourite,
        toggleFavourite,
        clearAll,
      }}
    >
      {children}
    </favouriteContext.Provider>
  );
}

export function useFavourite() {
  const context = useContext(favouriteContext);
  if (!context) {
    throw new Error("useFavourite must be used with favouriteProvider");
  } else {
    return context;
  }
}
