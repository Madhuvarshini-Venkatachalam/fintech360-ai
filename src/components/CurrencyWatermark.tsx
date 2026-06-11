import React from 'react';

export default function CurrencyWatermark() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 select-none">
      {/* ₹500 Note - Olive/Green/Lavender Luxury Watermark */}
      <div 
        className="absolute top-[8%] -left-[100px] w-[500px] h-[220px] rounded-2xl opacity-[0.06] border-[2px] border-dashed border-purple-400 p-4 rotate-[-12deg] blur-[1px] hidden md:block"
        style={{
          background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.08) 0%, rgba(249, 168, 212, 0.02) 100%)',
          boxShadow: '0 0 45px rgba(168, 85, 247, 0.04)'
        }}
      >
        <div className="w-full h-full border border-purple-300 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="text-[10px] font-mono tracking-widest text-purple-600 font-bold">RESERVE BANK OF INDIA</div>
            <div className="text-[10px] font-serif text-purple-500 font-medium">भारतीय रिज़र्व बैंक</div>
          </div>
          <div className="absolute right-6 top-8 text-3xl font-serif text-purple-500 font-extrabold opacity-40">₹५००</div>
          
          {/* Subtle Mahatma Gandhi shadow profile watermark */}
          <div className="absolute left-[20%] top-[15%] w-20 h-28 border border-purple-500/10 rounded-full flex items-center justify-center text-[10px] text-purple-500/20 font-serif rotate-[15deg]">
            Gandhi Watermark
          </div>

          <div className="text-[12px] text-purple-500 font-extrabold tracking-wider opacity-35">MUTUAL NBFC CO.</div>
          
          <div className="flex justify-between items-end">
            <div className="text-5xl font-black tracking-tight text-purple-700">₹500</div>
            <div className="text-[9px] text-right font-mono text-purple-600 leading-tight">
              FIVE HUNDRED RUPEES<br/>
              FINTECH360 CORPORATE SECURE
            </div>
          </div>
          
          {/* Holographic Security Thread */}
          <div className="absolute left-[38%] top-0 bottom-0 w-2 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 opacity-20 border-dashed border-l border-r border-purple-300"></div>
        </div>
      </div>

      {/* ₹200 Note - Orange/Pink/Gold Pastel Luxury Watermark */}
      <div 
        className="absolute top-[42%] -right-[120px] w-[460px] h-[200px] rounded-2xl opacity-[0.05] border-[2px] border-dashed border-pink-400 p-4 rotate-[15deg] blur-[1px] hidden md:block"
        style={{
          background: 'linear-gradient(135deg, rgba(249, 168, 212, 0.08) 0%, rgba(253, 224, 71, 0.02) 100%)',
          boxShadow: '0 0 35px rgba(249, 168, 212, 0.04)'
        }}
      >
        <div className="w-full h-full border border-pink-300 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="text-[9px] font-mono tracking-widest text-pink-600 font-bold">RESERVE BANK OF INDIA</div>
            <div className="text-[9px] font-serif text-pink-500 font-medium font-bold">भारतीय रिज़र्व बैंक</div>
          </div>
          <div className="absolute right-6 top-8 text-2xl font-serif text-pink-500 font-extrabold opacity-40">₹२००</div>
          <div className="text-[11px] text-pink-500 font-extrabold tracking-wider opacity-35">SOCIETY RESERVE TRUST</div>
          <div className="flex justify-between items-end">
            <div className="text-4xl font-black tracking-tight text-pink-700">₹200</div>
            <div className="text-[8px] text-right font-mono text-pink-600 leading-tight">
              TWO HUNDRED RUPEES<br/>
              SAAS PLATFORM NODE
            </div>
          </div>
          <div className="absolute left-[35%] top-0 bottom-0 w-1.5 bg-pink-400 opacity-20"></div>
        </div>
      </div>

      {/* ₹100 Note - Purple/Lavender/Blue Premium Watermark */}
      <div 
        className="absolute bottom-[8%] -left-[80px] w-[420px] h-[190px] rounded-2xl opacity-[0.06] border-[2px] border-dashed border-purple-300 p-4 rotate-[-8deg] blur-[0.5px] hidden md:block"
        style={{
          background: 'linear-gradient(135deg, rgba(233, 213, 255, 0.08) 0%, rgba(249, 168, 214, 0.04) 100%)',
        }}
      >
        <div className="w-full h-full border border-purple-200 rounded-lg p-3 flex flex-col justify-between relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div className="text-[9px] font-mono tracking-widest text-purple-600 font-bold">RESERVE BANK OF INDIA</div>
            <div className="text-[9px] font-serif text-purple-500 font-bold">भारतीय रिज़र्व बैंक</div>
          </div>
          <div className="absolute right-6 top-6 text-xl font-serif text-purple-400 font-extrabold opacity-40">₹१००</div>
          <div className="text-[10px] text-purple-400 font-extrabold tracking-wider opacity-30">TREASURY DIVISION</div>
          <div className="flex justify-between items-end">
            <div className="text-4xl font-extrabold tracking-tight text-purple-600">₹100</div>
            <div className="text-[8px] text-right font-mono text-purple-500 leading-tight">
              ONE HUNDRED RUPEES<br/>
              TRUSTED FIDUCIARY SHIELD
            </div>
          </div>
          <div className="absolute left-[42%] top-0 bottom-0 w-1 bg-purple-300 opacity-20"></div>
        </div>
      </div>

      {/* Floating Rupees icons for premium 3D look */}
      <div className="absolute top-[22%] left-[15%] text-7xl font-semibold opacity-[0.04] text-purple-400 animate-pulse">₹</div>
      <div className="absolute top-[68%] right-[22%] text-8xl font-black opacity-[0.045] text-pink-400">₹</div>
      <div className="absolute bottom-[28%] left-[10%] text-6xl font-bold opacity-[0.035] text-purple-300">₹</div>
      <div className="absolute top-[82%] left-[45%] text-9xl font-extrabold opacity-[0.025] text-purple-400">₹</div>
    </div>
  );
}
