/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Wind, 
  Gamepad2, 
  Send, 
  CloudLightning, 
  Info, 
  MessageSquare,
  Tornado,
  Zap,
  Activity,
  History,
  ShieldAlert,
  ChevronRight,
  Cpu
} from 'lucide-react';
import { getAIContextResponse } from './services/geminiService';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [context, setContext] = useState<'real-life' | 'twisted' | 'general'>('general');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (customPrompt?: string, forcedContext?: 'real-life' | 'twisted') => {
    const promptValue = customPrompt || input;
    if (!promptValue.trim()) return;

    const newMessages: Message[] = [
      ...messages,
      { role: 'user', content: promptValue }
    ];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    const activeContext = forcedContext || context;
    const response = await getAIContextResponse(promptValue, activeContext);

    setMessages([...newMessages, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  const triggerRealTornadoTalk = () => {
    setContext('real-life');
    handleSend("Tell me about real-life tornadoes and their power.", 'real-life');
  };

  const triggerTwistedRobloxTalk = () => {
    setContext('twisted');
    handleSend("Tell me about the Roblox game 'Twisted' and what makes it unique.", 'twisted');
  };

  return (
    <div className="h-screen bg-[#0f172a] text-slate-100 font-sans flex flex-col overflow-hidden">
      {/* Header Section */}
      <header className="h-20 border-b border-slate-800 flex items-center justify-between px-8 bg-slate-900/50 backdrop-blur-md shrink-0 z-20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/20 group cursor-pointer overflow-hidden">
            <Tornado className="h-6 w-6 text-white group-hover:rotate-12 transition-transform" />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight text-white">VORTEX <span className="text-blue-400">AI</span></h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500">Storm Dynamics Intelligence</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-8 text-[11px] font-mono text-slate-400 border-r border-slate-800 pr-6 mr-6">
            <div className="flex items-center gap-2">
              <Wind className="w-3" />
              <span>STORM: 180 MPH</span>
            </div>
            <div className="flex items-center gap-2 text-red-400/80">
              <ShieldAlert className="w-3" />
              <span>ALERT: PDS</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700">
              <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.5)]"></div>
              <span className="text-[10px] text-slate-300 font-medium uppercase tracking-wider">Engine Online</span>
            </div>
            <div className="h-8 w-8 rounded-full bg-slate-700 border border-slate-600 flex items-center justify-center shadow-inner">
              <span className="text-xs font-bold text-slate-400 uppercase">CH</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Layout */}
      <main className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar: Command Center */}
        <aside className="w-80 bg-slate-950/40 border-r border-slate-800 p-6 flex flex-col shrink-0 overflow-y-auto custom-scrollbar">
          <div className="mb-8">
            <h2 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Zap className="w-3 h-3" /> Analysis Presets
            </h2>
            <div className="space-y-3">
              <button 
                onClick={triggerRealTornadoTalk}
                className={`w-full flex flex-col items-start p-4 hover:bg-slate-800/60 border rounded-xl transition-all group text-left ${context === 'real-life' ? 'bg-slate-800/60 border-blue-500/50' : 'bg-slate-800/40 border-slate-700'}`}
              >
                <span className="text-blue-400 font-bold text-sm mb-1">Meteorological Data</span>
                <span className="text-[11px] text-slate-400 leading-relaxed font-medium">Ask about real-life tornado formation, EF-scales, and historical storm records.</span>
              </button>
              <button 
                onClick={triggerTwistedRobloxTalk}
                className={`w-full flex flex-col items-start p-4 hover:bg-slate-800/60 border rounded-xl transition-all group text-left ${context === 'twisted' ? 'bg-slate-800/60 border-indigo-500/50' : 'bg-slate-800/40 border-slate-700'}`}
              >
                <span className="text-indigo-400 font-bold text-sm mb-1">Twisted Roblox Intel</span>
                <span className="text-[11px] text-slate-400 leading-relaxed font-medium">Query information on intercept vehicles, map navigation, and storm chasing mechanics.</span>
              </button>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
              <History className="w-3 h-3" /> Session Metadata
            </h2>
            <div className="p-4 bg-slate-900/80 rounded-xl border border-slate-800 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-500 font-mono">Active Model</span>
                <span className="text-[11px] text-blue-300 font-mono uppercase">STORM-FLASH v3</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[11px] text-slate-500 font-mono">Status</span>
                <span className="text-[11px] text-emerald-400 font-mono uppercase">{isLoading ? 'Processing...' : 'Awaiting Input'}</span>
              </div>
              <div className="pt-2">
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: "30%" }}
                    animate={{ width: isLoading ? "100%" : "30%" }}
                    transition={{ duration: 2, repeat: isLoading ? Infinity : 0 }}
                    className="h-full bg-gradient-to-r from-blue-600 to-indigo-500"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto pt-6 border-t border-slate-800/50 text-[10px] text-slate-600 leading-relaxed uppercase tracking-wider italic">
            VORTEX-AI provides real-time synthesis of atmospheric physics and simulation mechanics.
          </div>
        </aside>

        {/* Main Chat/Display Area */}
        <section className="flex-1 flex flex-col relative bg-[#0f172a]">
          <div 
             ref={chatContainerRef}
             className="flex-1 p-8 space-y-6 overflow-y-auto scroll-smooth custom-scrollbar pb-24"
          >
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center opacity-40 select-none">
                <div className="p-8 rounded-full bg-slate-800/20 border border-slate-700/30 mb-6">
                  <Cpu className="w-16 h-16 text-slate-600" />
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold tracking-widest uppercase mb-1">Station Standby</p>
                  <p className="text-xs font-mono">Select a preset or initiate manual query</p>
                </div>
              </div>
            )}

            <AnimatePresence mode="popLayout">
              {messages.map((message, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 12, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  className={`flex gap-4 ${message.role === 'user' ? 'flex-row-reverse max-w-2xl ml-auto' : 'max-w-3xl'}`}
                >
                  <div className={`w-8 h-8 rounded shrink-0 flex items-center justify-center text-[10px] font-bold shadow-lg ${
                    message.role === 'user' ? 'bg-slate-700 text-slate-300' : 'bg-blue-600 text-white'
                  }`}>
                    {message.role === 'user' ? 'ME' : 'AI'}
                  </div>
                  <div className={`p-4 rounded-2xl shadow-xl backdrop-blur-sm border ${
                    message.role === 'user' 
                      ? 'bg-blue-600/10 border-blue-500/30 rounded-tr-none' 
                      : 'bg-slate-800/80 border-slate-700 rounded-tl-none'
                  }`}>
                    <p className="text-sm leading-relaxed text-slate-200 whitespace-pre-wrap">{message.content}</p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex gap-4 max-w-2xl"
              >
                <div className="w-8 h-8 rounded bg-blue-600 shrink-0 flex items-center justify-center text-[10px] font-bold shadow-lg">AI</div>
                <div className="bg-slate-800/80 border border-slate-700 p-4 rounded-2xl rounded-tl-none flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse [animation-delay:0.2s]"></span>
                  <span className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse [animation-delay:0.4s]"></span>
                </div>
              </motion.div>
            )}
          </div>

          {/* Input Area */}
          <div className="absolute bottom-0 left-0 right-0 p-6 bg-slate-900 border-t border-slate-800/80 shadow-[0_-10px_30px_rgba(0,0,0,0.3)] z-10">
            <div className="max-w-4xl mx-auto">
              <form 
                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                className="flex gap-4"
              >
                <div className="relative flex-1">
                  <input 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    type="text" 
                    placeholder="Ask about storms, vehicles, or mechanics..." 
                    className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-4 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 text-slate-200 placeholder:text-slate-600 transition-all font-medium"
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-2 text-slate-600">
                    <kbd className="px-1.5 py-0.5 border border-slate-800 rounded text-[9px] font-mono bg-slate-900">ENTER</kbd>
                  </div>
                </div>
                <button 
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-blue-600 hover:bg-blue-500 px-8 py-3 rounded-xl font-bold text-sm text-white transition-all flex items-center gap-2 shadow-lg shadow-blue-600/20 disabled:opacity-50 disabled:grayscale active:scale-95"
                >
                  SEND
                  <ChevronRight className="h-4 w-4" />
                </button>
              </form>
              <div className="flex justify-center gap-8 mt-4">
                <button 
                  onClick={triggerRealTornadoTalk}
                  className="text-[10px] text-slate-500 hover:text-blue-400 flex items-center gap-2 uppercase tracking-widest font-bold transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shadow-[0_0_5px_rgba(59,130,246,0.5)]"></span>
                  Real-Life
                </button>
                <button 
                  onClick={triggerTwistedRobloxTalk}
                  className="text-[10px] text-slate-500 hover:text-indigo-400 flex items-center gap-2 uppercase tracking-widest font-bold transition-colors"
                >
                  <span className="w-1.5 h-1.5 bg-indigo-500 rounded-full shadow-[0_0_5px_rgba(99,102,241,0.5)]"></span>
                  Twisted Roblox
                </button>
                <button 
                  onClick={() => setContext('general')}
                  className="text-[10px] text-slate-500 hover:text-slate-300 flex items-center gap-2 uppercase tracking-widest font-bold transition-colors"
                >
                  <span className={`w-1.5 h-1.5 rounded-full shadow-[0_0_5px_rgba(100,116,139,0.5)] ${context === 'general' ? 'bg-slate-300' : 'bg-slate-700'}`}></span>
                  General
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
