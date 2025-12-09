
import React from 'react';
import { Play, Info } from 'lucide-react';
import { TELEGRAM_LINK, HERO_IMAGE } from '../constants';

const Hero: React.FC = () => {
  const handleRedirect = () => {
    window.open(TELEGRAM_LINK, '_blank');
  };

  return (
    <div 
      onClick={handleRedirect}
      className="relative h-[80vh] w-full cursor-pointer group overflow-hidden z-0"
    >
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src={HERO_IMAGE} 
          alt="Hero Background" 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-[#141414] h-full w-full pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#141414]/80 via-transparent to-transparent h-full w-full pointer-events-none" />
      </div>

      {/* Content */}
      <div className="absolute bottom-[20%] left-4 md:left-12 max-w-2xl space-y-4 pointer-events-none">
        <div className="flex items-center gap-2 mb-2">
          <span className="bg-[#E50914] text-white text-[10px] md:text-xs font-bold px-2 py-1 rounded shadow-sm">
            TOP 1 NO BRASIL
          </span>
        </div>
        
        <h1 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg leading-tight">
          ACESSO EXCLUSIVO <br/>
          <span className="text-red-500">VIP</span>
        </h1>

        <p className="text-white text-sm md:text-lg drop-shadow-md font-medium max-w-lg">
          Assista aos melhores conteúdos que não estão disponíveis em nenhum outro lugar. 
          Entre agora no nosso canal privado e tenha acesso imediato.
        </p>

        {/* Buttons - Pointer events auto to ensure hover effects work, but click bubbles up */}
        <div className="flex items-center gap-3 pt-4 pointer-events-auto">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleRedirect();
            }}
            className="bg-white text-black hover:bg-white/90 transition flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 rounded font-bold text-sm md:text-lg hover:scale-105 transform duration-200 shadow-lg"
          >
            <Play className="w-5 h-5 md:w-6 md:h-6 fill-black" />
            Assistir Agora
          </button>
          
          <button 
            onClick={(e) => {
              e.stopPropagation();
              handleRedirect();
            }}
            className="bg-gray-500/70 text-white hover:bg-gray-500/50 transition flex items-center gap-2 px-6 md:px-8 py-2 md:py-3 rounded font-bold text-sm md:text-lg backdrop-blur-sm hover:scale-105 transform duration-200"
          >
            <Info className="w-5 h-5 md:w-6 md:h-6" />
            Mais Informações
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
