import { useContext } from "react";
import { LocationContext } from "../contexts/LocationContext";

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('useLocation precisa do LocationProvider');
  }
  return context;
};