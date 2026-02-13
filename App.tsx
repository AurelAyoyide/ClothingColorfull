
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ArrowRight, ArrowDown, Palette } from 'lucide-react';
import { PRODUCTS, WHATSAPP_NUMBER } from './constants';
import { Product, CartItem, Color, Size } from './types';

// ================================
// Composant Image Colorisée
// Technique: Fond coloré + overlay blend-mode
// La couleur s'applique par-dessus l'image du vêtement
// ================================
const ColorizedImage: React.FC<{
  src: string;
  color: Color;
  className?: string;
}> = ({ src, color, className = '' }) => {
  return (
    <div className={`relative overflow-hidden transition-colors duration-700 ease-out ${className}`}>
      {/* Fond coloré */}
      <div 
        className="absolute inset-0 z-10"
        style={{ backgroundColor: color.hex, mixBlendMode: 'multiply' }}
      />
      
      {/* Image du vêtement - grayscale pour mieux prendre la couleur */}
      <img
        src={src}
        alt=""
        className="w-full h-full object-cover relative z-0"
        style={{ 
          filter: 'grayscale(100%) brightness(1.1) contrast(1.05)',
          mixBlendMode: 'screen'
        }}
        loading="lazy"
      />
    </div>
  );
};

// ================================
// Navbar
// ================================
const Navbar: React.FC<{ cartCount: number; onOpenCart: () => void }> = ({ cartCount, onOpenCart }) => (
  <nav className="fixed top-0 left-0 w-full z-[60] flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-16 py-4 sm:py-6 md:py-8 pointer-events-none">
    <div className="pointer-events-auto">
      <h1 className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif tracking-[0.12em] sm:tracking-[0.15em] md:tracking-[0.2em] uppercase cursor-pointer group transition-all">
        Clothing<span className="italic font-light group-hover:text-[#CFC7B8] transition-colors">Colorfull</span>
      </h1>
    </div>
    <div className="flex items-center gap-4 sm:gap-8 md:gap-12 pointer-events-auto">
      <button
        onClick={onOpenCart}
        className="flex items-center gap-2 sm:gap-3 group relative min-h-[44px] min-w-[44px] justify-end"
      >
        <div className="hidden sm:flex flex-col items-end">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#9A9AA0] group-hover:text-[#CFC7B8] transition-colors leading-none">Panier</span>
          <span className="text-xs font-mono text-[#F5F5F5]">{cartCount.toString().padStart(2, '0')}</span>
        </div>
        <div className="relative">
          <ShoppingBag size={20} className="text-[#F5F5F5] group-hover:scale-110 transition-transform" />
          {cartCount > 0 && (
            <span className="absolute -top-1.5 -right-1.5 w-5 h-5 sm:w-2 sm:h-2 bg-[#CFC7B8] rounded-full flex sm:block items-center justify-center">
              <span className="text-[8px] font-mono font-bold text-black sm:hidden">{cartCount}</span>
            </span>
          )}
        </div>
      </button>
    </div>
  </nav>
);

