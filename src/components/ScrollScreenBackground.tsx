import React, { useEffect, useRef, useState } from 'react';

export interface ScrollScreenBackgroundProps {
  currentView?: 'landing' | 'checkout' | 'hologram';
}

export const ScrollScreenBackground: React.FC<ScrollScreenBackgroundProps> = ({ currentView: _currentView }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Custom frame sequence state
  const [loadedFramesCount, setLoadedFramesCount] = useState<number>(0);
  const [currentFrameIndex, setCurrentFrameIndex] = useState<number>(1);
  const [isPlayingAuto, setIsPlayingAuto] = useState<boolean>(false);
  const [showHUD, setShowHUD] = useState<boolean>(true);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // In-memory cache of loaded image elements
  const customFramesRef = useRef<HTMLImageElement[]>([]);

  // Animation and physics state
  const animState = useRef({
    targetFrame: 1,
    interpolatedFrame: 1,
    scrollProgress: 0,
    velocity: 0,
    time: 0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0,
    autoPlayFrame: 1,
  });

  // Track window scroll progress and map to 1..300 frames
  useEffect(() => {
    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(1, Math.max(0, window.scrollY / docHeight)) : 0;
      
      const targetF = Math.round(progress * 299) + 1;
      animState.current.targetFrame = targetF;
      animState.current.scrollProgress = progress;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      animState.current.targetMouseX = nx;
      animState.current.targetMouseY = ny;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Handle uploaded frame files (ezgif-frame-001.jpg .. ezgif-frame-300.jpg)
  const processUploadedFiles = (files: FileList | File[]) => {
    const fileArray = Array.from(files).filter(f => f.type.startsWith('image/'));
    if (fileArray.length === 0) return;

    // Sort files naturally by frame number (e.g., ezgif-frame-001.jpg -> 1)
    fileArray.sort((a, b) => {
      const numA = parseInt(a.name.replace(/\D/g, ''), 10) || 0;
      const numB = parseInt(b.name.replace(/\D/g, ''), 10) || 0;
      return numA - numB;
    });

    const newFrames: HTMLImageElement[] = [];
    let loadedCount = 0;

    fileArray.forEach((file, index) => {
      const img = new Image();
      const url = URL.createObjectURL(file);
      img.src = url;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === fileArray.length) {
          setLoadedFramesCount(fileArray.length);
        }
      };
      newFrames[index] = img;
    });

    customFramesRef.current = newFrames;
    setLoadedFramesCount(fileArray.length);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processUploadedFiles(e.dataTransfer.files);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      processUploadedFiles(e.target.files);
    }
  };

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animId: number;
    let dpr = window.devicePixelRatio || 1;

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
    };

    window.addEventListener('resize', resize);
    resize();

    // Persistent Particles for background depth
    const stars: Array<{ x: number; y: number; z: number; size: number; baseAlpha: number }> = [];
    const starCount = 80;
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: (Math.random() - 0.5) * 2000,
        y: (Math.random() - 0.5) * 1200,
        z: Math.random() * 1000 + 100,
        size: Math.random() * 2 + 0.8,
        baseAlpha: Math.random() * 0.7 + 0.2
      });
    }

    const codeSnippets = [
      'const system = new NeuralEngine();',
      'system.compileTopology("40px-grid-sync");',
      'matrix.setAccentColor("#00ff7f");',
      'stream.connectPipeline({ fps: 60 });',
      'weights.verifyCohortQuotas(1200);',
      'academy.dispatch("DEPLOYMENT_SUCCESSFUL");'
    ];

    let lastTime = performance.now();
    let uiUpdateThrottle = 0;

    const render = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;
      animState.current.time += dt;

      // Handle auto-play vs scroll-scrub
      if (isPlayingAuto) {
        animState.current.autoPlayFrame = (animState.current.autoPlayFrame + dt * 30) % 300;
        animState.current.interpolatedFrame = animState.current.autoPlayFrame + 1;
      } else {
        const prevFrame = animState.current.interpolatedFrame;
        animState.current.interpolatedFrame += (animState.current.targetFrame - prevFrame) * 0.12;
        animState.current.velocity = Math.abs(animState.current.interpolatedFrame - prevFrame);
      }

      // Smooth mouse parallax
      animState.current.mouseX += (animState.current.targetMouseX - animState.current.mouseX) * 0.08;
      animState.current.mouseY += (animState.current.targetMouseY - animState.current.mouseY) * 0.08;

      const f = animState.current.interpolatedFrame; // 1..300
      const normProgress = Math.min(1, Math.max(0, (f - 1) / 299)); // 0..1
      const t = animState.current.time;
      const mx = animState.current.mouseX;
      const my = animState.current.mouseY;

      // Throttle React state update for current frame index indicator
      uiUpdateThrottle += dt;
      if (uiUpdateThrottle > 0.1) {
        uiUpdateThrottle = 0;
        setCurrentFrameIndex(Math.round(f));
      }

      const w = window.innerWidth;
      const h = window.innerHeight;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, w, h);

      // Deep dark cybernetic canvas background
      ctx.fillStyle = '#0b0b0d';
      ctx.fillRect(0, 0, w, h);

      // Dynamic electric green & cyan ambient radiance
      const grad = ctx.createRadialGradient(
        w * 0.5 + mx * 50,
        h * 0.35 + my * 40,
        60,
        w * 0.5,
        h * 0.5,
        Math.max(w, h) * 0.85
      );
      grad.addColorStop(0, 'rgba(0, 255, 127, 0.06)');
      grad.addColorStop(0.5, 'rgba(76, 215, 246, 0.03)');
      grad.addColorStop(1, 'rgba(11, 11, 13, 0.95)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // ==========================================
      // 1. STARFIELD PARTICLES (Speed Warp)
      // ==========================================
      const speedStreak = Math.min(animState.current.velocity * 3.5, 30);
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        star.z -= (normProgress * 12 + animState.current.velocity * 10 + 0.4);
        if (star.z < 1) star.z += 1000;

        const k = 400 / star.z;
        const sx = star.x * k + w * 0.5 + mx * 15;
        const sy = star.y * k + h * 0.5 + my * 15;

        if (sx >= -40 && sx <= w + 40 && sy >= -40 && sy <= h + 40) {
          ctx.beginPath();
          ctx.arc(sx, sy, Math.max(0.6, star.size * k), 0, Math.PI * 2);
          ctx.fillStyle = `rgba(224, 224, 230, ${Math.min(0.8, star.baseAlpha * (k * 0.6))})`;
          ctx.fill();

          if (speedStreak > 2) {
            ctx.beginPath();
            ctx.moveTo(sx, sy);
            ctx.lineTo(sx, sy - speedStreak * k * 2);
            ctx.strokeStyle = 'rgba(0, 255, 127, 0.35)';
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // ==========================================
      // 2. 3D TECHNICAL PERSPECTIVE GRID FLOOR
      // ==========================================
      {
        const horizonY = h * 0.68 + my * 20;
        const lineCount = 26;
        const vpX = w * 0.5 + mx * 60;

        // Convergence lines
        ctx.lineWidth = 0.7;
        ctx.strokeStyle = 'rgba(224, 224, 230, 0.06)';

        for (let i = -lineCount / 2; i <= lineCount / 2; i++) {
          const bottomX = vpX + i * (w / 12);
          ctx.beginPath();
          ctx.moveTo(vpX, horizonY);
          ctx.lineTo(bottomX, h);
          ctx.stroke();
        }

        // Horizontal perspective lines scrolling towards camera
        const scrollOffset = (normProgress * 900 + t * 30) % 90;
        for (let d = 0; d < 12; d++) {
          const depthNorm = Math.pow((d * 8 + scrollOffset) / 190, 2);
          const lineY = horizonY + depthNorm * (h - horizonY);
          if (lineY <= h) {
            ctx.beginPath();
            ctx.moveTo(0, lineY);
            ctx.lineTo(w, lineY);
            ctx.strokeStyle = `rgba(0, 255, 127, ${Math.min(0.25, depthNorm * 0.35)})`;
            ctx.stroke();
          }
        }

        // Horizon line
        ctx.beginPath();
        ctx.moveTo(0, horizonY);
        ctx.lineTo(w, horizonY);
        ctx.strokeStyle = 'rgba(0, 255, 127, 0.4)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // ==========================================
      // 3. FRAME SEQUENCER: USER FRAMES OR HIGH-TECH VIRTUAL SCREEN
      // ==========================================
      const frames = customFramesRef.current;
      const hasCustomFrames = frames.length > 0;

      if (hasCustomFrames) {
        // RENDER CUSTOM UPLOADED IMAGE SEQUENCE (e.g. ezgif-frame-001.jpg .. ezgif-frame-300.jpg)
        const frameIdx = Math.min(
          frames.length - 1,
          Math.max(0, Math.floor(((f - 1) / 299) * (frames.length - 1)))
        );
        const img = frames[frameIdx];

        if (img && img.complete && img.naturalWidth > 0) {
          ctx.save();
          // Aspect fill or fit centered with smooth subtle parallax
          const imgAspect = img.naturalWidth / img.naturalHeight;
          const canvasAspect = w / h;
          let drawW = w;
          let drawH = h;
          let offX = 0;
          let offY = 0;

          if (canvasAspect > imgAspect) {
            drawW = w * 1.05;
            drawH = drawW / imgAspect;
            offX = (w - drawW) / 2 + mx * 20;
            offY = (h - drawH) / 2 + my * 20;
          } else {
            drawH = h * 1.05;
            drawW = drawH * imgAspect;
            offX = (w - drawW) / 2 + mx * 20;
            offY = (h - drawH) / 2 + my * 20;
          }

          ctx.globalAlpha = 0.88;
          ctx.drawImage(img, offX, offY, drawW, drawH);

          // Subtle scanline overlay on custom frames for cinematic cohesion
          ctx.globalAlpha = 0.08;
          ctx.fillStyle = '#00ff7f';
          for (let y = 0; y < h; y += 4) {
            ctx.fillRect(0, y, w, 1);
          }
          ctx.restore();
        }
      } else {
        // PROCEDURAL GENERATIVE 300-FRAME SYSTEM (Variation 3 Technical Matrix)
        ctx.save();
        const screenCenterX = w * 0.5 + mx * 40;
        const screenCenterY = h * 0.44 + my * 25;

        const tiltX = Math.sin(normProgress * Math.PI * 1.5) * 0.1 - (my * 0.04);
        const tiltY = Math.cos(normProgress * Math.PI) * 0.12 + (mx * 0.05);
        const screenScale = 0.82 + Math.sin(normProgress * Math.PI) * 0.06;

        const screenW = Math.min(w * 0.75, 880) * screenScale;
        const screenH = screenW * 0.58;

        ctx.translate(screenCenterX, screenCenterY);
        ctx.transform(1, tiltX * 0.25, tiltY * 0.35, 1, 0, 0);

        // Holographic Glass Outer Border & Neon Glow
        ctx.strokeStyle = 'rgba(0, 255, 127, 0.35)';
        ctx.lineWidth = 1.5;
        ctx.strokeRect(-screenW / 2, -screenH / 2, screenW, screenH);

        // Virtual Screen Body
        ctx.fillStyle = 'rgba(11, 11, 13, 0.78)';
        ctx.fillRect(-screenW / 2, -screenH / 2, screenW, screenH);

        // Header Bar
        const headerH = 34;
        ctx.fillStyle = 'rgba(22, 22, 28, 0.9)';
        ctx.fillRect(-screenW / 2, -screenH / 2, screenW, headerH);
        ctx.strokeStyle = 'rgba(224, 224, 230, 0.15)';
        ctx.beginPath();
        ctx.moveTo(-screenW / 2, -screenH / 2 + headerH);
        ctx.lineTo(screenW / 2, -screenH / 2 + headerH);
        ctx.stroke();

        // Status Indicators
        const dotY = -screenH / 2 + headerH / 2;
        const dotStartX = -screenW / 2 + 20;
        ctx.fillStyle = '#00ff7f';
        ctx.beginPath(); ctx.arc(dotStartX, dotY, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#4cd7f6';
        ctx.beginPath(); ctx.arc(dotStartX + 14, dotY, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = '#e0e0e6';
        ctx.beginPath(); ctx.arc(dotStartX + 28, dotY, 4, 0, Math.PI * 2); ctx.fill();

        // Technical Header Telemetry
        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.fillStyle = '#e0e0e6';
        ctx.fillText(`AI_COHORT_SYS // FRAME: [${String(Math.round(f)).padStart(3, '0')}/300]`, dotStartX + 46, dotY + 4);

        ctx.fillStyle = '#00ff7f';
        const statusText = `● SYNC: ${(normProgress * 100).toFixed(0)}%`;
        ctx.fillText(statusText, screenW / 2 - 95, dotY + 4);

        // Clipped Screen Content
        ctx.save();
        ctx.beginPath();
        ctx.rect(-screenW / 2 + 1, -screenH / 2 + headerH + 1, screenW - 2, screenH - headerH - 2);
        ctx.clip();

        const totalVirtualScrollH = screenH * 2.8;
        const internalScrollY = -normProgress * (totalVirtualScrollH - screenH * 0.9);
        ctx.translate(0, internalScrollY);

        // Core Orbital Ring (Stage 1)
        const coreY = -screenH * 0.15;
        const coreRadius = Math.min(screenW * 0.16, 85);

        for (let ring = 1; ring <= 3; ring++) {
          const rRad = coreRadius + ring * 22;
          ctx.beginPath();
          ctx.ellipse(0, coreY, rRad, rRad * 0.45, t * (ring % 2 === 0 ? 0.35 : -0.25) + normProgress, 0, Math.PI * 2);
          ctx.strokeStyle = ring === 1 ? 'rgba(0, 255, 127, 0.45)' : 'rgba(224, 224, 230, 0.15)';
          ctx.lineWidth = 1;
          ctx.stroke();

          const sAngle = t * (ring === 2 ? -0.8 : 0.6) + ring;
          const sx = Math.cos(sAngle) * rRad;
          const sy = coreY + Math.sin(sAngle) * (rRad * 0.45);
          ctx.beginPath();
          ctx.arc(sx, sy, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#00ff7f';
          ctx.fill();
        }

        // Center Sphere
        ctx.beginPath();
        ctx.arc(0, coreY, coreRadius * 0.65, 0, Math.PI * 2);
        const coreGrad = ctx.createRadialGradient(0, coreY, 5, 0, coreY, coreRadius * 0.65);
        coreGrad.addColorStop(0, '#85ffbe');
        coreGrad.addColorStop(0.5, '#00592b');
        coreGrad.addColorStop(1, '#0b0b0d');
        ctx.fillStyle = coreGrad;
        ctx.fill();

        ctx.font = 'bold 12px "Syne", sans-serif';
        ctx.fillStyle = '#ffffff';
        ctx.textAlign = 'center';
        ctx.fillText('TECHNICAL MATRIX', 0, coreY + 4);

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#00ff7f';
        ctx.fillText('NO-CODE INTELLIGENCE CORE', 0, coreY + 18);
        ctx.textAlign = 'left';

        // Stage 1 Cards
        const cardW = screenW * 0.38;
        const cardH = 80;

        ctx.fillStyle = 'rgba(17, 17, 22, 0.7)';
        ctx.strokeStyle = 'rgba(0, 255, 127, 0.25)';
        ctx.lineWidth = 1;
        ctx.fillRect(-screenW / 2 + 25, coreY + 75, cardW, cardH);
        ctx.strokeRect(-screenW / 2 + 25, coreY + 75, cardW, cardH);

        ctx.font = '9px "JetBrains Mono", monospace';
        ctx.fillStyle = '#00ff7f';
        ctx.fillText('// TELEMETRY_STREAM', -screenW / 2 + 35, coreY + 92);
        for (let c = 0; c < 3; c++) {
          const snip = codeSnippets[(c + Math.floor(f / 25)) % codeSnippets.length];
          ctx.fillStyle = c === 0 ? '#e0e0e6' : 'rgba(224, 224, 230, 0.5)';
          ctx.fillText(snip, -screenW / 2 + 35, coreY + 110 + c * 15);
        }

        // Stage 2: Module Pipeline
        const pipeY = coreY + 210;
        ctx.fillStyle = 'rgba(0, 255, 127, 0.08)';
        ctx.fillRect(-screenW / 2 + 25, pipeY, screenW - 50, 26);
        ctx.strokeStyle = 'rgba(0, 255, 127, 0.35)';
        ctx.strokeRect(-screenW / 2 + 25, pipeY, screenW - 50, 26);

        ctx.font = 'bold 11px "JetBrains Mono", monospace';
        ctx.fillStyle = '#00ff7f';
        ctx.fillText('STAGE 2: CURRICULUM PIPELINE & STUDENT WORKFLOW', -screenW / 2 + 35, pipeY + 17);

        // Terminal Matrix
        const termY = pipeY + 130;
        ctx.fillStyle = 'rgba(11, 11, 13, 0.9)';
        ctx.strokeStyle = 'rgba(224, 224, 230, 0.2)';
        ctx.fillRect(-screenW / 2 + 25, termY, screenW - 50, 140);
        ctx.strokeRect(-screenW / 2 + 25, termY, screenW - 50, 140);

        ctx.font = '10px "JetBrains Mono", monospace';
        ctx.fillStyle = '#00ff7f';
        ctx.fillText('academy-terminal:~$ ./verify-cohort-readiness --status=all', -screenW / 2 + 40, termY + 25);
        ctx.fillStyle = '#e0e0e6';
        ctx.fillText('[OK] 6 Core Curriculum Modules Loaded and Verified.', -screenW / 2 + 40, termY + 45);
        ctx.fillText('[OK] 1,200+ Active Students Enrolled in Cohort Hub.', -screenW / 2 + 40, termY + 65);
        ctx.fillText(`>> FRAME_STREAM: [${String(Math.round(f)).padStart(3, '0')}/300] LOCKED TO SCROLL PROGRESS`, -screenW / 2 + 40, termY + 90);
        ctx.fillStyle = '#00ff7f';
        ctx.fillText('● SYSTEM 100% OPERATIONAL // VARIATION 3 READY', -screenW / 2 + 40, termY + 115);

        ctx.restore(); // Restore clip

        // Scanning Laser Bar
        const scanY = -screenH / 2 + headerH + ((f * 3.2 + t * 40) % (screenH - headerH));
        ctx.beginPath();
        ctx.moveTo(-screenW / 2, scanY);
        ctx.lineTo(screenW / 2, scanY);
        const scanGrad = ctx.createLinearGradient(-screenW / 2, 0, screenW / 2, 0);
        scanGrad.addColorStop(0, 'rgba(0, 255, 127, 0)');
        scanGrad.addColorStop(0.5, 'rgba(0, 255, 127, 0.8)');
        scanGrad.addColorStop(1, 'rgba(0, 255, 127, 0)');
        ctx.strokeStyle = scanGrad;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        ctx.restore(); // Restore 3D
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
    };
  }, [isPlayingAuto]);

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none z-0"
        style={{ willChange: 'transform' }}
      />

      {/* Hidden File Input for Custom Frame Upload */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileInput}
        multiple
        accept="image/*"
        className="hidden"
      />

      {/* Drag & Drop Overlay indicator when dragging files */}
      {isDragOver && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          className="fixed inset-0 z-50 bg-[#0b0b0d]/85 backdrop-blur-md flex flex-col items-center justify-center border-4 border-dashed border-[#00ff7f] p-8 text-center"
        >
          <span className="material-symbols-outlined text-6xl text-[#00ff7f] mb-4 animate-bounce">
            upload_file
          </span>
          <h2 className="font-headline text-3xl font-bold text-[#e0e0e6] mb-2">
            DROP 300 ANIMATION FRAMES HERE
          </h2>
          <p className="font-mono text-sm text-[rgba(224,224,230,0.7)] max-w-md">
            Release your ezgif-frame-001.jpg .. ezgif-frame-300.jpg images to sync directly with page scrolling!
          </p>
        </div>
      )}

      {/* Technical Frame Sequencer Floating Control HUD */}
      {showHUD && (
        <div
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          className="fixed bottom-6 left-6 z-40 bg-[#0b0b0d]/95 backdrop-blur-md border border-[rgba(224,224,230,0.15)] rounded px-3 py-2 text-xs font-mono shadow-2xl flex items-center gap-3"
        >
          {/* Status Indicator */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#00ff7f] animate-pulse"></span>
            <span className="text-[rgba(224,224,230,0.6)]">FRAME:</span>
            <span className="text-[#00ff7f] font-bold">
              [{String(currentFrameIndex).padStart(3, '0')}/300]
            </span>
          </div>

          <div className="h-4 w-[1px] bg-[rgba(224,224,230,0.15)]"></div>

          {/* Source Status */}
          {loadedFramesCount > 0 ? (
            <div className="flex items-center gap-1.5 text-[#00ff7f]">
              <span className="material-symbols-outlined text-sm">check_circle</span>
              <span>{loadedFramesCount} FRAMES LOADED</span>
            </div>
          ) : (
            <button
              onClick={() => fileInputRef.current?.click()}
              className="text-[rgba(224,224,230,0.8)] hover:text-[#00ff7f] transition-colors flex items-center gap-1 cursor-pointer"
              title="Click to load custom ezgif-frame-*.jpg files or drop them on screen"
            >
              <span className="material-symbols-outlined text-sm">folder_open</span>
              <span>LOAD 300 FRAMES</span>
            </button>
          )}

          <div className="h-4 w-[1px] bg-[rgba(224,224,230,0.15)]"></div>

          {/* Autoplay / Scrub Toggle */}
          <button
            onClick={() => setIsPlayingAuto(!isPlayingAuto)}
            className={`px-2 py-0.5 rounded text-[0.65rem] border uppercase font-bold transition-all cursor-pointer ${
              isPlayingAuto
                ? 'bg-[#00ff7f] text-[#0b0b0d] border-[#00ff7f]'
                : 'border-[rgba(224,224,230,0.2)] text-[rgba(224,224,230,0.7)] hover:text-[#e0e0e6]'
            }`}
          >
            {isPlayingAuto ? 'PAUSE' : 'AUTOPLAY'}
          </button>

          {/* Minimize button */}
          <button
            onClick={() => setShowHUD(false)}
            className="text-[rgba(224,224,230,0.4)] hover:text-[#e0e0e6] transition-colors cursor-pointer text-sm"
            title="Minimize HUD"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Floating Toggle if HUD is minimized */}
      {!showHUD && (
        <button
          onClick={() => setShowHUD(true)}
          className="fixed bottom-6 left-6 z-40 bg-[#0b0b0d]/90 border border-[rgba(224,224,230,0.2)] px-2.5 py-1.5 rounded text-xs font-mono text-[#00ff7f] flex items-center gap-1.5 cursor-pointer shadow-lg hover:border-[#00ff7f]"
          title="Open Frame HUD"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#00ff7f] animate-pulse"></span>
          <span>FRAME [{String(currentFrameIndex).padStart(3, '0')}]</span>
        </button>
      )}
    </>
  );
};
