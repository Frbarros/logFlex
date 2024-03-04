import { createContext, useContext, useState, useEffect } from 'react';

const FontContext = createContext();

export const FontProvider = ({ children }) => {
  const [baseRem, setBaseRem] = useState(16); // Inicialmente, 16px
  const [clickCount, setClickCount] = useState(0);
  const maxClicks = 6; // Defina o número máximo de cliques desejado

  const increaseBaseRem = () => {
    if (clickCount < maxClicks) {
      setBaseRem((prevBase) => prevBase + 2);
      setClickCount((prevCount) => prevCount + 1);
    }
  };

  const defaultBaseRem = () => {
    setBaseRem(16);
    setClickCount(0); // Reinicia o contador de cliques
  };

  const decreaseBaseRem = () => {
    if (clickCount < maxClicks) {
      setBaseRem((prevBase) => Math.max(12, prevBase - 2));
      setClickCount((prevCount) => prevCount + 1);
    }
  };

  // Atualiza a propriedade do elemento raiz quando baseRem muda
  useEffect(() => {
    document.documentElement.style.fontSize = `${baseRem}px`;
  }, [baseRem]);

  return (
    <FontContext.Provider
      value={{ baseRem, clickCount, increaseBaseRem, defaultBaseRem, decreaseBaseRem }}
    >
      {children}
    </FontContext.Provider>
  );
};

export const useFont = () => {
  return useContext(FontContext);
};