// ================================
// Hero Section
// ================================
const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative min-h-[100svh] w-full flex items-center justify-center overflow-hidden px-4 sm:px-6 md:px-12 lg:px-16 pt-20 sm:pt-0">
      <div className="spotlight" />

      <div className="relative z-10 w-full max-w-screen-2xl grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 md:gap-12 items-center">
        {/* Left Editorial Text */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
            className="w-full"
          >
            <span className="text-[9px] sm:text-[10px] md:text-xs font-mono uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#CFC7B8] mb-4 sm:mb-6 md:mb-8 block">
              Manifesto • Colorfull 001
            </span>
            <h2 style={{ fontSize: 'clamp(2.8rem, 8vw, 9rem)' }} className="font-serif leading-[0.85] mb-6 sm:mb-8 md:mb-10 tracking-tight">
              The Quiet <br />
              <span className="italic font-light ml-4 sm:ml-8 md:ml-16">Uniform.</span>
            </h2>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8 mt-2 sm:mt-4">
              <motion.div
                className="h-[1px] w-16 sm:w-24 bg-[#6E6E73]"
                initial={{ width: 0 }}
                animate={{ width: 96 }}
                transition={{ delay: 0.5, duration: 1 }}
              />
              <p className="text-xs sm:text-sm md:text-base text-[#9A9AA0] font-light max-w-sm leading-relaxed uppercase tracking-wider">
                Choisis ta coupe. Choisis ta couleur.
                Le reste, on s'en occupe.
              </p>
            </div>

            {/* Color pills teaser */}
            <motion.div
              className="flex flex-wrap items-center gap-3 mt-8 sm:mt-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.8 }}
            >
              <Palette size={14} className="text-[#6E6E73]" />
              <span className="text-[9px] font-mono uppercase tracking-[0.3em] text-[#6E6E73]">10 nuances</span>
              <div className="flex -space-x-0.5">
                {['#FFFFFF', '#1C1C1C', '#1B2A4A', '#722F37', '#4A5D45', '#C19A6B', '#7EB6D9', '#C2654A', '#9B8EC0', '#D4869C'].map((c, i) => (
                  <motion.div
                    key={c}
                    className="w-3.5 h-3.5 sm:w-3 sm:h-3 rounded-full border border-black/30"
                    style={{ backgroundColor: c }}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 1 + i * 0.06 }}
                  />
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right Feature Image */}
        <motion.div
          style={{ y: y1 }}
          className="hidden lg:block lg:col-span-5 relative"
        >
          <div className="relative aspect-[4/5] w-full bg-[#16161A] group overflow-hidden">
            <motion.img
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 2, ease: 'easeOut' }}
              src="https://images.asos-media.com/products/asos-design-heavyweight-oversized-t-shirt-in-khaki-soft-touch/209083341-1-dustyolive?$n_640w$&wid=513&fit=constrain"
              className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
            />
            <div className="absolute inset-0 border-[20px] border-[#0E0E10] transition-all duration-700 group-hover:border-[10px]" />
          </div>
          <div className="absolute -bottom-10 -left-10 w-28 h-28 xl:w-32 xl:h-32 bg-[#CFC7B8] flex items-center justify-center p-4">
            <p className="text-[9px] xl:text-[10px] font-mono text-black uppercase tracking-widest text-center leading-tight">
              Crafted in <br /> Colour
            </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        className="absolute bottom-6 sm:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 sm:gap-4 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-[#6E6E73]">Explorer</span>
        <ArrowDown size={14} className="text-[#CFC7B8]" />
      </motion.div>
    </section>
  );
};

// ================================
// Category Filter
// ================================
const CategoryFilter: React.FC<{
  active: string;
  onChange: (cat: string) => void;
}> = ({ active, onChange }) => {
  const categories = ['Tous', 'T-Shirt', 'Polo'];

  return (
    <div className="flex items-center gap-2 sm:gap-3">
      {categories.map(cat => (
        <button
          key={cat}
          onClick={() => onChange(cat)}
          className={`px-3 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-[9px] sm:text-[10px] md:text-[11px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.25em] border transition-all duration-500 min-h-[40px] sm:min-h-[44px] ${
            active === cat
              ? 'bg-[#F5F5F5] text-black border-[#F5F5F5]'
              : 'border-white/10 text-[#9A9AA0] hover:border-[#CFC7B8] hover:text-white'
          }`}
        >
          {cat === 'Tous' ? 'Tous' : cat + 's'}
        </button>
      ))}
    </div>
  );
};

