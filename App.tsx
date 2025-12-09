
import React, { useEffect, useState, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import VideoRow from './components/VideoRow';
import { CATEGORIES, TELEGRAM_LINK } from './constants';
import { ArrowUpRight, Play, AlertCircle, MoreHorizontal, Globe, Copy, Check } from 'lucide-react';

const App: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [isTikTok, setIsTikTok] = useState(false);
  const [copied, setCopied] = useState(false);
  const urlInputRef = useRef<HTMLInputElement>(null);

  const handleRedirect = () => {
    window.open(TELEGRAM_LINK, '_blank');
  };

  const handleCopyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }).catch(() => {
      // Fallback para dispositivos antigos
      if (urlInputRef.current) {
        urlInputRef.current.select();
        document.execCommand('copy');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    });
  };

  useEffect(() => {
    // 0. Detectar Navegador do TikTok (Lógica Reforçada)
    const ua = navigator.userAgent.toLowerCase();
    const isInApp = [
      'tiktok', 
      'bytedance', 
      'aweme',      // Nome do pacote interno do TikTok
      'musical_ly', // Nome antigo
      'trill'       // Outra variação asiática
    ].some(keyword => ua.includes(keyword));

    if (isInApp) {
      setIsTikTok(true);
      return; 
    }

    // Timer de 15 segundos para mostrar o modal
    const timer = setTimeout(() => {
      setShowModal(true);
    }, 15000);

    // 1. Exit Intent
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) {
        handleRedirect();
        setShowModal(true);
      }
    };

    // 2. Before Unload
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = ''; 
    };

    // 3. Bloqueio de Inspeção
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'F12') e.preventDefault();
      if (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) e.preventDefault();
      if (e.ctrlKey && (e.key === 'u' || e.key === 'U')) e.preventDefault();
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

  // TELA DE TUTORIAL PARA TIKTOK (ATUALIZADA)
  if (isTikTok) {
    return (
      <div className="min-h-screen bg-[#141414] text-white flex flex-col items-center justify-center p-6 text-center relative overflow-hidden font-sans">
        
        {/* Setas animadas */}
        <div className="absolute top-2 right-4 flex flex-col items-center animate-bounce duration-1000">
          <ArrowUpRight className="w-10 h-10 text-[#E50914] stroke-[3]" />
          <span className="text-[10px] font-bold text-[#E50914] uppercase tracking-widest">Clique Aqui</span>
        </div>

        <div className="bg-[#1f1f1f] p-6 rounded-2xl border border-[#E50914] shadow-[0_0_40px_rgba(229,9,20,0.2)] max-w-sm w-full z-10">
          <AlertCircle className="w-14 h-14 text-[#E50914] mx-auto mb-4" />
          
          <h1 className="text-xl font-black mb-2 uppercase leading-tight text-white">
            Acesso Bloqueado
          </h1>
          
          <p className="text-gray-400 text-sm mb-6 font-medium leading-relaxed">
            O TikTok não abre links secretos. Você precisa abrir no <strong>Chrome</strong> ou <strong>Safari</strong>.
          </p>

          <div className="space-y-3 text-left bg-black/40 p-4 rounded-lg mb-6 border border-gray-800">
            <div className="flex items-start gap-3">
              <span className="bg-[#E50914] w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">1</span>
              <p className="text-sm text-gray-200">Toque nos <strong>3 pontinhos</strong> ou <strong>Compartilhar</strong> no topo da tela.</p>
            </div>
            <div className="flex items-start gap-3">
              <span className="bg-[#E50914] w-5 h-5 rounded-full flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">2</span>
              <p className="text-sm text-gray-200">Escolha <strong className="text-white border-b border-gray-500">Abrir no Navegador</strong>.</p>
            </div>
          </div>

          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#1f1f1f] px-2 text-gray-500">Ou copie o link</span>
            </div>
          </div>

          <div className="flex gap-2 mb-2">
            <input 
              ref={urlInputRef}
              type="text" 
              readOnly 
              value={window.location.href}
              className="bg-black/50 border border-gray-700 text-gray-400 text-xs rounded px-3 py-2 w-full outline-none"
            />
            <button 
              onClick={handleCopyLink}
              className={`px-3 py-2 rounded font-bold text-xs uppercase transition-colors flex items-center justify-center gap-1 min-w-[90px] ${
                copied ? 'bg-green-600 text-white' : 'bg-white text-black hover:bg-gray-200'
              }`}
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copiado' : 'Copiar'}
            </button>
          </div>
          
          <p className="text-[10px] text-gray-500 mt-2">
            Depois cole no Google Chrome/Safari para entrar.
          </p>
        </div>
        
        {/* Opção de emergência caso seja falso positivo */}
        <button 
           onClick={() => setIsTikTok(false)}
           className="mt-8 text-xs text-gray-600 underline hover:text-gray-400"
        >
          Já estou no navegador correto
        </button>
      </div>
    );
  }

  // APP NORMAL
  return (
    <div className="bg-[#141414] min-h-screen text-white font-sans overflow-x-hidden selection:bg-[#E50914] selection:text-white pb-20">
      <Navbar />
      
      <main>
        <Hero />
        
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
