import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin, ArrowRight } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-[#050505] text-white border-t border-white/5 pt-20 pb-10">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* TOP SECTION: BRAND & NEWSLETTER */}
        <div className="flex flex-col lg:flex-row justify-between gap-12 mb-20">
          <div className="max-w-md">
            <h4 className="text-2xl font-bold tracking-[0.3em] uppercase mb-6">
              F<span className="text-[#D4AF37]">I</span>NESET
            </h4>
            <p className="text-zinc-500 text-sm leading-relaxed mb-8">
              Redefining luxury horology for the modern connoisseur. 
              Our master-crafted timepieces represent the pinnacle of 
              mechanical sophistication and timeless design.
            </p>
            <div className="flex space-x-5">
              {[Instagram, Twitter, Facebook, Linkedin].map((Icon, i) => (
                <a key={i} href="#" className="text-zinc-500 hover:text-[#D4AF37] transition-colors duration-300">
                  <Icon size={20} strokeWidth={1.5} />
                </a>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/3">
            <h5 className="text-[10px] tracking-[0.4em] uppercase text-[#D4AF37] mb-6">Newsletter</h5>
            <p className="text-zinc-400 text-sm mb-6 font-light">Join the inner circle for exclusive previews and heritage stories.</p>
            <div className="relative flex items-center border-b border-white/10 pb-2 group focus-within:border-[#D4AF37] transition-all duration-500">
              <input 
                type="email" 
                placeholder="EMAIL ADDRESS" 
                className="bg-transparent w-full text-xs tracking-widest outline-none placeholder:text-zinc-700"
              />
              <button className="text-zinc-500 group-hover:text-[#D4AF37] transition-colors">
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* MIDDLE SECTION: LINKS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12 border-b border-white/5 pb-20">
          <div>
            <h5 className="text-[10px] tracking-[0.3em] uppercase text-white mb-8">Collections</h5>
            <ul className="space-y-4 text-xs tracking-widest text-zinc-500 font-light">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">The Gold Standard</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Limited Edition</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Mechanical Series</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] tracking-[0.3em] uppercase text-white mb-8">Client Care</h5>
            <ul className="space-y-4 text-xs tracking-widest text-zinc-500 font-light">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Contact Concierge</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Warranty & Repairs</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Size Guide</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] tracking-[0.3em] uppercase text-white mb-8">The House</h5>
            <ul className="space-y-4 text-xs tracking-widest text-zinc-500 font-light">
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Our Philosophy</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Craftsmanship</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Sustainability</a></li>
              <li><a href="#" className="hover:text-[#D4AF37] transition-colors">Careers</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-[10px] tracking-[0.3em] uppercase text-white mb-8">Payment</h5>
            <div className="flex flex-wrap gap-4 text-zinc-600 grayscale opacity-50">
                <span className="text-[10px] border border-zinc-800 px-2 py-1">VISA</span>
                <span className="text-[10px] border border-zinc-800 px-2 py-1">AMEX</span>
                <span className="text-[10px] border border-zinc-800 px-2 py-1">PAYPAL</span>
                <span className="text-[10px] border border-zinc-800 px-2 py-1">APPLE PAY</span>
            </div>
          </div>
        </div>

        {/* BOTTOM SECTION: COPYRIGHT */}
        <div className="pt-10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-[9px] tracking-[0.3em] uppercase text-zinc-600">
            © 2026 Fineset. ALL RIGHTS RESERVED.
          </p>
          <div className="flex gap-8 text-[9px] tracking-[0.3em] uppercase text-zinc-600">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;