// ================================
// Product Card avec aperçu couleur
// ================================
const ProductCard: React.FC<{
  product: Product;
  onSelect: (p: Product) => void;
}> = ({ product, onSelect }) => {
  const [activeColor, setActiveColor] = useState(product.colors[0]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="group cursor-pointer relative"
      onClick={() => onSelect(product)}
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-[#16161A] mb-4 sm:mb-6">
        <ColorizedImage
          src={product.image}
          color={activeColor}
          className="w-full h-full"
        />

        {/* Subtle Frame Hover */}
        <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none z-10" />

        {/* Color Name Badge */}
        <motion.div
          key={activeColor.name}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 px-2 sm:px-3 py-1 bg-black/60 backdrop-blur-sm text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.15em] sm:tracking-[0.2em] text-white/80 z-10"
        >
          {activeColor.name}
        </motion.div>

        {/* Color Preview Dots — always visible on mobile, hover on desktop */}
        <div className="absolute bottom-2.5 sm:bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5
          bg-black/60 backdrop-blur-md px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-full
          opacity-100 md:opacity-0 md:group-hover:opacity-100
          md:translate-y-4 md:group-hover:translate-y-0
          transition-all duration-500 z-10">
          {product.colors.map(c => (
            <button
              key={c.name}
              onClick={(e) => { e.stopPropagation(); setActiveColor(c); }}
              onMouseEnter={() => setActiveColor(c)}
              className={`w-[18px] h-[18px] sm:w-4 sm:h-4 rounded-full border-[1.5px] transition-all duration-300 ${
                activeColor.hex === c.hex
                  ? 'border-white scale-110 shadow-lg'
                  : 'border-white/30 hover:border-white/70 hover:scale-105'
              }`}
              style={{ backgroundColor: c.hex }}
              title={c.name}
            />
          ))}
        </div>

        {/* Quick View Trigger (desktop only) */}
        <div className="absolute inset-0 items-center justify-center hidden md:flex opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0 z-10">
          <div className="px-6 py-3 bg-white/90 backdrop-blur text-black text-[10px] font-mono uppercase tracking-[0.3em] flex items-center gap-3 shadow-xl">
            Personnaliser <Plus size={14} />
          </div>
        </div>
      </div>

      <div className="flex justify-between items-end px-0.5 sm:px-1">
        <div className="space-y-0.5 min-w-0 mr-3">
          <p className="text-[8px] sm:text-[9px] font-mono text-[#6E6E73] uppercase tracking-[0.15em]">{product.category}</p>
          <h3 className="text-sm sm:text-base md:text-lg font-serif italic text-[#F5F5F5] group-hover:text-[#CFC7B8] transition-colors truncate">{product.name}</h3>
        </div>
        <p className="text-xs sm:text-sm font-mono text-[#F5F5F5] shrink-0">{product.price.toFixed(0)} XOF</p>
      </div>
    </motion.div>
  );
};

