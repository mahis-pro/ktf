import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Upload, Download, RotateCcw, Move, ZoomIn } from 'lucide-react';

export function GetDP() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [name, setName] = useState('');
  const [headshotImg, setHeadshotImg] = useState<HTMLImageElement | null>(null);
  const [templateImg, setTemplateImg] = useState<HTMLImageElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  // Photo manipulation controls
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  const [activePlatformToast, setActivePlatformToast] = useState<string | null>(null);

  const shareText = `No dodoyo • No dulling.

Grab your ticket to a wonderful tech experience where creativity, innovation, competition, networking, and fun all come together in one place.

From simulations to creative battles, innovation showcases, and interactive experiences, "TECH IN MOTION" is bringing a different energy to Malete.

It is about to go down

20th June 2026.

Secure your spot now: kwasutechfestival.com.ng

I wont be missing this so you should not 

#KWASUTechFestival #TechInMotion #MaleteTechForum`;


  const handleNativeShare = async () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Proactively copy the caption to clipboard so that if the platform (like Instagram) blocks pre-filled text, the user has it ready to paste!
    try {
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        await navigator.clipboard.writeText(shareText);
        setActivePlatformToast("Campaign caption auto-copied! Paste it when sharing.");
        setTimeout(() => setActivePlatformToast(null), 4000);
      }
    } catch (clipboardErr) {
      console.log("Clipboard write failed", clipboardErr);
    }

    try {
      canvas.toBlob(async (blob) => {
        if (!blob) {
          setActivePlatformToast("Failed to prepare flyer image for sharing.");
          setTimeout(() => setActivePlatformToast(null), 3000);
          return;
        }

        const formattedName = name.trim().toLowerCase().replace(/\s+/g, '-') || 'attendee';
        const fileName = `ktf-attendee-flyer-${formattedName}.png`;
        const file = new File([blob], fileName, { type: 'image/png' });

        if (typeof navigator.share === 'function' && typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] })) {
          try {
            await navigator.share({
              files: [file],
              text: shareText,
              title: 'KWASU Tech Festival Attendee'
            });
          } catch (shareErr) {
            console.log("Share failed or cancelled", shareErr);
          }
        } else {
          // Fallback
          navigator.clipboard.writeText(shareText);
          setActivePlatformToast("Direct image sharing is not supported by your browser. Caption has been copied and flyer is ready!");
          setTimeout(() => setActivePlatformToast(null), 4000);
        }
      }, 'image/png');
    } catch (err) {
      console.error("Web share failed", err);
    }
  };

  // Preload template on mount
  useEffect(() => {
    const img = new Image();
    img.src = '/campaign dp flyer.jpg';
    img.crossOrigin = 'anonymous'; // Prevent tainted canvas issues if loaded externally
    img.onload = () => setTemplateImg(img);
  }, []);

  // Handle drawing to canvas in real-time
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Helper to draw rounded rectangles
    const drawRoundRect = (
      c: CanvasRenderingContext2D,
      x: number,
      y: number,
      width: number,
      height: number,
      radius: number,
      fill = false,
      stroke = false
    ) => {
      c.beginPath();
      c.moveTo(x + radius, y);
      c.lineTo(x + width - radius, y);
      c.quadraticCurveTo(x + width, y, x + width, y + radius);
      c.lineTo(x + width, y + height - radius);
      c.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
      c.lineTo(x + radius, y + height);
      c.quadraticCurveTo(x, y + height, x, y + height - radius);
      c.lineTo(x, y + radius);
      c.quadraticCurveTo(x, y, x + radius, y);
      c.closePath();
      if (fill) c.fill();
      if (stroke) c.stroke();
    };

    // 1. RENDER STATIC ORIGINAL FLYER TEMPLATE BACKGROUND
    if (templateImg) {
      ctx.drawImage(templateImg, 0, 0, 1280, 1280);
    } else {
      // Fallback elegant green gradient while loading
      const bgGrad = ctx.createLinearGradient(0, 0, 1280, 1280);
      bgGrad.addColorStop(0, '#009732');
      bgGrad.addColorStop(1, '#003a10');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1280, 1280);
    }

    // 2. DRAW ROUNDED SQUARE IMAGE FRAME (LEFT SIDE: X=96, Y=328, W=480, H=480)
    const frameX = 96;
    const frameY = 328;
    const frameW = 480;
    const frameH = 480;
    const frameRadius = 42;

    ctx.save();
    ctx.fillStyle = '#ffffff';
    drawRoundRect(ctx, frameX, frameY, frameW, frameH, frameRadius, true, false);
    ctx.clip();

    if (headshotImg) {
      const imgW = headshotImg.width;
      const imgH = headshotImg.height;
      const minRatio = Math.max(frameW / imgW, frameH / imgH);
      const destW = imgW * minRatio * scale;
      const destH = imgH * minRatio * scale;
      
      const destX = frameX + frameW / 2 - destW / 2 + offsetX;
      const destY = frameY + frameH / 2 - destH / 2 + offsetY;
      ctx.drawImage(headshotImg, destX, destY, destW, destH);
    } else {
      // Vector placeholder
      ctx.fillStyle = '#002519';
      ctx.fillRect(frameX, frameY, frameW, frameH);

      ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
      ctx.beginPath();
      ctx.arc(frameX + frameW/2, frameY + frameH/2 + 35, 105, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(frameX + frameW/2, frameY + frameH/2 - 45, 60, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#2dfc53';
      ctx.font = 'bold 14px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AWAITING_UPLOAD', frameX + frameW/2, frameY + frameH/2 + 150);
    }
    ctx.restore();

    // 3. DRAW DYNAMIC NAME ON TOP OF THE TEMPLATE'S WHITE NAMEPLATE (X=120, Y=824, W=460, H=79)
    const nameX = 120;
    const nameY = 824;
    const nameW = 460;
    const nameH = 79;

    ctx.fillStyle = '#003a10'; // Deep green text matching brand color exactly
    ctx.font = '900 28px "Figtree", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let displayName = name.trim().toUpperCase() || 'YOUR NAME';
    if (displayName.length > 15) {
      ctx.font = '900 24px "Figtree", sans-serif';
    }
    if (displayName.length > 20) {
      ctx.font = '900 20px "Figtree", sans-serif';
    }
    ctx.fillText(displayName, nameX + nameW / 2, nameY + nameH / 2);

  }, [name, headshotImg, templateImg, scale, offsetX, offsetY]);

  // Handle Drag & Drop Files
  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    if (!file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        setHeadshotImg(img);
        setScale(1);
        setOffsetX(0);
        setOffsetY(0);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  // Reset controls
  const handleResetControls = () => {
    setScale(1);
    setOffsetX(0);
    setOffsetY(0);
  };

  // Trigger high-res canvas PNG download
  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Export high-res PNG file
    const dataUrl = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    const formattedName = name.trim().toLowerCase().replace(/\s+/g, '-') || 'attendee';
    link.download = `ktf-attendee-flyer-${formattedName}.png`;
    link.href = dataUrl;
    link.click();
  };

  return (
    <main className="bg-background min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="mb-16 text-center max-w-2xl mx-auto">
          <h1 className="text-4xl sm:text-6xl font-display font-medium tracking-tight text-primary uppercase leading-tight mb-6">
            Share With <br />
            <span className="text-secondary italic">Your Tribe.</span>
          </h1>
          <p className="text-on-surface-variant text-lg font-light leading-relaxed">
            Generate your personalized, high-resolution attendee flyer. Share your credentials and join the ecosystem on 20th June 2026.
          </p>
        </div>

        {/* Dynamic Generator Grid */}
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          
          {/* CONTROL INTERFACE PANEL */}
          <div className="lg:col-span-5 bg-surface border border-outline-variant/30 p-8 sm:p-10 rounded-none shadow-sm space-y-10">
            
            {/* Step 1: Input Name */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/80 block">
                Step 1: Your Name
              </label>
              <p className="text-[11px] text-on-surface-variant/60 font-light -mt-2">
                Enter your name exactly as you want it displayed on the flyer.
              </p>
              <input
                type="text"
                maxLength={30}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="EX: VICTORIA OBI"
                className="w-full bg-surface-container-low border border-outline-variant/30 p-5 focus:ring-1 focus:ring-primary focus:border-primary outline-none text-primary font-bold transition-all rounded-none uppercase text-sm"
              />
            </div>

            {/* Step 2: Upload Headshot */}
            <div className="space-y-4">
              <label className="text-xs font-bold uppercase tracking-widest text-primary/80 block">
                Step 2: Upload Headshot
              </label>
              
              <div 
                onDragEnter={handleDrag} 
                onDragOver={handleDrag} 
                onDragLeave={handleDrag} 
                onDrop={handleDrop}
                className={`relative border-2 border-dashed p-8 text-center transition-colors flex flex-col items-center justify-center min-h-[180px] cursor-pointer ${
                  dragActive 
                    ? 'border-primary bg-primary/5' 
                    : 'border-outline-variant/30 bg-surface-container-low hover:border-outline-variant/60'
                }`}
                onClick={() => document.getElementById('file-upload')?.click()}
              >
                <input
                  id="file-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
                
                <Upload size={36} className="text-primary/40 mb-4 group-hover:text-primary transition-colors" />
                <span className="text-sm font-bold uppercase tracking-wider text-primary mb-1">
                  {headshotImg ? 'Replace Headshot' : 'Upload Headshot'}
                </span>
                <span className="text-xs text-on-surface-variant/60 font-light">
                  Drag and drop or click to browse
                </span>
              </div>
            </div>

            {/* Step 3: Photo Adjustments (Only visible when image loaded) */}
            <AnimatePresence>
              {headshotImg && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden space-y-6 pt-2 border-t border-outline-variant/20"
                >
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold uppercase tracking-widest text-primary/80 flex items-center gap-2">
                      Step 3: Adjust Photo Position
                    </label>
                    <button 
                      onClick={handleResetControls} 
                      className="text-[10px] uppercase font-bold tracking-widest text-red-600 hover:text-red-700 transition-colors flex items-center gap-1.5"
                    >
                      <RotateCcw size={10} /> Reset
                    </button>
                  </div>

                  {/* Zoom Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-on-surface-variant/80">
                      <span className="flex items-center gap-1.5"><ZoomIn size={12} /> Scale / Zoom</span>
                      <span>{scale.toFixed(2)}x</span>
                    </div>
                    <input
                      type="range"
                      min="0.5"
                      max="3.0"
                      step="0.05"
                      value={scale}
                      onChange={(e) => setScale(parseFloat(e.target.value))}
                      className="w-full h-1 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Offset X Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-on-surface-variant/80">
                      <span className="flex items-center gap-1.5"><Move size={12} /> Horizontal Position (X)</span>
                      <span>{offsetX}px</span>
                    </div>
                    <input
                      type="range"
                      min="-300"
                      max="300"
                      step="1"
                      value={offsetX}
                      onChange={(e) => setOffsetX(parseInt(e.target.value))}
                      className="w-full h-1 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>

                  {/* Offset Y Slider */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs font-mono text-on-surface-variant/80">
                      <span className="flex items-center gap-1.5"><Move size={12} /> Vertical Position (Y)</span>
                      <span>{offsetY}px</span>
                    </div>
                    <input
                      type="range"
                      min="-300"
                      max="300"
                      step="1"
                      value={offsetY}
                      onChange={(e) => setOffsetY(parseInt(e.target.value))}
                      className="w-full h-1 bg-outline-variant/30 rounded-lg appearance-none cursor-pointer accent-primary"
                    />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Step 4: Download */}
            <div className="pt-4">
              <Button
                onClick={handleDownload}
                size="lg"
                disabled={!headshotImg}
                className="w-full h-16 uppercase tracking-[0.2em] font-bold text-xs flex items-center justify-center gap-3 rounded-none shadow-lg shadow-primary/10 transition-transform active:scale-95"
              >
                <Download size={16} /> Generate & Download PNG
              </Button>
              {!headshotImg && (
                <p className="text-[10px] text-center text-red-600 font-mono uppercase mt-3 tracking-wider animate-pulse">
                  * Please upload a headshot to generate download *
                </p>
              )}
            </div>

          </div>

          {/* DYNAMIC CANVAS PREVIEW */}
          <div className="lg:col-span-7 flex flex-col items-center justify-center">
            
            {/* Canvas Outer Wrapper */}
            <div className="w-full max-w-[540px] bg-[#002519] border border-outline-variant/40 shadow-2xl relative depth-plate">
              
              {/* Aspect Ratio Box to keep Canvas scaling clean */}
              <div className="relative w-full pb-[100%] overflow-hidden bg-[#002519]">
                <canvas
                  ref={canvasRef}
                  width={1280}
                  height={1280}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

            </div>

            {/* Design Specifications Sub-text */}
            <div className="w-full max-w-[540px] mt-6 flex justify-between items-center text-[10px] font-mono text-on-surface-variant/50 uppercase tracking-widest px-1">
              <span>OUTPUT_FORMAT: PNG // 1280X1280</span>
              <span>RENDER: FULL_CLIENT_SIDE</span>
            </div>

          </div>

          {/* SPREAD THE WORD PANEL */}
          <div className="lg:col-span-12 mt-12 bg-surface border border-outline-variant/30 p-8 sm:p-12 rounded-none shadow-sm space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-outline-variant/20">
              <div>
                <h3 className="text-xl font-display font-medium text-primary uppercase tracking-wider">
                  Invite Your Tribe: Spread the Word
                </h3>
                <p className="text-xs text-on-surface-variant/60 font-light mt-1 uppercase tracking-widest">
                  Step 5: Share flyer & caption directly
                </p>
              </div>
              <Button
                onClick={handleNativeShare}
                size="lg"
                disabled={!headshotImg}
                className="w-full md:w-auto h-16 uppercase tracking-[0.2em] font-bold text-xs flex items-center justify-center gap-3 rounded-none shadow-lg shadow-primary/10 transition-all"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 10.742l5.084-2.542m0 5.6l-5.08 2.545m9.88-5.6a3 3 0 11-6 0 3 3 0 016 0zm-10.74 5.6a3 3 0 11-6 0 3 3 0 016 0zm.74-11.2a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Share Flyer & Text
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 pt-6 border-t border-outline-variant/10">
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-widest text-primary/60">
                  Supported Platforms
                </h4>
                <p className="text-[10px] text-on-surface-variant/40 font-mono mt-1 uppercase">
                  Natively shares high-res flyer & campaign caption
                </p>
              </div>

              {/* GORGEOUS PREMIUM VISUAL PLATFORM STRIP */}
              <div className="flex items-center gap-3 self-start sm:self-center">
                
                {/* WhatsApp */}
                <div className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant/40 hover:text-[#25D366] hover:border-[#25D366]/40 hover:bg-[#25D366]/5 transition-all duration-300 cursor-help group relative">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.713-1.458L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966C16.59 1.977 14.113.953 11.487.953c-5.447 0-9.875 4.379-9.879 9.808-.002 1.718.455 3.39 1.325 4.887L1.879 21.65l6.002-1.566z"/>
                  </svg>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-outline-variant/30 text-[9px] font-mono tracking-wider px-2 py-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-primary">WHATSAPP</span>
                </div>

                {/* X */}
                <div className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant/40 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-help group relative">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-outline-variant/30 text-[9px] font-mono tracking-wider px-2 py-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-primary">X / TWITTER</span>
                </div>

                {/* LinkedIn */}
                <div className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant/40 hover:text-[#0077B5] hover:border-[#0077B5]/40 hover:bg-[#0077B5]/5 transition-all duration-300 cursor-help group relative">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0z"/>
                  </svg>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-outline-variant/30 text-[9px] font-mono tracking-wider px-2 py-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-primary">LINKEDIN</span>
                </div>

                {/* Instagram */}
                <div className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant/40 hover:text-[#E1306C] hover:border-[#E1306C]/40 hover:bg-[#E1306C]/5 transition-all duration-300 cursor-help group relative">
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                  </svg>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-outline-variant/30 text-[9px] font-mono tracking-wider px-2 py-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-primary">INSTAGRAM</span>
                </div>

                {/* TikTok */}
                <div className="w-10 h-10 rounded-full border border-outline-variant/30 flex items-center justify-center text-on-surface-variant/40 hover:text-primary hover:border-primary/40 hover:bg-primary/5 transition-all duration-300 cursor-help group relative">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.86-.6-4.06-1.4-.07 2.42-.02 4.88-.04 7.29-.06 1.83-.55 3.73-1.74 5.12-1.76 2.18-4.75 3.09-7.44 2.53-2.6-.45-4.85-2.28-5.74-4.76-.94-2.5-.54-5.51 1.05-7.61 1.49-2 4.02-3.03 6.52-2.73v4.11c-1.39-.23-2.91.18-3.77 1.28-.96 1.16-.94 2.96-.02 4.12.82 1.07 2.37 1.46 3.65 1.01 1.03-.32 1.77-1.25 1.94-2.31.13-1.68.05-3.37.07-5.06V.02z"/>
                  </svg>
                  <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-surface border border-outline-variant/30 text-[9px] font-mono tracking-wider px-2 py-0.5 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-primary">TIKTOK</span>
                </div>

              </div>
            </div>

            {/* Premium Interactive Toast Feedback */}
            <AnimatePresence>
              {activePlatformToast && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="p-4 bg-secondary/10 border border-secondary/30 text-secondary text-xs uppercase tracking-wider font-bold text-center"
                >
                  🚀 {activePlatformToast}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>

      </div>
    </main>
  );
}
