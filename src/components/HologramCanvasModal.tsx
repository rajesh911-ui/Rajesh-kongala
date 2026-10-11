import React, { useEffect, useRef, useState } from 'react';

interface HologramCanvasModalProps {
  onClose: () => void;
  onEnroll: () => void;
}

export const HologramCanvasModal: React.FC<HologramCanvasModalProps> = ({ onClose, onEnroll }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [activeCard, setActiveCard] = useState<'main' | 'dashboard' | 'neural' | 'solutions'>('main');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [promptInput, setPromptInput] = useState('Create an intelligent AI analytics platform with dark bento-grid layout');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedTokens, setGeneratedTokens] = useState(482);

  // Background Neural Network Particle Simulation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.parentElement?.clientWidth || window.innerWidth);
    let height = (canvas.height = canvas.parentElement?.clientHeight || window.innerHeight);

    const handleResize = () => {
      if (!canvas || !canvas.parentElement) return;
      width = canvas.width = canvas.parentElement.clientWidth;
      height = canvas.height = canvas.parentElement.clientHeight;
    };
    window.addEventListener('resize', handleResize);

    // Particle nodes
    interface Node {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      color: string;
      pulse: number;
    }

    const nodes: Node[] = [];
    const nodeCount = 55;
    const colors = ['#4cd7f6', '#c0c1ff', '#3131c0', '#798098'];

    for (let i = 0; i < nodeCount; i++) {
      nodes.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.7,
        vy: (Math.random() - 0.5) * 0.7,
        radius: Math.random() * 2.5 + 1.5,
        color: colors[Math.floor(Math.random() * colors.length)],
        pulse: Math.random() * Math.PI * 2
      });
    }

    let t = 0;
    const render = () => {
      t += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Deep space gradient backdrop
      const bgGrad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        50,
        width / 2,
        height / 2,
        Math.max(width, height)
      );
      bgGrad.addColorStop(0, '#0a1017');
      bgGrad.addColorStop(0.6, '#080c10');
      bgGrad.addColorStop(1, '#05070a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      // Connect nodes with glowing lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 140) {
            const alpha = (1 - dist / 140) * 0.45;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(76, 215, 246, ${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Draw nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        if (node.x < 0 || node.x > width) node.vx *= -1;
        if (node.y < 0 || node.y > height) node.vy *= -1;

        const pulseScale = Math.sin(t + node.pulse) * 1.5 + 2.5;

        // Glowing outer halo
        ctx.beginPath();
        ctx.arc(node.x, node.y, pulseScale * 2.2, 0, Math.PI * 2);
        ctx.fillStyle = node.color === '#4cd7f6' ? 'rgba(76, 215, 246, 0.15)' : 'rgba(192, 193, 255, 0.15)';
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = 10;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 15;
    const y = (clientY / innerHeight - 0.5) * 15;
    setMousePos({ x, y });
  };

  const handleSimulatePrompt = () => {
    setIsGenerating(true);
    setTimeout(() => {
      setIsGenerating(false);
      setGeneratedTokens((prev) => prev + Math.floor(Math.random() * 80) + 40);
    }, 900);
  };

  return (
    <div
      onMouseMove={handleMouseMove}
      className="fixed inset-0 z-50 overflow-hidden bg-[#05070a] text-[#e0e3e5] flex flex-col select-none"
    >
      {/* Background Simulation Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Top Floating Control Bar */}
      <div className="relative z-20 flex items-center justify-between px-6 py-4 bg-[#0b0f10]/80 backdrop-blur-md border-b border-[#45464d]/40">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-[#3131c0]/50 border border-[#4cd7f6] flex items-center justify-center text-[#4cd7f6]">
            <span className="material-symbols-outlined text-lg">auto_awesome</span>
          </div>
          <div>
            <h2 className="text-sm font-headline font-bold text-[#e0e3e5]">
              Synapse AI • Neural Holographic Canvas
            </h2>
            <p className="text-[11px] font-mono text-[#4cd7f6]">
              Interactive 3D Perspective Visualizer (Image 1 Blueprint)
            </p>
          </div>
        </div>

        {/* View Focus Selector */}
        <div className="hidden md:flex items-center gap-2 bg-[#191c1e] p-1 rounded-lg border border-[#45464d]/40 text-xs font-mono">
          <button
            onClick={() => setActiveCard('main')}
            className={`px-3 py-1 rounded transition-colors ${
              activeCard === 'main' ? 'bg-[#3131c0] text-[#e0e3e5]' : 'text-[#c6c6cd] hover:text-[#e0e3e5]'
            }`}
          >
            Center: Synapse AI
          </button>
          <button
            onClick={() => setActiveCard('dashboard')}
            className={`px-3 py-1 rounded transition-colors ${
              activeCard === 'dashboard' ? 'bg-[#3131c0] text-[#e0e3e5]' : 'text-[#c6c6cd] hover:text-[#e0e3e5]'
            }`}
          >
            Left: Dashboard
          </button>
          <button
            onClick={() => setActiveCard('neural')}
            className={`px-3 py-1 rounded transition-colors ${
              activeCard === 'neural' ? 'bg-[#3131c0] text-[#e0e3e5]' : 'text-[#c6c6cd] hover:text-[#e0e3e5]'
            }`}
          >
            Bottom: Neural Net
          </button>
          <button
            onClick={() => setActiveCard('solutions')}
            className={`px-3 py-1 rounded transition-colors ${
              activeCard === 'solutions' ? 'bg-[#3131c0] text-[#e0e3e5]' : 'text-[#c6c6cd] hover:text-[#e0e3e5]'
            }`}
          >
            Right: Solutions
          </button>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={onEnroll}
            className="px-4 py-2 rounded-lg bg-[#c0c1ff] hover:bg-[#e1e0ff] text-[#1000a9] text-xs font-headline font-bold shadow-md cursor-pointer"
          >
            Enroll in Cohort ($199)
          </button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-[#191c1e] hover:bg-[#272a2c] text-[#e0e3e5] border border-[#45464d]/40 cursor-pointer"
            title="Close 3D View"
          >
            <span className="material-symbols-outlined text-lg">close</span>
          </button>
        </div>
      </div>

      {/* Main 3D Viewport with Parallax Perspective */}
      <div className="relative z-10 flex-grow flex items-center justify-center p-4 md:p-8 perspective-[1200px] overflow-hidden">
        <div
          style={{
            transform: `rotateY(${mousePos.x}deg) rotateX(${-mousePos.y}deg)`,
            transition: 'transform 0.15s ease-out'
          }}
          className="relative w-full max-w-5xl h-[620px] flex items-center justify-center transform-style-3d"
        >
          {/* Card 1: Main Center Window ("Synapse AI") */}
          <div
            onClick={() => setActiveCard('main')}
            style={{
              transform: activeCard === 'main' ? 'translateZ(60px) scale(1)' : 'translateZ(10px) scale(0.95)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className={`w-[90%] max-w-2xl bg-[#0b0f10]/85 backdrop-blur-xl border rounded-2xl p-6 shadow-2xl relative cursor-pointer ${
              activeCard === 'main'
                ? 'border-[#4cd7f6] shadow-[0_0_40px_rgba(76,215,246,0.25)]'
                : 'border-[#45464d]/50 opacity-85 hover:opacity-100'
            }`}
          >
            {/* Window Topbar */}
            <div className="flex items-center justify-between pb-4 border-b border-[#45464d]/30 text-xs text-[#c6c6cd]">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-[#ffb4ab]"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-amber-400"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-400"></div>
                </div>
                <div className="flex items-center gap-1 text-[#e0e3e5] font-bold font-headline">
                  <span className="material-symbols-outlined text-[#4cd7f6] text-sm">auto_awesome</span>
                  <span>Synapse AI</span>
                  <span className="text-[#909097] font-normal ml-2">Home Solutions</span>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-4 text-[11px] font-mono">
                <span className="text-[#4cd7f6]">Explore</span>
                <span className="hover:text-[#e0e3e5]">Features</span>
                <span className="hover:text-[#e0e3e5]">Insights</span>
                <span className="hover:text-[#e0e3e5]">Contact</span>
              </div>
            </div>

            {/* Window Content */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-6 mt-6 items-center">
              <div className="sm:col-span-7 space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-widest text-[#4cd7f6] bg-[#001b21] px-2 py-0.5 rounded border border-[#4cd7f6]/30">
                  FUTURE OF AI SOLUTIONS
                </span>
                <h3 className="font-headline font-extrabold text-2xl md:text-3xl text-[#e0e3e5] leading-tight">
                  Innovative Intelligence for Growth
                </h3>
                <p className="text-xs text-[#c6c6cd] leading-relaxed">
                  Visualizing connected data late nodes, generative web agents, and predictive visual hierarchies.
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSimulatePrompt();
                    }}
                    className="px-4 py-2 rounded-lg bg-[#4cd7f6] text-[#001f26] font-headline font-bold text-xs hover:bg-[#acedff] shadow-sm flex items-center gap-1.5"
                  >
                    <span>{isGenerating ? 'Synthesizing...' : 'Get Started'}</span>
                    <span className="material-symbols-outlined text-sm">bolt</span>
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEnroll();
                    }}
                    className="px-4 py-2 rounded-lg bg-[#191c1e] text-[#e0e3e5] border border-[#45464d]/40 text-xs hover:bg-[#272a2c] hover:border-[#00ff7f]"
                  >
                    View Module 1
                  </button>
                </div>
              </div>

              {/* Central Glowing AI Core Graphic */}
              <div className="sm:col-span-5 flex items-center justify-center relative">
                <div className="w-36 h-36 rounded-2xl bg-gradient-to-tr from-[#3131c0]/40 via-[#001b21] to-[#4cd7f6]/30 border border-[#4cd7f6]/40 p-4 flex flex-col items-center justify-center relative overflow-hidden group shadow-lg">
                  <div className="w-16 h-16 rounded-full bg-[#0b0f10] border-2 border-[#4cd7f6] flex items-center justify-center text-[#4cd7f6] font-mono font-bold text-lg shadow-[0_0_20px_rgba(76,215,246,0.6)]">
                    AI
                  </div>
                  <div className="absolute inset-0 bg-[radial-gradient(#4cd7f6_1px,transparent_1px)] [background-size:8px_8px] opacity-20 pointer-events-none"></div>
                  <span className="text-[10px] font-mono text-[#c0c1ff] mt-2">v4.8 Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: Floating Upper Left Window ("Dashboard / Analytics") */}
          <div
            onClick={() => setActiveCard('dashboard')}
            style={{
              transform:
                activeCard === 'dashboard'
                  ? 'translateX(-120px) translateY(-90px) translateZ(80px) scale(1.05)'
                  : 'translateX(-260px) translateY(-140px) translateZ(20px) scale(0.85)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className={`hidden md:block absolute w-64 bg-[#0b0f10]/85 backdrop-blur-md border rounded-xl p-4 shadow-xl cursor-pointer ${
              activeCard === 'dashboard'
                ? 'border-[#c0c1ff] shadow-[0_0_30px_rgba(192,193,255,0.3)] z-30'
                : 'border-[#45464d]/40 opacity-80 hover:opacity-100 z-10'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#45464d]/30 text-xs">
              <span className="font-bold text-[#e0e3e5]">Dashboard</span>
              <span className="text-[10px] text-[#4cd7f6] font-mono">Analytics</span>
            </div>
            <div className="mt-3 space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#c6c6cd]">Data Visuals Users</span>
                <span className="font-mono text-[#4cd7f6] font-bold">8.2k</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#c6c6cd]">Growth</span>
                <span className="font-mono text-emerald-400 font-bold">+24.5%</span>
              </div>
              {/* Mini visual bars */}
              <div className="flex items-end gap-1.5 h-10 pt-2">
                <div className="flex-1 bg-[#3131c0] h-4 rounded-t"></div>
                <div className="flex-1 bg-[#4cd7f6] h-7 rounded-t"></div>
                <div className="flex-1 bg-[#3131c0] h-5 rounded-t"></div>
                <div className="flex-1 bg-[#4cd7f6] h-9 rounded-t"></div>
                <div className="flex-1 bg-[#c0c1ff] h-8 rounded-t"></div>
              </div>
            </div>
          </div>

          {/* Card 3: Floating Lower Left Window ("Neural Network") */}
          <div
            onClick={() => setActiveCard('neural')}
            style={{
              transform:
                activeCard === 'neural'
                  ? 'translateX(-130px) translateY(120px) translateZ(80px) scale(1.05)'
                  : 'translateX(-260px) translateY(160px) translateZ(10px) scale(0.85)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className={`hidden md:block absolute w-72 bg-[#0b0f10]/85 backdrop-blur-md border rounded-xl p-4 shadow-xl cursor-pointer ${
              activeCard === 'neural'
                ? 'border-[#4cd7f6] shadow-[0_0_30px_rgba(76,215,246,0.3)] z-30'
                : 'border-[#45464d]/40 opacity-80 hover:opacity-100 z-10'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#45464d]/30 text-xs">
              <span className="font-bold text-[#e0e3e5]">Neural Network</span>
              <span className="material-symbols-outlined text-xs text-[#4cd7f6]">hub</span>
            </div>
            <p className="text-[11px] text-[#c6c6cd] mt-2 leading-relaxed">
              Visualizing connected data late nodes, synapsing and generating responsive UI components.
            </p>
            <div className="mt-3 p-2 rounded bg-[#101415] border border-[#45464d]/30 flex items-center justify-between text-[11px] font-mono">
              <span className="text-[#c6c6cd]">Active Synapses:</span>
              <span className="text-[#4cd7f6]">{generatedTokens} Nodes</span>
            </div>
          </div>

          {/* Card 4: Floating Right Window ("Solutions") */}
          <div
            onClick={() => setActiveCard('solutions')}
            style={{
              transform:
                activeCard === 'solutions'
                  ? 'translateX(140px) translateY(100px) translateZ(80px) scale(1.05)'
                  : 'translateX(280px) translateY(130px) translateZ(15px) scale(0.85)',
              transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)'
            }}
            className={`hidden md:block absolute w-64 bg-[#0b0f10]/85 backdrop-blur-md border rounded-xl p-4 shadow-xl cursor-pointer ${
              activeCard === 'solutions'
                ? 'border-[#c0c1ff] shadow-[0_0_30px_rgba(192,193,255,0.3)] z-30'
                : 'border-[#45464d]/40 opacity-80 hover:opacity-100 z-10'
            }`}
          >
            <div className="flex items-center justify-between pb-2 border-b border-[#45464d]/30 text-xs">
              <span className="font-bold text-[#e0e3e5]">Solutions</span>
              <span className="text-[10px] text-[#c0c1ff] font-mono">Core Scaled</span>
            </div>
            <div className="mt-2 space-y-2 text-xs">
              <div className="p-2 rounded bg-[#191c1e] border border-[#45464d]/30 flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-[#4cd7f6]">widgets</span>
                <span className="text-xs text-[#e0e3e5]">Smart Layout Blocks</span>
              </div>
              <div className="p-2 rounded bg-[#191c1e] border border-[#45464d]/30 flex items-center gap-2">
                <span className="material-symbols-outlined text-xs text-[#c0c1ff]">code</span>
                <span className="text-xs text-[#e0e3e5]">Zero-Code Pipelines</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Interactive Command Bar */}
      <div className="relative z-20 px-6 py-4 bg-[#0b0f10]/90 backdrop-blur-md border-t border-[#45464d]/40">
        <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-3">
          <div className="relative flex-grow w-full">
            <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#4cd7f6] text-lg">
              terminal
            </span>
            <input
              type="text"
              value={promptInput}
              onChange={(e) => setPromptInput(e.target.value)}
              placeholder="Type prompt to generate neural interface..."
              className="w-full bg-[#191c1e] border border-[#45464d]/60 rounded-lg pl-9 pr-4 py-2 text-xs text-[#e0e3e5] font-mono placeholder:text-[#909097] focus:border-[#4cd7f6] outline-none"
            />
          </div>
          <button
            onClick={handleSimulatePrompt}
            disabled={isGenerating}
            className="w-full sm:w-auto px-5 py-2 rounded-lg bg-[#3131c0] hover:bg-indigo-600 text-[#e0e3e5] font-mono text-xs font-semibold flex items-center justify-center gap-2 shrink-0 cursor-pointer shadow-sm"
          >
            <span className="material-symbols-outlined text-sm">
              {isGenerating ? 'sync' : 'magic_button'}
            </span>
            <span>{isGenerating ? 'Generating Nodes...' : 'Execute Prompt Directive'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};
