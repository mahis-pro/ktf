import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { Upload, Download, RotateCcw, Move, ZoomIn } from 'lucide-react';

export function GetDP() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [name, setName] = useState('');
  const [headshotImg, setHeadshotImg] = useState<HTMLImageElement | null>(null);
  const [logoImg, setLogoImg] = useState<HTMLImageElement | null>(null);
  const [dragActive, setDragActive] = useState(false);
  
  // Photo manipulation controls
  const [scale, setScale] = useState(1);
  const [offsetX, setOffsetX] = useState(0);
  const [offsetY, setOffsetY] = useState(0);

  // Preload logo on mount
  useEffect(() => {
    const img = new Image();
    img.src = '/ktf.png';
    img.crossOrigin = 'anonymous'; // Prevent tainted canvas issues if loaded externally
    img.onload = () => setLogoImg(img);
  }, []);

  // Handle drawing to canvas in real-time
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // 1. CLEAR & FILL PRESTIGE BACKGROUND (#002519 - KTF Forest Green)
    ctx.fillStyle = '#002519';
    ctx.fillRect(0, 0, 1080, 1080);

    // 2. DRAW TECHNICAL MESH GRID ACCENTS
    ctx.strokeStyle = 'rgba(19, 108, 64, 0.12)'; // Subtle secondary green mesh
    ctx.lineWidth = 1;
    const gridSize = 60;
    for (let x = 0; x < 1080; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 1080);
      ctx.stroke();
    }
    for (let y = 0; y < 1080; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(1080, y);
      ctx.stroke();
    }

    // 3. DRAW BORDER FRAMING
    // Outer secondary ring border
    ctx.strokeStyle = 'rgba(19, 108, 64, 0.4)';
    ctx.lineWidth = 2;
    ctx.strokeRect(30, 30, 1020, 1020);

    // Inner thin border
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1;
    ctx.strokeRect(45, 45, 990, 990);

    // 4. DRAW CORNER TECH ACCENTS
    ctx.fillStyle = 'rgba(19, 108, 64, 0.6)';
    // Top-left
    ctx.fillRect(25, 25, 10, 10);
    // Top-right
    ctx.fillRect(1045, 25, 10, 10);
    // Bottom-left
    ctx.fillRect(25, 1045, 10, 10);
    // Bottom-right
    ctx.fillRect(1045, 1045, 10, 10);

    // 5. DRAW TECHNICAL READOUTS
    ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
    ctx.font = 'bold 12px monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'alphabetic';
    ctx.fillText('SYS_LOC: 8.4821° N, 4.6748° E', 60, 75);
    ctx.textAlign = 'right';
    ctx.fillText('SYS_REF: KTF_MEMBER_2026', 1020 - 45, 75);

    // 6. DRAW KTF BRAND LOGO
    if (logoImg) {
      const logoWidth = 150;
      const logoHeight = 46;
      ctx.drawImage(logoImg, 540 - logoWidth / 2, 105, logoWidth, logoHeight);
    }

    // 7. DRAW HEADER TEXT
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';
    ctx.font = 'bold 13px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('KWASU TECH FESTIVAL // KTF 2026', 540, 185);

    // 8. CLIP & DRAW AVATAR (CENTER: X=540, Y=450, RADIUS=190)
    const centerX = 540;
    const centerY = 450;
    const radius = 190;

    // Draw circular frame rings
    // Outer emerald ring
    ctx.strokeStyle = '#136c40';
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 15, 0, Math.PI * 2);
    ctx.stroke();

    // Inner white boundary ring
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, 0, Math.PI * 2);
    ctx.stroke();

    // Mask image inside circular bounds
    ctx.save();
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
    ctx.clip();

    // Fill mask background (fallback in case photo is transparent)
    ctx.fillStyle = '#f3f4f1';
    ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);

    if (headshotImg) {
      const imgW = headshotImg.width;
      const imgH = headshotImg.height;
      
      // Scale cover
      const minRatio = Math.max(radius * 2 / imgW, radius * 2 / imgH);
      const destW = imgW * minRatio * scale;
      const destH = imgH * minRatio * scale;
      
      // Center position offsets
      const destX = centerX - destW / 2 + offsetX;
      const destY = centerY - destH / 2 + offsetY;
      
      ctx.drawImage(headshotImg, destX, destY, destW, destH);
    } else {
      // Tech style vector placeholder
      ctx.fillStyle = '#191c1a';
      ctx.fillRect(centerX - radius, centerY - radius, radius * 2, radius * 2);
      
      ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.beginPath();
      ctx.arc(centerX, centerY + 30, 90, 0, Math.PI * 2);
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(centerX, centerY - 40, 50, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#136c40';
      ctx.font = 'bold 12px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('AWAITING_UPLOAD', centerX, centerY + 130);
    }

    ctx.restore(); // Restore context state

    // 9. DRAW BOTTOM ATTENDEE COPY
    ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
    ctx.font = 'bold 22px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('I WILL BE ATTENDING', 540, 715);

    // 10. DRAW USER NAME IN BOLD FIGTREE SANS
    ctx.fillStyle = '#ffffff';
    ctx.font = '900 68px "Figtree", sans-serif';
    ctx.textBaseline = 'alphabetic';
    
    const formattedName = name.trim().toUpperCase() || 'YOUR NAME HERE';
    // Dynamically size name string to avoid container clipping
    if (formattedName.length > 20) {
      ctx.font = '900 52px "Figtree", sans-serif';
    }
    if (formattedName.length > 25) {
      ctx.font = '900 42px "Figtree", sans-serif';
    }
    ctx.fillText(formattedName, 540, 790);

    // 11. DRAW SOLID DATE CAPSULE BOX
    const capW = 540;
    const capH = 64;
    const capX = 540 - capW / 2;
    const capY = 840;
    
    ctx.fillStyle = '#136c40';
    ctx.fillRect(capX, capY, capW, capH);
    
    // Thin interior gold accent outline
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;
    ctx.strokeRect(capX + 4, capY + 4, capW - 8, capH - 8);

    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 20px monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('JOIN ME ON 20TH JUNE 2026', 540, capY + 32);

    // 12. DRAW TECHNICAL ACCENT READOUTS
    ctx.fillStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.font = '12px monospace';
    ctx.textAlign = 'left';
    ctx.fillText('KTF_CORE_REVISION: v2.6 // STATUS: ATTENDEE_VERIFIED', 60, 1010);

    // Draw tech ecosystem barcode
    const barcodeX = 860;
    const barcodeY = 985;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
    const barLines = [2, 4, 1, 6, 2, 8, 3, 2, 4, 1, 6, 3, 2, 8, 1, 4];
    let currBarX = barcodeX;
    
    for (let i = 0; i < barLines.length; i++) {
      ctx.lineWidth = barLines[i];
      ctx.beginPath();
      ctx.moveTo(currBarX, barcodeY);
      ctx.lineTo(currBarX, barcodeY + 28);
      ctx.stroke();
      currBarX += barLines[i] + 2;
    }

  }, [name, headshotImg, logoImg, scale, offsetX, offsetY]);

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
