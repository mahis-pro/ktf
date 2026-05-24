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
      ctx.drawImage(templateImg, 0, 0, 1080, 1080);
    } else {
      // Fallback elegant green gradient while loading
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
      bgGrad.addColorStop(0, '#009732');
      bgGrad.addColorStop(1, '#003a10');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1080);
    }

    // 2. DRAW ROUNDED SQUARE IMAGE FRAME (LEFT SIDE: X=80, Y=276, W=408, H=408)
    const frameX = 80;
    const frameY = 276;
    const frameW = 408;
    const frameH = 408;
    const frameRadius = 36;

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
      ctx.arc(frameX + frameW/2, frameY + frameH/2 + 30, 90, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(frameX + frameW/2, frameY + frameH/2 - 40, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#2dfc53';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AWAITING_UPLOAD', frameX + frameW/2, frameY + frameH/2 + 130);
    }
    ctx.restore();

    // 3. DRAW DYNAMIC NAME ON TOP OF THE TEMPLATE'S WHITE NAMEPLATE (X=80, Y=702, W=408, H=72)
    const nameX = 80;
    const nameY = 702;
    const nameW = 408;
    const nameH = 72;

    ctx.fillStyle = '#003a10'; // Deep green text matching brand color exactly
    ctx.font = '900 24px "Figtree", sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    let displayName = name.trim().toUpperCase() || 'YOUR NAME';
    if (displayName.length > 15) {
      ctx.font = '900 20px "Figtree", sans-serif';
    }
    if (displayName.length > 20) {
      ctx.font = '900 16px "Figtree", sans-serif';
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
            Campaign <br />
            <span className="text-secondary italic">DP Generator.</span>
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
                  width={1080}
                  height={1080}
                  className="absolute inset-0 w-full h-full object-contain"
                />
              </div>

            </div>

            {/* Design Specifications Sub-text */}
            <div className="w-full max-w-[540px] mt-6 flex justify-between items-center text-[10px] font-mono text-on-surface-variant/50 uppercase tracking-widest px-1">
              <span>OUTPUT_FORMAT: PNG // 1080X1080</span>
              <span>RENDER: FULL_CLIENT_SIDE</span>
            </div>

          </div>

        </div>

      </div>
    </main>
  );
}
