
import React, { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoRow from './components/VideoRow';
import { CATEGORIES, TELEGRAM_LINK } from './constants';
import { ArrowUpRight, Play, AlertCircle } from 'lucide-react';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleRedirect = () => {
    window.open(TELEGRAM_LINK, '_blank');
  };

  useEffect(() => {
    // Timer de 15 segundos para mostrar o modal
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 15000);

    // 1. Exit Intent: Detecta quando o mouse sai da janela (vai para a barra de abas)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        // Tenta abrir o Telegram
        handleRedirect();
        // Garante que o modal apareça caso o popup blocker bloqueie o redirect
        setShowModal(true);
      }
    };

    // 2. Before Unload: Mostra confirmação nativa se tentar fechar
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      // A mensagem personalizada é ignorada pela maioria dos navegadores modernos, 
      // mas a atribuição ativa a caixa de diálogo padrão.
      e.returnValue = ''; 
    };

    // 3. Bloqueio de Inspeção (Anti-Developer Tools)
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault(); // Desativa botão direito
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      // Bloqueia F12
      if (e.key === 'F12') {
        e.preventDefault();
      }
      // Bloqueia Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (DevTools)
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) {
        e.preventDefault();
      }
      // Bloqueia Ctrl+U (Ver Código Fonte)
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) {
        e.preventDefault();
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('beforeunload', handleBeforeUnload);
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="bg-[#141414] min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#E50914] selection:text-white pb-20">
      <Navbar />
      
      <main>
        <Hero />
        
        {/* Slight overlap with hero to mimic Netflix layout */}
        <div className="relative z-10 -mt-20 md:-mt-32 space-y-4">
          {CATEGORIES.map((category, index) => (
            <VideoRow 
              key={index} 
              title={category.title} 
              items={category.items} 
            />
          ))}
        </div>
      </main>

      {/* Footer / Disclaimer */}
      <footer className="px-4 md:px-12 py-12 mt-12 text-gray-500 text-sm text-center">
        <div 
          onClick={handleRedirect}
          className="cursor-pointer hover:underline text-[#E50914] flex items-center justify-center gap-1 mb-8"
        >
          <span>Acessar Canal Oficial</span>
          <ArrowUpRight className="w-4 h-4" />
        </div>
        <p>© 2024 FODE-FLIX. Todos os direitos reservados.</p>
      </footer>

      {/* MODAL 15 Segundos / Exit Intent */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#181818] border border-gray-700 rounded-lg p-6 max-w-md w-full shadow-2xl relative text-center">
            <button 
              onClick={() => setShowModal(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-white"
            >
              ✕
            </button>
            
            <div className="flex justify-center mb-4">
               <div className="w-16 h-16 bg-red-600/20 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-[#E50914]" />
               </div>
            </div>

            <h2 className="text-2xl font-bold text-white mb-2">JÁ VAI SAIR? 😈</h2>
            <p className="text-gray-300 mb-6">
              Não perca a chance! O conteúdo exclusivo VIP está disponível apenas por tempo limitado.
            </p>

            <button 
              onClick={handleRedirect}
              className="w-full bg-[#E50914] hover:bg-[#b2070f] text-white font-bold py-3 px-4 rounded flex items-center justify-center gap-2 transition-transform hover:scale-105"
            >
              <Play className="w-5 h-5 fill-current" />
              VER CONTEÚDO AGORA
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