// ================================
// Product Modal avec changement de couleur en direct
// ================================
const ProductModal: React.FC<{
  product: Product | null;
  onClose: () => void;
  onAddToCart: (item: Omit<CartItem, 'id'>) => void;
}> = ({ product, onClose, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
      document.body.style.overflow = 'hidden';
    }
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product || !selectedColor) return null;

  const handleAdd = () => {
    if (selectedColor && selectedSize) {
      onAddToCart({
        productId: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        color: selectedColor,
        size: selectedSize,
        quantity: 1,
        image: product.image,
      });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] flex items-end md:items-center justify-center md:p-6 lg:p-8 bg-black/90 backdrop-blur-md"
      >
        {/* Backdrop click */}
        <div className="absolute inset-0" onClick={onClose} />

        <motion.div
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '100%', opacity: 0 }}
          transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          className="relative w-full md:max-w-5xl lg:max-w-6xl bg-[#16161A] overflow-hidden flex flex-col md:flex-row
            h-[92vh] sm:h-[94vh] md:h-auto md:max-h-[90vh]
            rounded-t-[20px] md:rounded-none shadow-2xl"
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 md:top-8 md:right-8 z-20
              w-10 h-10 flex items-center justify-center
              text-[#9A9AA0] hover:text-white transition-all hover:rotate-90
              bg-black/40 md:bg-black/20 rounded-full backdrop-blur-sm"
          >
            <X size={20} />
          </button>

          {/* Mobile drag indicator */}
          <div className="md:hidden flex justify-center pt-2.5 pb-1.5">
            <div className="w-10 h-1 bg-white/20 rounded-full" />
          </div>

          {/* Image Section avec changement de couleur */}
          <div className="w-full md:w-[55%] lg:w-3/5 h-[35vh] sm:h-[40vh] md:h-auto shrink-0 relative">
            <ColorizedImage
              src={product.image}
              color={selectedColor}
              className="w-full h-full"
            />

            {/* Color name overlay on image */}
            <motion.div
              key={selectedColor.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="absolute bottom-3 sm:bottom-5 md:bottom-6 left-3 sm:left-5 md:left-6 
                px-3 py-1.5 bg-black/60 backdrop-blur-md rounded-sm"
            >
              <div className="flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full border border-white/30"
                  style={{ backgroundColor: selectedColor.hex }}
                />
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.2em] text-white/90">
                  {selectedColor.name}
                </span>
              </div>
            </motion.div>
          </div>

          {/* Details Section */}
          <div className="w-full md:w-[45%] lg:w-2/5 flex-1 overflow-y-auto p-5 sm:p-7 md:p-10 lg:p-14 flex flex-col justify-start md:justify-center border-t md:border-t-0 md:border-l border-white/5">
            <div className="mb-6 sm:mb-8 md:mb-10">
              <span className="text-[9px] sm:text-[10px] font-mono text-[#CFC7B8] uppercase tracking-[0.3em] mb-2 sm:mb-3 block">
                {product.category} / {product.id.split('-')[1]}
              </span>
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-serif italic mb-3 sm:mb-4 leading-tight">
                {product.name}
              </h2>
              <p className="text-lg sm:text-xl font-mono text-[#F5F5F5] mb-3 sm:mb-5">
                {product.price.toFixed(2)} XOF
              </p>
              <p className="text-[#9A9AA0] font-light leading-relaxed text-xs sm:text-sm">
                {product.description}
              </p>
            </div>

            <div className="space-y-5 sm:space-y-7 md:space-y-8 mb-6 sm:mb-8 md:mb-10">
              {/* Color Selection */}
              <div>
                <div className="flex items-center justify-between mb-3 sm:mb-4">
                  <p className="text-[9px] sm:text-[10px] font-mono text-[#6E6E73] uppercase tracking-widest">
                    Couleur
                  </p>
                  <motion.p
                    key={selectedColor.name}
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-[9px] sm:text-[10px] font-mono text-[#CFC7B8] uppercase tracking-wider"
                  >
                    {selectedColor.name}
                  </motion.p>
                </div>
                <div className="flex flex-wrap gap-3 sm:gap-4">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-500 ${
                        selectedColor?.name === color.name
                          ? 'scale-110 shadow-[0_0_20px_rgba(207,199,184,0.3)]'
                          : 'opacity-50 hover:opacity-100'
                      }`}
                      style={{
                        backgroundColor: color.hex,
                        border: color.hex === '#FFFFFF' ? '1.5px solid rgba(255,255,255,0.3)' : 'none',
                      }}
                      title={color.name}
                    >
                      {selectedColor?.name === color.name && (
                        <motion.div
                          layoutId="modal-color-ring"
                          className="absolute -inset-[5px] border-[1.5px] border-[#CFC7B8] rounded-full"
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size Selection */}
              <div>
                <p className="text-[9px] sm:text-[10px] font-mono text-[#6E6E73] uppercase tracking-widest mb-3 sm:mb-4">
                  Taille
                </p>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 border text-[10px] sm:text-[11px] font-mono transition-all duration-500 min-h-[42px] min-w-[42px] flex items-center justify-center ${
                        selectedSize === size
                          ? 'bg-[#F5F5F5] text-black border-[#F5F5F5]'
                          : 'border-white/10 text-[#9A9AA0] hover:border-[#CFC7B8] hover:text-white'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Add to Cart */}
            <button
              onClick={handleAdd}
              className="group w-full bg-[#F5F5F5] text-black py-4 sm:py-5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-mono transition-all hover:bg-[#CFC7B8] relative overflow-hidden min-h-[52px]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                Ajouter au panier <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// ================================
// Cart Drawer
// ================================
const CartDrawer: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}> = ({ isOpen, onClose, items, onUpdateQty, onRemove }) => {
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleSendOrder = () => {
    const summary = items
      .map(
        item =>
          `• ${item.name}\n  Taille: ${item.size}\n  Couleur: ${item.color.name}\n  Qté: ${item.quantity}\n  Prix: ${(item.price * item.quantity).toFixed(0)} XOF`,
      )
      .join('\n\n');

    const message = encodeURIComponent(
      `Bonjour ClothingColorfull,\n\nJe souhaite commander :\n\n${summary}\n\nTotal : ${total.toFixed(0)} XOF\n\nMerci.`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[110] bg-black/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full sm:max-w-md bg-[#16161A] z-[111] flex flex-col border-l border-white/5 shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-5 sm:p-7 md:p-10 border-b border-white/5">
              <div className="space-y-1">
                <h2 className="text-xl sm:text-2xl font-serif italic">Panier</h2>
                <p className="text-[9px] sm:text-[10px] font-mono text-[#6E6E73] uppercase tracking-widest">
                  {items.length} pièce{items.length !== 1 ? 's' : ''}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-[#9A9AA0] hover:text-white transition-all hover:rotate-90 min-h-[44px] min-w-[44px] flex items-center justify-center"
              >
                <X size={24} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-5 sm:p-7 md:p-10 space-y-5 sm:space-y-7 md:space-y-10">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-12 h-[1px] bg-[#6E6E73]" />
                  <p className="text-[10px] font-mono text-[#9A9AA0] uppercase tracking-[0.4em]">Panier Vide</p>
                  <button
                    onClick={onClose}
                    className="text-sm font-serif italic text-[#CFC7B8] hover:text-white transition-colors min-h-[44px]"
                  >
                    Voir la collection
                  </button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-4 sm:gap-6 group">
                    <div className="w-20 sm:w-24 h-28 sm:h-32 shrink-0 overflow-hidden">
                      <ColorizedImage
                        src={item.image}
                        color={item.color}
                        className="w-full h-full"
                      />
                    </div>
                    <div className="flex-1 flex flex-col py-0.5 min-w-0">
                      <div className="flex justify-between items-start gap-2 mb-2 sm:mb-3">
                        <div className="min-w-0">
                          <h4 className="text-sm sm:text-base font-serif italic group-hover:text-[#CFC7B8] transition-colors truncate">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2 mt-1.5">
                            <div
                              className="w-3 h-3 rounded-full shrink-0 border border-white/20"
                              style={{ backgroundColor: item.color.hex }}
                            />
                            <p className="text-[8px] sm:text-[9px] font-mono text-[#9A9AA0] uppercase tracking-widest">
                              {item.color.name} • {item.size}
                            </p>
                          </div>
                        </div>
                        <p className="text-xs font-mono text-[#F5F5F5] shrink-0">
                          {(item.price * item.quantity).toFixed(0)} XOF
                        </p>
                      </div>

                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-white/10">
                          <button
                            onClick={() => onUpdateQty(item.id, -1)}
                            className="p-2 hover:text-[#CFC7B8] transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                          >
                            <Minus size={11} />
                          </button>
                          <span className="mx-3 sm:mx-5 text-[10px] font-mono">{item.quantity}</span>
                          <button
                            onClick={() => onUpdateQty(item.id, 1)}
                            className="p-2 hover:text-[#CFC7B8] transition-colors min-h-[36px] min-w-[36px] flex items-center justify-center"
                          >
                            <Plus size={11} />
                          </button>
                        </div>
                        <button
                          onClick={() => onRemove(item.id)}
                          className="text-[8px] sm:text-[9px] font-mono text-[#6E6E73] hover:text-red-400 uppercase tracking-widest transition-colors min-h-[36px] flex items-center"
                        >
                          Retirer
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-5 sm:p-7 md:p-10 bg-[#0E0E10] space-y-4 sm:space-y-6 border-t border-white/5">
                <div className="flex justify-between items-end">
                  <span className="text-[9px] sm:text-[10px] font-mono text-[#6E6E73] uppercase tracking-[0.3em]">
                    Total
                  </span>
                  <span className="text-2xl sm:text-3xl font-serif italic">{total.toFixed(0)} XOF</span>
                </div>
                <button
                  onClick={handleSendOrder}
                  className="group w-full bg-[#F5F5F5] text-black py-4 sm:py-5 text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.3em] font-mono transition-all hover:bg-[#CFC7B8] flex items-center justify-center gap-3 min-h-[52px]"
                >
                  Commander via WhatsApp{' '}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <p className="text-[8px] sm:text-[9px] text-center text-[#6E6E73] uppercase tracking-[0.2em] font-mono">
                  Confirmation sous 24h
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// ================================
// Main App
// ================================
const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [activeCategory, setActiveCategory] = useState('Tous');

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Tous') return PRODUCTS;
    return PRODUCTS.filter(p => p.category === activeCategory);
  }, [activeCategory]);

  const handleAddToCart = useCallback((item: Omit<CartItem, 'id'>) => {
    setCartItems(prev => {
      const existing = prev.find(
        i => i.productId === item.productId && i.color.name === item.color.name && i.size === item.size,
      );
      if (existing) {
        return prev.map(i => (i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i));
      }
      return [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems(prev =>
      prev.map(item => {
        if (item.id === id) {
          const nextQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: nextQty };
        }
        return item;
      }),
    );
  };

  const handleRemove = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="relative min-h-screen selection:bg-[#CFC7B8] selection:text-black">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />

      <main className="relative">
        <Hero />

        {/* ========== Collection Section ========== */}
        <section id="collection" className="px-4 sm:px-6 md:px-12 lg:px-16 py-16 sm:py-24 md:py-32 lg:py-40 max-w-screen-2xl mx-auto">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 sm:mb-16 md:mb-24 lg:mb-32 gap-6 sm:gap-8">
            <div className="max-w-2xl">
              <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#6E6E73] mb-3 sm:mb-4 block">
                Collection Personnalisable
              </span>
              <h2 style={{ fontSize: 'clamp(1.8rem, 5vw, 4.5rem)' }} className="font-serif leading-tight">
                Choisis ta <br />
                <span className="italic font-light">Couleur.</span>
              </h2>
            </div>
            <CategoryFilter active={activeCategory} onChange={setActiveCategory} />
          </div>

          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 sm:gap-8 md:gap-x-10 lg:gap-x-12 md:gap-y-16 lg:gap-y-24"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map(product => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5 }}
                >
                  <ProductCard product={product} onSelect={setSelectedProduct} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* ========== Vision Section ========== */}
        <section className="py-16 sm:py-24 md:py-32 lg:py-40 px-4 sm:px-6 md:px-12 lg:px-16 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto relative">
            <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#CFC7B8]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-12 md:gap-16 items-center">
              <div className="lg:col-span-5">
                <img
                  src="https://images.asos-media.com/products/4505-icon-heavyweight-cotton-oversized-t-shirt-with-quick-dry-finish-in-washed-jade-green/209567016-1-washedjadegreen?$n_640w$&wid=513&fit=constrain"
                  className="w-full aspect-[4/5] object-cover grayscale brightness-75 border border-white/5"
                />
              </div>
              <div className="lg:col-span-7 lg:pl-6 xl:pl-12">
                <span className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] sm:tracking-[0.5em] text-[#6E6E73] mb-4 sm:mb-6 md:mb-8 block">
                  Notre Vision
                </span>
                <blockquote style={{ fontSize: 'clamp(1.5rem, 4vw, 3.75rem)' }} className="font-serif italic leading-[1.15] mb-6 sm:mb-8 md:mb-12">
                  "Chaque couleur raconte <br className="hidden sm:block" /> une histoire. <br />
                  La tienne commence ici."
                </blockquote>
                <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
                  <div className="w-10 sm:w-14 md:w-20 h-[1px] bg-[#CFC7B8]" />
                  <p className="text-[9px] sm:text-[10px] font-mono uppercase tracking-[0.3em] text-[#F5F5F5]">
                    ClothingColorfull Studio
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* ========== Footer ========== */}
      <footer className="bg-[#0E0E10] pt-16 sm:pt-24 md:pt-32 lg:pt-40 pb-10 sm:pb-16 md:pb-20 px-4 sm:px-6 md:px-12 lg:px-16 text-[#6E6E73] border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 md:gap-16 lg:gap-20">
          <div className="col-span-2 space-y-4 sm:space-y-6 md:space-y-8">
            <h4 className="text-xl sm:text-2xl md:text-3xl font-serif italic text-[#F5F5F5]">ClothingColorfull</h4>
            <p className="text-[9px] sm:text-[10px] md:text-[11px] font-mono uppercase tracking-[0.2em] sm:tracking-[0.3em] leading-loose max-w-sm">
              Conçu pour ceux qui osent la couleur. <br />
              Personnalise. Porte. Affirme.
            </p>
            {/* Color swatches in footer */}
            <div className="flex gap-1.5">
              {['#FFFFFF', '#1C1C1C', '#1B2A4A', '#722F37', '#4A5D45', '#C19A6B', '#7EB6D9', '#C2654A', '#9B8EC0', '#D4869C'].map(c => (
                <div key={c} className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border border-white/10" style={{ backgroundColor: c }} />
              ))}
            </div>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-[9px] sm:text-[10px] font-mono text-[#CFC7B8] uppercase tracking-[0.3em]">Liens</p>
            <ul className="text-[9px] sm:text-[10px] md:text-[11px] space-y-3 sm:space-y-4 font-mono uppercase tracking-[0.15em]">
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
            </ul>
          </div>
          <div className="space-y-4 sm:space-y-6">
            <p className="text-[9px] sm:text-[10px] font-mono text-[#CFC7B8] uppercase tracking-[0.3em]">Infos</p>
            <ul className="text-[9px] sm:text-[10px] md:text-[11px] space-y-3 sm:space-y-4 font-mono uppercase tracking-[0.15em]">
              <li><a href="#" className="hover:text-white transition-colors">Retours</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Livraison</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Mentions Légales</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-screen-2xl mx-auto mt-12 sm:mt-20 md:mt-32 flex flex-col sm:flex-row justify-between items-center gap-4 text-[8px] sm:text-[9px] font-mono uppercase tracking-[0.3em] opacity-30">
          <p>© 2026 ClothingColorfull — Tous droits réservés.</p>
        </div>
      </footer>

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemove}
      />
    </div>
  );
};

export default App;
