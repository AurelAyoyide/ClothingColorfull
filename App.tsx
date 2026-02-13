
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ShoppingBag, X, Plus, Minus, ArrowRight, ArrowDown } from 'lucide-react';
import { PRODUCTS, WHATSAPP_NUMBER, COLORS } from './constants';
import { Product, CartItem, Color, Size } from './types';

// --- Components ---

const Navbar: React.FC<{ cartCount: number; onOpenCart: () => void }> = ({ cartCount, onOpenCart }) => (
  <nav className="fixed top-0 left-0 w-full z-[60] flex items-center justify-between px-6 md:px-16 py-10 pointer-events-none">
    <div className="pointer-events-auto">
      <h1 className="text-xl md:text-2xl font-serif tracking-[0.2em] uppercase cursor-pointer group transition-all">
        Clothing<span className="italic font-light group-hover:text-[#CFC7B8] transition-colors">Colorfull</span>
      </h1>
    </div>
    <div className="flex items-center gap-12 pointer-events-auto">
      <button 
        onClick={onOpenCart}
        className="flex items-center gap-3 group relative"
      >
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#9A9AA0] group-hover:text-[#CFC7B8] transition-colors leading-none">Panier</span>
          <span className="text-xs font-mono text-[#F5F5F5]">{cartCount.toString().padStart(2, '0')}</span>
        </div>
        <div className="relative">
            <ShoppingBag size={20} className="text-[#F5F5F5] group-hover:scale-110 transition-transform" />
            {cartCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#CFC7B8] rounded-full" />}
        </div>
      </button>
    </div>
  </nav>
);

const Hero: React.FC = () => {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden px-6 md:px-16">
      <div className="spotlight" />
      
      <div className="relative z-10 w-full max-w-screen-2xl grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Editorial Text */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="text-[10px] md:text-xs font-mono uppercase tracking-[0.5em] text-[#CFC7B8] mb-8 block">
              Manifesto • Series 001
            </span>
            <h2 className="text-6xl md:text-9xl font-serif leading-[0.85] mb-10 tracking-tight">
              The Quiet <br />
              <span className="italic font-light ml-8 md:ml-16">Uniform.</span>
            </h2>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-8 mt-4">
               <motion.div 
                 className="h-[1px] w-24 bg-[#6E6E73]"
                 initial={{ width: 0 }}
                 animate={{ width: 96 }}
                 transition={{ delay: 0.5, duration: 1 }}
               />
               <p className="text-sm md:text-base text-[#9A9AA0] font-light max-w-sm leading-relaxed uppercase tracking-wider">
                 Redéfinir l'essentiel par la soustraction. 
                 Ni logos, ni bruit. Juste la matière.
               </p>
            </div>
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
               transition={{ duration: 2, ease: "easeOut" }}
               src="https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&q=90&w=1200" 
               className="w-full h-full object-cover grayscale-[0.2] contrast-[1.1]"
            />
            <div className="absolute inset-0 border-[20px] border-[#0E0E10] transition-all duration-700 group-hover:border-[10px]" />
          </div>
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-[#CFC7B8] flex items-center justify-center p-4">
             <p className="text-[10px] font-mono text-black uppercase tracking-widest text-center leading-tight">
               Crafted in <br/> Silence
             </p>
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        style={{ opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4 cursor-pointer"
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#6E6E73]">Explore</span>
        <ArrowDown size={14} className="text-[#CFC7B8]" />
      </motion.div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product; onSelect: (p: Product) => void }> = ({ product, onSelect }) => (
  <motion.div 
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
    className="group cursor-pointer relative"
    onClick={() => onSelect(product)}
  >
    <div className="relative aspect-[3/4] overflow-hidden bg-[#16161A] mb-8">
      <img 
        src={product.image} 
        alt={product.name}
        className="w-full h-full object-cover transition-all duration-[1.5s] ease-out group-hover:scale-110 group-hover:brightness-75"
      />
      
      {/* Subtle Frame Hover */}
      <div className="absolute inset-0 border border-white/0 group-hover:border-white/10 transition-all duration-700 pointer-events-none" />
      
      {/* Quick View Trigger */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
        <div className="px-8 py-4 bg-white text-black text-[10px] font-mono uppercase tracking-[0.3em] flex items-center gap-3">
          S'approprier <Plus size={14} />
        </div>
      </div>
    </div>

    <div className="flex justify-between items-end px-2">
      <div className="space-y-1">
        <p className="text-[9px] font-mono text-[#6E6E73] uppercase tracking-[0.2em]">{product.category}</p>
        <h3 className="text-xl font-serif italic text-[#F5F5F5] group-hover:text-[#CFC7B8] transition-colors">{product.name}</h3>
      </div>
      <div className="text-right">
        <p className="text-sm font-mono text-[#F5F5F5]">{product.price.toFixed(0)}€</p>
      </div>
    </div>
  </motion.div>
);

const ProductModal: React.FC<{ 
  product: Product | null; 
  onClose: () => void; 
  onAddToCart: (item: Omit<CartItem, 'id'>) => void 
}> = ({ product, onClose, onAddToCart }) => {
  const [selectedColor, setSelectedColor] = useState<Color | null>(null);
  const [selectedSize, setSelectedSize] = useState<Size | null>(null);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  if (!product) return null;

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
        image: product.image
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
        className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/90 backdrop-blur-md"
      >
        <motion.div 
           initial={{ scale: 0.95, opacity: 0, y: 20 }}
           animate={{ scale: 1, opacity: 1, y: 0 }}
           className="relative w-full max-w-6xl bg-[#16161A] overflow-hidden flex flex-col lg:flex-row max-h-[95vh] shadow-2xl"
        >
          <button onClick={onClose} className="absolute top-8 right-8 z-20 text-[#9A9AA0] hover:text-white transition-all hover:rotate-90">
            <X size={28} />
          </button>
          
          <div className="w-full lg:w-3/5 overflow-hidden h-80 lg:h-auto bg-[#0E0E10]">
            <img src={product.image} className="w-full h-full object-cover opacity-90" />
          </div>

          <div className="w-full lg:w-2/5 p-10 md:p-16 flex flex-col justify-center border-l border-white/5">
            <div className="mb-12">
               <span className="text-[10px] font-mono text-[#CFC7B8] uppercase tracking-[0.4em] mb-4 block">{product.category} / 01</span>
               <h2 className="text-5xl font-serif italic mb-6 leading-tight">{product.name}</h2>
               <p className="text-sm font-mono text-[#F5F5F5] mb-8">{product.price.toFixed(2)}€</p>
               <p className="text-[#9A9AA0] font-light leading-relaxed text-sm">{product.description}</p>
            </div>
            
            <div className="space-y-10 mb-12">
              <div>
                <p className="text-[10px] font-mono text-[#6E6E73] uppercase tracking-widest mb-5">Nuances Sélectionnées</p>
                <div className="flex gap-5">
                  {product.colors.map(color => (
                    <button
                      key={color.name}
                      onClick={() => setSelectedColor(color)}
                      className={`relative w-10 h-10 rounded-full transition-all duration-500 ${selectedColor?.name === color.name ? 'scale-110 shadow-[0_0_15px_rgba(207,199,184,0.3)]' : 'opacity-40 hover:opacity-100'}`}
                      style={{ backgroundColor: color.hex }}
                    >
                       {selectedColor?.name === color.name && (
                         <motion.div layoutId="color-ring" className="absolute -inset-1.5 border border-[#CFC7B8] rounded-full" />
                       )}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-[10px] font-mono text-[#6E6E73] uppercase tracking-widest mb-5">Dimensions</p>
                <div className="flex flex-wrap gap-3">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-6 py-2.5 border text-[11px] font-mono transition-all duration-500 ${selectedSize === size ? 'bg-[#F5F5F5] text-black border-[#F5F5F5]' : 'border-white/10 text-[#9A9AA0] hover:border-[#CFC7B8] hover:text-white'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button 
              onClick={handleAdd}
              className="group w-full bg-[#F5F5F5] text-black py-6 text-[11px] uppercase tracking-[0.3em] font-mono transition-all hover:bg-[#CFC7B8] relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-3">
                Intégrer à la garde-robe <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

const CartDrawer: React.FC<{ 
  isOpen: boolean; 
  onClose: () => void; 
  items: CartItem[]; 
  onUpdateQty: (id: string, delta: number) => void;
  onRemove: (id: string) => void;
}> = ({ isOpen, onClose, items, onUpdateQty, onRemove }) => {
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSendOrder = () => {
    const summary = items.map(item => (
      `• ${item.name}\n  Taille: ${item.size}\n  Couleur: ${item.color.name}\n  Qté: ${item.quantity}\n  Prix: ${(item.price * item.quantity).toFixed(0)}€`
    )).join('\n\n');
    
    const message = encodeURIComponent(
      `Bonjour ClothingColorfull,\n\nJe souhaite faire l'acquisition des pièces suivantes :\n\n${summary}\n\nTotal : ${total.toFixed(0)}€\n\nMerci de m'indiquer la marche à suivre.`
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
            className="fixed top-0 right-0 h-full w-full max-w-md bg-[#16161A] z-[111] flex flex-col border-l border-white/5 shadow-2xl"
          >
            <div className="flex items-center justify-between p-10 border-b border-white/5">
              <div className="space-y-1">
                <h2 className="text-2xl font-serif italic">Archives</h2>
                <p className="text-[10px] font-mono text-[#6E6E73] uppercase tracking-widest">{items.length} pièces sélectionnées</p>
              </div>
              <button onClick={onClose} className="text-[#9A9AA0] hover:text-white transition-all hover:rotate-90">
                <X size={28} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-10 space-y-10">
              {items.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-6">
                  <div className="w-12 h-[1px] bg-[#6E6E73]" />
                  <p className="text-[10px] font-mono text-[#9A9AA0] uppercase tracking-[0.4em]">Séléction Vide</p>
                  <button onClick={onClose} className="text-sm font-serif italic text-[#CFC7B8] hover:text-white transition-colors">Retourner à la collection</button>
                </div>
              ) : (
                items.map(item => (
                  <div key={item.id} className="flex gap-8 group">
                    <div className="w-24 h-32 bg-[#0E0E10] shrink-0 overflow-hidden relative">
                      <img src={item.image} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <div className="flex-1 flex flex-col py-1">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="text-base font-serif italic group-hover:text-[#CFC7B8] transition-colors">{item.name}</h4>
                          <p className="text-[9px] font-mono text-[#9A9AA0] uppercase mt-2 tracking-widest">{item.color.name} • T{item.size}</p>
                        </div>
                        <p className="text-xs font-mono text-[#F5F5F5]">{item.price.toFixed(0)}€</p>
                      </div>
                      
                      <div className="mt-auto flex items-center justify-between">
                        <div className="flex items-center border border-white/10 px-3 py-1.5">
                          <button onClick={() => onUpdateQty(item.id, -1)} className="p-1 hover:text-[#CFC7B8] transition-colors"><Minus size={10} /></button>
                          <span className="mx-6 text-[10px] font-mono">{item.quantity}</span>
                          <button onClick={() => onUpdateQty(item.id, 1)} className="p-1 hover:text-[#CFC7B8] transition-colors"><Plus size={10} /></button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-[9px] font-mono text-[#6E6E73] hover:text-white uppercase tracking-widest transition-colors"
                        >
                          Supprimer
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {items.length > 0 && (
              <div className="p-10 bg-[#0E0E10] space-y-8">
                <div className="flex justify-between items-end">
                  <span className="text-[10px] font-mono text-[#6E6E73] uppercase tracking-[0.3em]">Total Archives</span>
                  <span className="text-3xl font-serif italic">{total.toFixed(0)}€</span>
                </div>
                <button 
                  onClick={handleSendOrder}
                  className="group w-full bg-[#F5F5F5] text-black py-6 text-[11px] uppercase tracking-[0.3em] font-mono transition-all hover:bg-[#CFC7B8] flex items-center justify-center gap-4"
                >
                  Finaliser via WhatsApp <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <div className="flex flex-col items-center gap-2">
                   <p className="text-[9px] text-center text-[#6E6E73] uppercase tracking-[0.2em] font-mono">Disponibilité confirmée sous 24h</p>
                   <div className="w-6 h-[1px] bg-white/10" />
                </div>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

const App: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const cartCount = useMemo(() => cartItems.reduce((sum, item) => sum + item.quantity, 0), [cartItems]);

  const handleAddToCart = useCallback((item: Omit<CartItem, 'id'>) => {
    setCartItems(prev => {
      const existing = prev.find(i => 
        i.productId === item.productId && 
        i.color.name === item.color.name && 
        i.size === item.size
      );
      if (existing) {
        return prev.map(i => i.id === existing.id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { ...item, id: Math.random().toString(36).substr(2, 9) }];
    });
    setIsCartOpen(true);
  }, []);

  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: nextQty };
      }
      return item;
    }));
  };

  const handleRemove = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  return (
    <div className="relative min-h-screen selection:bg-[#CFC7B8] selection:text-black">
      <Navbar cartCount={cartCount} onOpenCart={() => setIsCartOpen(true)} />
      
      <main className="relative">
        <Hero />
        
        <section className="px-6 md:px-16 py-40 max-w-screen-2xl mx-auto">
          <div className="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
            <div className="max-w-2xl">
              <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#6E6E73] mb-6 block">Collection Permanante</span>
              <h2 className="text-5xl md:text-7xl font-serif leading-tight">L'équilibre du <br/><span className="italic font-light">Savoir-être.</span></h2>
            </div>
            <div className="flex items-center gap-6 pb-2">
                <div className="w-12 h-[1px] bg-[#CFC7B8]" />
                <p className="text-[#9A9AA0] font-mono text-[10px] uppercase tracking-[0.3em] max-w-xs text-right">
                    Une curation rigoureuse <br/> de coupes architecturales.
                </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-x-12 gap-y-32">
            {PRODUCTS.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onSelect={setSelectedProduct} 
              />
            ))}
          </div>
        </section>

        <section className="py-40 px-6 md:px-16 overflow-hidden">
          <div className="max-w-screen-2xl mx-auto relative">
             <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-[#CFC7B8]/5 blur-[100px] rounded-full pointer-events-none" />
             <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div className="lg:col-span-5">
                   <img 
                     src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&q=80&w=1200" 
                     className="w-full aspect-[4/5] object-cover grayscale brightness-75 border border-white/5"
                   />
                </div>
                <div className="lg:col-span-7 lg:pl-12">
                   <span className="text-[10px] font-mono uppercase tracking-[0.5em] text-[#6E6E73] mb-8 block">Notre Vision</span>
                   <blockquote className="text-4xl md:text-6xl font-serif italic leading-[1.15] mb-12">
                     “La simplicité est une discipline. <br/> Elle n'est pas l'absence de choix, mais la maîtrise totale du superflu.”
                   </blockquote>
                   <div className="flex items-center gap-8">
                      <div className="w-20 h-[1px] bg-[#CFC7B8]" />
                      <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-[#F5F5F5]">ClothingColorfull Studio</p>
                   </div>
                </div>
             </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0E0E10] pt-40 pb-20 px-6 md:px-16 text-[#6E6E73] border-t border-white/5">
        <div className="max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-3xl font-serif italic text-[#F5F5F5]">ClothingColorfull</h4>
            <p className="text-[11px] font-mono uppercase tracking-[0.3em] leading-loose max-w-sm">
              Conçu pour ceux qui n'ont rien à prouver. <br/>
              Élégance silencieuse. Retenue esthétique.
            </p>
          </div>
          <div className="space-y-8">
            <p className="text-[10px] font-mono text-[#CFC7B8] uppercase tracking-[0.4em]">Connexions</p>
            <ul className="text-[11px] space-y-4 font-mono uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-white transition-colors">WhatsApp Order</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Instagram Feed</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Journal</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <p className="text-[10px] font-mono text-[#CFC7B8] uppercase tracking-[0.4em]">Archives</p>
            <ul className="text-[11px] space-y-4 font-mono uppercase tracking-[0.2em]">
              <li><a href="#" className="hover:text-white transition-colors">Politique de retour</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Livraison Locale</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Legal Mentions</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-screen-2xl mx-auto mt-40 flex flex-col md:flex-row justify-between items-center gap-8 text-[9px] font-mono uppercase tracking-[0.4em] opacity-30">
          <p>© 2024 ClothingColorfull — Tous droits réservés.</p>
          <p className="italic">Projet développé par une IA d'excellence.</p>
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
