import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Music, ShoppingBag, Mic2, Star, PlayCircle, Headphones, ArrowRight, CheckCircle2, Search, X, User, BarChart, Settings, Upload, CreditCard, Heart, Trash2, Infinity, LogIn, ChevronRight, Menu, Calendar, Video, ArrowLeft, LogOut } from 'lucide-react';
import './index.css';
import logoWhite from './assets/logo-white.svg';

import { auth, db } from './firebase';
import { onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { collection, getDocs, doc, getDoc, setDoc, addDoc, query, where } from 'firebase/firestore';

// --- CONTEXT: PANIER, RECHERCHE & AUTH ---
const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);
        try {
          const docSnap = await getDoc(doc(db, "users", user.uid));
          if (docSnap.exists()) {
            setUserData(docSnap.data());
          }
        } catch (e) {
          console.error("Erreur roles user data :", e);
        }
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setUserData(null);
      }
    });
    return () => unsubscribe();
  }, []);

  const addToCart = (item) => {
    setCart([...cart, item]);
    setIsCartOpen(true);
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, index) => index !== indexToRemove));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((total, item) => total + item.price, 0);

  return (
    <AppContext.Provider value={{ cart, setCart, clearCart, addToCart, removeFromCart, isCartOpen, setIsCartOpen, cartTotal, searchQuery, setSearchQuery, isSearchActive, setIsSearchActive, isAuthenticated, currentUser, userData }}>
      {children}
    </AppContext.Provider>
  );
};

// --- DATA: INITIALISATION FIRESTORE ---
export const INITIAL_ARTISTS = [
  {
    id: "lynx",
    name: "Lynx",
    genre: "R&B / Soul",
    image: "https://images.unsplash.com/photo-1520627581559-0f40d7c71aa6?auto=format&fit=crop&w=800&q=80",
    cover: "https://images.unsplash.com/photo-1510289669528-97ce1d054d55?auto=format&fit=crop&w=1920&q=80",
    bio: "Voix suave de la scène R&B alternative, Lynx mélange soul classique et sonorités futuristes.",
    fullBio: "Découvert dans les clubs underground de Kinshasa, Lynx a redéfini le R&B francophone avec son premier EP 'Néons Noirs'. Sa voix suave, combinée à des productions électroniques pointues, crée une atmosphère onirique. Il est le premier artiste signé sous Infini Record.",
    latestTracks: [
      { title: "Néons Noirs", plays: "1.2M", duration: "3:42" },
      { title: "Fausse Route", plays: "850K", duration: "2:58" },
      { title: "Illusions", plays: "500K", duration: "4:05" }
    ],
    upcomingGigs: [
      { date: "15 Oct", city: "Kinshasa", venue: "Showbuzz" },
      { date: "22 Oct", city: "Paris", venue: "La Cigale" }
    ]
  },
  {
    id: "nova",
    name: "Nova",
    genre: "Afrobeat",
    image: "https://images.unsplash.com/photo-1516280440502-8610ea367202?auto=format&fit=crop&w=800&q=80",
    cover: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1920&q=80",
    bio: "Révélation Afrobeat. Ses percussions incisives font trembler les dancefloors mondiaux.",
    fullBio: "Véritable pile électrique sur scène, Nova fusionne l'Afrobeat nigérian avec des rythmiques congolaises (Ndombolo). Son énergie contagieuse et ses textes percutants en font l'artiste la plus streamée du label l'année dernière.",
    latestTracks: [
      { title: "Fire Dance", plays: "3.5M", duration: "3:15" },
      { title: "Mama Africa", plays: "2.1M", duration: "3:50" }
    ],
    upcomingGigs: []
  },
  {
    id: "the-zenith",
    name: "The Zenith",
    genre: "Hip-Hop",
    image: "https://images.unsplash.com/photo-1493225457124-a1a2a5f56461?auto=format&fit=crop&w=800&q=80",
    cover: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1920&q=80",
    bio: "Duo lyrical percutant, ils redéfinissent les règles du rap moderne avec des productions lourdes.",
    fullBio: "Composé de MC Kael et du beatmaker 'Ghost', The Zenith propose un rap sombre, introspectif, avec des influences Trap et Drill. Leur dernier album 'Ascension' a été numéro 1 des charts urbains pendant 3 semaines consecutives.",
    latestTracks: [
      { title: "Sommet", plays: "4.8M", duration: "3:22" },
      { title: "Ombres", plays: "1.9M", duration: "2:45" },
      { title: "Drill City (Freestyle)", plays: "3.1M", duration: "2:10" }
    ],
    upcomingGigs: [
      { date: "05 Nov", city: "Bruxelles", venue: "Ancienne Belgique" }
    ]
  }
];

// --- COMPONENTS ---

const Navbar = () => {
  const { cart, setIsCartOpen, searchQuery, setSearchQuery, isSearchActive, setIsSearchActive, isAuthenticated } = useContext(AppContext);

  const handleSearchToggle = (e) => {
    e.preventDefault();
    if (isSearchActive && searchQuery) {
      alert(`Recherche pour: ${searchQuery}`);
      setSearchQuery('');
      setIsSearchActive(false);
    } else {
      setIsSearchActive(!isSearchActive);
    }
  };

  return (
    <>
      <div className="navbar-wrapper">
        <nav className="navbar">
          <Link to="/" className="brand">
            <img src={logoWhite} alt="Infini Record" className="brand-logo-img" />
          </Link>

          <ul className="nav-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/artistes">Artistes</Link></li>
            <li><Link to="/store">Boutique</Link></li>
            <li><Link to="/pro">Portail Pro</Link></li>
          </ul>

          <div className="nav-actions">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn-secondary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} /> Mon Espace
              </Link>
            ) : (
              <Link to="/auth" className="btn-secondary" style={{ padding: '0.5rem 1.5rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <User size={16} /> Connexion
              </Link>
            )}
          </div>
        </nav>
      </div>

      {/* FAB (Panier & Recherche Flottants) - Toujours visible en bas à droite */}
      <div className="floating-actions">
        <button className="fab" onClick={() => setIsSearchActive(!isSearchActive)}>
          <Search size={20} />
        </button>
        <button className="fab fab-primary" onClick={() => setIsCartOpen(true)}>
          <ShoppingBag size={20} />
          {cart.length > 0 && <span className="cart-badge">{cart.length}</span>}
        </button>
      </div>

      {/* Barre de recherche plein écran si active */}
      <AnimatePresence>
        {isSearchActive && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(9,5,13,0.95)', zIndex: 3000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <button onClick={() => setIsSearchActive(false)} style={{ position: 'absolute', top: '2rem', right: '2rem', background: 'transparent', border: 'none', color: 'white', cursor: 'pointer' }}>
              <X size={32} />
            </button>
            <form onSubmit={handleSearchToggle} style={{ width: '80%', maxWidth: '600px', display: 'flex', alignItems: 'center', borderBottom: '2px solid var(--primary-color)' }}>
              <Search size={32} color="var(--primary-color)" />
              <input
                autoFocus
                type="text"
                placeholder="Rechercher un artiste, cover..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ width: '100%', background: 'transparent', border: 'none', color: 'white', fontSize: '2rem', padding: '1rem', outline: 'none', fontFamily: 'Outfit', fontWeight: '800' }}
              />
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        <Link to="/" className="mobile-nav-item"><img src={logoWhite} alt="Home" style={{ height: '24px' }} />Accueil</Link>
        <Link to="/artistes" className="mobile-nav-item"><Headphones size={24} />Artistes</Link>
        <Link to="/store" className="mobile-nav-item"><ShoppingBag size={24} />Boutique</Link>
        <Link to="/pro" className="mobile-nav-item"><Mic2 size={24} />Pro</Link>
        <Link to="/auth" className="mobile-nav-item"><User size={24} />Compte</Link>
      </nav>
    </>
  );
};

const CartSidebar = () => {
  const { cart, removeFromCart, clearCart, isCartOpen, setIsCartOpen, cartTotal, isAuthenticated, currentUser } = useContext(AppContext);
  const [checkoutStep, setCheckoutStep] = useState('cart'); // 'cart', 'checkout', 'success'
  const [paymentMethod, setPaymentMethod] = useState('mpesa'); // 'mpesa', 'airtel', 'card'
  const [phone, setPhone] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isCartOpen) {
      setTimeout(() => setCheckoutStep('cart'), 300);
    }
  }, [isCartOpen]);

  const handleCheckoutClick = () => {
    if (!isAuthenticated) {
      setIsCartOpen(false);
      navigate('/auth');
    } else {
      setCheckoutStep('checkout');
    }
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulation d'attente réseau pour API de Paiement (ex: Stripe ou FlexPay)
    setTimeout(async () => {
      try {
        await addDoc(collection(db, "orders"), {
          userId: currentUser.uid,
          userEmail: currentUser.email,
          items: cart,
          total: cartTotal,
          paymentMethod: paymentMethod,
          status: 'paid',
          createdAt: new Date()
        });

        setIsProcessing(false);
        setCheckoutStep('success');
        clearCart();
      } catch (err) {
        console.error("Erreur de paiement Firebase", err);
        setIsProcessing(false);
        alert("Une erreur est survenue lors de l'enregistrement de la commande.");
      }
    }, 2500); // 2.5 secondes de simu
  };

  if (!isCartOpen) return null;

  return (
    <>
      <div className="cart-overlay" onClick={() => setIsCartOpen(false)} />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="cart-sidebar"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2.5rem' }}>
          <h2 style={{ fontSize: '2rem' }}>{checkoutStep === 'cart' ? 'Mon Panier' : checkoutStep === 'checkout' ? 'Paiement' : 'Confirmation'}</h2>
          <button onClick={() => setIsCartOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: 'white', cursor: 'pointer', padding: '0.5rem', borderRadius: '50%' }}>
            <X size={24} />
          </button>
        </div>

        {checkoutStep === 'cart' && (
          <div style={{ flex: 1, overflowY: 'auto', paddingRight: '1rem', display: 'flex', flexDirection: 'column' }}>
            {cart.length === 0 ? (
              <div style={{ textAlign: 'center', marginTop: '4rem', opacity: 0.5 }}>
                <ShoppingBag size={48} style={{ marginBottom: '1rem' }} />
                <p className="text-muted">Votre panier est tristement vide.</p>
              </div>
            ) : (
              <>
                <div style={{ flex: 1 }}>
                  {cart.map((item, index) => (
                    <div key={index} className="cart-item">
                      <div className="cart-item-info">
                        <h4>{item.name}</h4>
                        <p className="cart-item-price">{item.price.toLocaleString()} FC</p>
                      </div>
                      <button onClick={() => removeFromCart(index)} style={{ background: 'rgba(244, 63, 94, 0.1)', border: 'none', color: 'var(--secondary-color)', cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.4rem', fontWeight: '800', marginBottom: '2rem', fontFamily: 'Outfit' }}>
                    <span>Total:</span>
                    <span className="text-gradient">{cartTotal.toLocaleString()} FC</span>
                  </div>
                  <button className="btn-primary" onClick={handleCheckoutClick} style={{ width: '100%', padding: '1rem', fontSize: '1.2rem' }}>Paiement Sécurisé</button>
                </div>
              </>
            )}
          </div>
        )}

        {checkoutStep === 'checkout' && (
          <form onSubmit={handlePaymentSubmit} style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <div style={{ flex: 1 }}>
              <p className="text-muted" style={{ marginBottom: '2rem' }}>Choisissez votre méthode de paiement pour régler <strong>{cartTotal.toLocaleString()} FC</strong></p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: paymentMethod === 'mpesa' ? 'rgba(109, 40, 217, 0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${paymentMethod === 'mpesa' ? 'var(--primary-color)' : 'transparent'}`, borderRadius: '15px', cursor: 'pointer' }}>
                  <input type="radio" name="payment" value="mpesa" checked={paymentMethod === 'mpesa'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ margin: 0 }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>M-Pesa</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Paiement mobile sécurisé</span>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: paymentMethod === 'airtel' ? 'rgba(244, 63, 94, 0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${paymentMethod === 'airtel' ? 'var(--secondary-color)' : 'transparent'}`, borderRadius: '15px', cursor: 'pointer' }}>
                  <input type="radio" name="payment" value="airtel" checked={paymentMethod === 'airtel'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ margin: 0 }} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Airtel Money</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Via Airtel DRC</span>
                  </div>
                </label>

                <label style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: paymentMethod === 'card' ? 'rgba(255,255,255,0.2)' : 'rgba(255,255,255,0.05)', border: `1px solid ${paymentMethod === 'card' ? 'white' : 'transparent'}`, borderRadius: '15px', cursor: 'pointer' }}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === 'card'} onChange={(e) => setPaymentMethod(e.target.value)} style={{ margin: 0 }} />
                  <CreditCard size={20} />
                  <div>
                    <h4 style={{ margin: 0, fontSize: '1.1rem' }}>Carte Bancaire</h4>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Stripe / Visa / Mastercard</span>
                  </div>
                </label>
              </div>

              {paymentMethod !== 'card' && (
                <div style={{ marginBottom: '2rem' }}>
                  <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>Numéro de téléphone</label>
                  <input type="tel" className="form-control" placeholder="+243 XXX XXX XXX" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                </div>
              )}
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '2rem', borderTop: '1px solid rgba(255,255,255,0.1)' }}>
              <button type="submit" className="btn-primary" disabled={isProcessing} style={{ width: '100%', padding: '1rem', fontSize: '1.2rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
                {isProcessing ? 'Traitement en cours...' : `Payer ${cartTotal.toLocaleString()} FC`}
              </button>
            </div>
          </form>
        )}

        {checkoutStep === 'success' && (
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '2rem', borderRadius: '50%', marginBottom: '2rem' }}>
              <CheckCircle2 size={64} color="#10b981" />
            </div>
            <h3 style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>Paiement Réussi !</h3>
            <p className="text-muted" style={{ fontSize: '1.1rem', marginBottom: '3rem', maxWidth: '300px' }}>Votre commande a été confirmée. Vous pouvez retrouver les détails dans votre espace membre.</p>
            <button className="btn-secondary" onClick={() => setIsCartOpen(false)} style={{ width: '100%' }}>Continuer la navigation</button>
          </div>
        )}
      </motion.div>
    </>
  );
};

const Footer = () => (
  <footer style={{ textAlign: 'center', padding: '4rem 0 6rem 0', color: 'var(--text-muted)' }}>
    <div className="container">
      <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', marginBottom: '3rem' }}>
        <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', transition: 'color 0.3s' }}>Instagram</a>
        <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', transition: 'color 0.3s' }}>TikTok</a>
        <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', transition: 'color 0.3s' }}>YouTube</a>
        <a href="#" style={{ color: 'var(--text-muted)', fontSize: '1.1rem', transition: 'color 0.3s' }}>Spotify</a>
      </div>
      <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
        <img src={logoWhite} alt="" style={{ height: '20px', opacity: 0.5 }} /> {new Date().getFullYear()} Infini Record. Le Son Sans Limites.
      </p>
    </div>
  </footer>
);

// --- PAGES ---

const Home = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
      <header className="section flex-center" style={{ minHeight: '90vh', textAlign: 'center', paddingBottom: '0' }}>
        <div className="container animate-fade-in">
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            <div style={{ background: 'rgba(244, 63, 94, 0.08)', padding: '0.5rem 1.2rem', borderRadius: '50px', display: 'flex', alignItems: 'center', gap: '0.8rem', color: '#f43f5e', fontWeight: '500', fontSize: '0.9rem', border: '1px solid rgba(244, 63, 94, 0.2)' }}>
              <Star size={16} /> Label Indépendant Innovant
            </div>
          </div>
          <h1 style={{ fontSize: 'clamp(3rem, 10vw, 6rem)', lineHeight: '1.1', marginBottom: '1.5rem', letterSpacing: '-2px' }}>
            L'Élévation de <span className="text-gradient">l'Art Pur.</span>
          </h1>
          <p style={{ fontSize: 'clamp(1rem, 4vw, 1.3rem)', color: 'var(--text-muted)', maxWidth: '650px', margin: '0 auto 3.5rem auto' }}>
            Découvrez. Écoutez. Jouez.
          </p>

          {/* GAME UI FOR HOME */}
          <div className="home-slider">
            <Link to="/artistes" className="slider-item" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url(https://images.unsplash.com/photo-1598387181032-a3103a2db5b3?auto=format&fit=crop&w=500&q=80) center/cover', height: '450px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem' }}>Les Artistes</h3>
                <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>Découvrir le catalogue</p>
              </div>
            </Link>

            <Link to="/store" className="slider-item" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url(https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=500&q=80) center/cover', height: '450px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem' }}>Boutique & Merch</h3>
                <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>Produits exclusifs</p>
              </div>
            </Link>

            <Link to="/pro" className="slider-item" style={{ background: 'linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%), url(https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=500&q=80) center/cover', height: '450px', display: 'flex', alignItems: 'flex-end', padding: '2rem' }}>
              <div style={{ textAlign: 'left' }}>
                <h3 style={{ fontSize: '2.5rem', color: 'white', marginBottom: '0.5rem' }}>Studio & Démos</h3>
                <p style={{ color: '#cbd5e1', fontSize: '1.1rem' }}>Mixage / Mastering / A&R</p>
              </div>
            </Link>
          </div>
        </div>
      </header>
    </motion.div>
  );
};

// PAGE AUTHENTICATION
const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { isAuthenticated } = useContext(AppContext);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      if (isLogin) {
        await signInWithEmailAndPassword(auth, email, password);
      } else {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;
        // Créer le profil dans Firestore
        await setDoc(doc(db, "users", user.uid), {
          uid: user.uid,
          name: name,
          email: email,
          role: 'fan',
          createdAt: new Date()
        });
      }
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential') {
        setError("Email ou mot de passe incorrect.");
      } else if (err.code === 'auth/email-already-in-use') {
        setError("Cet email est déjà utilisé.");
      } else {
        setError(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="section container auth-container" style={{ minHeight: '90vh' }}>
      <div className="auth-box">
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <img src={logoWhite} alt="Infini" style={{ height: '60px', marginBottom: '1.5rem' }} />
          <h2>{isLogin ? 'Connexion' : 'Inscription'}</h2>
          <p className="text-muted">Accédez à l'univers Infini Record</p>
        </div>

        {error && (
          <div style={{ background: 'rgba(244, 63, 94, 0.1)', border: '1px solid rgba(244, 63, 94, 0.3)', color: '#f43f5e', padding: '1rem', borderRadius: '12px', marginBottom: '1.5rem', fontSize: '0.9rem', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <div style={{ marginBottom: '1.5rem' }}>
              <label className="form-label">Nom Complet</label>
              <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} required style={{ marginBottom: 0 }} />
            </div>
          )}

          <div style={{ marginBottom: '1.5rem' }}>
            <label className="form-label">Adresse Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ marginBottom: 0 }} />
          </div>

          <div style={{ marginBottom: '2.5rem' }}>
            <label className="form-label">Mot de passe</label>
            <input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ marginBottom: 0 }} />
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', marginBottom: '1.5rem', padding: '1rem' }}>
            {loading ? 'Chargement...' : (isLogin ? 'Se Connecter' : 'Créer un compte')}
          </button>
        </form>

        <div style={{ textAlign: 'center' }}>
          <p className="text-muted">
            {isLogin ? "Pas encore de compte ?" : "Déjà membre ?"}
            <button onClick={() => setIsLogin(!isLogin)} style={{ background: 'none', border: 'none', color: 'var(--secondary-color)', fontWeight: 'bold', marginLeft: '0.5rem', cursor: 'pointer', fontSize: '1rem' }}>
              {isLogin ? "S'inscrire" : "Se Connecter"}
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

const Artistes = () => {
  const [artists, setArtists] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "artists"));
        const artistList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setArtists(artistList);
      } catch (error) {
        console.error("Erreur fetch artistes: ", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtists();
  }, []);

  if (loading) {
    return (
      <div className="section container flex-center" style={{ minHeight: '60vh' }}>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Chargement des talents depuis Firebase...</p>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="section container">
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: 'clamp(3rem, 8vw, 4rem)' }}>Nos <span className="text-gradient">Talents</span></h2>
        <p className="text-muted mt-4" style={{ fontSize: '1.2rem' }}>Découvrez les voix qui redéfinissent l'industrie musicale.</p>
      </div>

      <div className="grid-cards">
        {artists.length === 0 ? (
          <p className="text-muted" style={{ textAlign: 'center', gridColumn: '1 / -1' }}>Aucun artiste trouvé. Utilisez le Panel Admin (Dashboard) pour initialiser Firebase.</p>
        ) : artists.map((artist, idx) => (
          <Link to={`/artistes/${artist.id}`} key={idx} className="product-card">
            <div className="product-image-wrapper">
              <img src={artist.image} alt={artist.name} className="product-image" />
              <div className="product-overlay">
                <button className="btn-primary" style={{ width: '100%', gap: '0.5rem' }}>
                  Voir le profil <ArrowRight size={20} />
                </button>
              </div>
            </div>
            <div className="product-info" style={{ textAlign: 'center' }}>
              <h3 className="product-title">{artist.name}</h3>
              <p style={{ color: 'var(--text-muted)', marginBottom: '1rem', fontStyle: 'italic' }}>{artist.genre}</p>
              <p style={{ fontSize: '0.9rem', color: '#cbd5e1' }}>{artist.bio}</p>
            </div>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

// PAGE PROFIL ARTISTE
const ArtisteProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [artist, setArtist] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArtist = async () => {
      try {
        const docRef = doc(db, "artists", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setArtist({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Erreur fetch artiste :", error);
      } finally {
        setLoading(false);
      }
    };
    fetchArtist();
  }, [id]);

  if (loading) {
    return (
      <div className="section container flex-center" style={{ minHeight: '80vh' }}>
        <p className="text-muted" style={{ fontSize: '1.2rem' }}>Chargement depuis Firestore...</p>
      </div>
    );
  }

  if (!artist) {
    return (
      <div className="section container flex-center" style={{ minHeight: '80vh', flexDirection: 'column' }}>
        <h2>Artiste Introuvable</h2>
        <button className="btn-secondary mt-4" onClick={() => navigate('/artistes')}>Retour aux artistes</button>
      </div>
    );
  }

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      {/* Cover Header */}
      <div style={{
        height: '60vh',
        minHeight: '400px',
        width: '100%',
        backgroundImage: `linear-gradient(to top, var(--bg-dark) 0%, rgba(9,5,13,0.3) 100%), url(${artist.cover})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'flex-end',
        paddingBottom: '3rem'
      }}>
        <div className="container" style={{ width: '100%', padding: '0 2rem' }}>
          <button onClick={() => navigate('/artistes')} style={{ background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', color: 'white', padding: '0.5rem 1rem', borderRadius: '50px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2rem', backdropFilter: 'blur(10px)' }}>
            <ArrowLeft size={16} /> Retour
          </button>

          <h1 style={{ fontSize: 'clamp(4rem, 10vw, 7rem)', lineHeight: 1, marginBottom: '0.5rem', textTransform: 'uppercase' }}>{artist.name}</h1>
          <p style={{ color: 'var(--primary-color)', fontSize: '1.2rem', fontWeight: 600, letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '2rem' }}>{artist.genre}</p>

          <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
            <button className="btn-primary" style={{ gap: '0.5rem' }}>
              <PlayCircle size={20} /> Écouter sur Spotify
            </button>
            <button className="btn-secondary" style={{ gap: '0.5rem' }}>
              <Video size={18} /> Voir les clips
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: '4rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem' }}>

          {/* Colonne Gauche : Bio */}
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <User color="var(--secondary-color)" /> Biographie
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: 1.8, marginBottom: '2rem' }}>
              {artist.fullBio}
            </p>

            <div className="glass-panel" style={{ padding: '1.5rem', background: 'linear-gradient(135deg, rgba(244, 63, 94, 0.1), rgba(109, 40, 217, 0.1))' }}>
              <h4 style={{ marginBottom: '1rem' }}>Soutenir {artist.name}</h4>
              <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1.5rem' }}>Achetez du merchandising officiel pour soutenir directement cet artiste.</p>
              <Link to="/store" className="btn-primary" style={{ width: '100%', padding: '0.8rem', fontSize: '1rem' }}>Voir la boutique</Link>
            </div>
          </div>

          {/* Colonne Droite : Musiques & Dates */}
          <div>
            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Music color="var(--primary-color)" /> Top Titres
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3rem' }}>
              {artist.latestTracks.map((track, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', background: 'var(--bg-card)', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                    <div style={{ color: 'var(--text-muted)', fontWeight: 800, width: '20px' }}>{i + 1}</div>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{track.title}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{track.plays} écoutes</p>
                    </div>
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{track.duration}</div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Calendar color="var(--primary-color)" /> Tournée
            </h3>
            {artist.upcomingGigs.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {artist.upcomingGigs.map((gig, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.2rem', background: 'rgba(0,0,0,0.3)', borderRadius: '15px', borderLeft: '4px solid var(--primary-color)' }}>
                    <div>
                      <h4 style={{ color: 'white', marginBottom: '0.2rem' }}>{gig.venue}</h4>
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{gig.city}</p>
                    </div>
                    <div style={{ textAlign: 'center', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '10px' }}>
                      <div style={{ fontWeight: 800, color: 'var(--secondary-color)' }}>{gig.date.split(' ')[0]}</div>
                      <div style={{ fontSize: '0.8rem', textTransform: 'uppercase' }}>{gig.date.split(' ')[1]}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center' }}>
                <p className="text-muted">Aucune date prévue actuellement. L'artiste est peut-être en studio !</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const Store = () => {
  const { addToCart } = useContext(AppContext);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="section container">
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: 'clamp(3rem, 8vw, 4rem)' }}>Boutique <span className="text-gradient">Premium</span></h2>
        <p className="text-muted mt-4" style={{ fontSize: '1.2rem' }}>Soutenez l'art. Portez la vision. Accédez à l'exclusif.</p>
      </div>

      <div className="grid-cards">

        {/* Produit Merchandising avec Image */}
        <div className="product-card">
          <div className="product-image-wrapper">
            <img src="https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80" alt="Hoodie Infini Logo" className="product-image" />
            <div className="product-overlay">
              <button
                className="btn-primary"
                style={{ width: '100%', gap: '0.5rem' }}
                onClick={(e) => { e.preventDefault(); addToCart({ name: 'Hoodie "Infini Origin"', price: 35000 }); }}
              >
                <ShoppingBag size={20} /> Ajouter
              </button>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">Hoodie "Infini Origin"</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Coton lourd 100% bio. Broderie haute précision.</p>
            <div className="product-price">35.000 FC</div>
          </div>
        </div>

        {/* Vinyle */}
        <div className="product-card">
          <div className="product-image-wrapper">
            <img src="https://images.unsplash.com/photo-1603048297172-c92544798d5e?auto=format&fit=crop&w=800&q=80" alt="Vinyle The Zenith" className="product-image" />
            <div className="product-overlay">
              <button
                className="btn-primary"
                style={{ width: '100%', gap: '0.5rem' }}
                onClick={(e) => { e.preventDefault(); addToCart({ name: 'Vinyle "The Zenith - EP"', price: 25000 }); }}
              >
                <ShoppingBag size={20} /> Ajouter
              </button>
            </div>
          </div>
          <div className="product-info">
            <h3 className="product-title">Vinyle "The Zenith - Debut EP"</h3>
            <p className="text-muted" style={{ fontSize: '0.9rem', marginBottom: '1rem' }}>Édition limitée dédicacée. Pressage 180g.</p>
            <div className="product-price">25.000 FC</div>
          </div>
        </div>

        {/* Fan Club VIP (Carte de Service) */}
        <div className="glass-panel" style={{ borderTop: '4px solid var(--secondary-color)', background: 'linear-gradient(180deg, rgba(244, 63, 94, 0.08) 0%, rgba(15, 10, 20, 0.4) 100%)', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
            <h3 style={{ fontSize: '2rem' }}>Passe VIP</h3>
            <div style={{ background: 'var(--secondary-color)', padding: '0.8rem', borderRadius: '50%' }}>
              <Star color="white" size={28} />
            </div>
          </div>
          <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', fontFamily: 'Outfit', color: 'white', lineHeight: 1 }}>
            15.000<span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: '500' }}> FC/mois</span>
          </div>
          <ul style={{ listStyle: 'none', padding: '0', marginBottom: '3rem', flexGrow: 1 }}>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '1.2rem' }}><CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} /> <span className="text-muted">Écoute Inédite (1 sem. avant sortie)</span></li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '1.2rem' }}><CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} /> <span className="text-muted">Accès Backstage aux concerts</span></li>
            <li style={{ display: 'flex', alignItems: 'flex-start', gap: '0.8rem', marginBottom: '1.2rem' }}><CheckCircle2 size={20} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} /> <span className="text-muted">-20% sur tout le Merchandising</span></li>
          </ul>
          <button
            className="btn-primary"
            style={{ width: '100%', background: 'linear-gradient(135deg, var(--secondary-color), #be123c)' }}
            onClick={() => addToCart({ name: 'Abonnement VIP Infini (1 mois)', price: 15000 })}
          >
            S'abonner maintenant
          </button>
        </div>
      </div>
    </motion.div>
  );
};

const PortailPro = () => {
  const { addToCart } = useContext(AppContext);
  const [demoSent, setDemoSent] = useState(false);

  const handleDemoSubmit = (e) => {
    e.preventDefault();
    setTimeout(() => setDemoSent(true), 1000);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="section container">
      <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
        <h2 style={{ fontSize: 'clamp(3rem, 8vw, 4rem)' }}>Portail <span className="text-gradient">Pro</span></h2>
        <p className="text-muted mt-4" style={{ fontSize: '1.2rem' }}>Services techniques et détection de talents pour les indépendants.</p>
      </div>

      <div className="grid-cards">

        {/* Formulaire de Soumission */}
        <div className="glass-panel">
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Upload size={24} color="var(--primary-color)" /> Envoyer une Démo</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2.5rem' }}>Notre équipe A&R écoute toutes les maquettes soumises (Gratuit).</p>

          {demoSent ? (
            <div style={{ textAlign: 'center', padding: '3rem 2rem', background: 'rgba(16, 185, 129, 0.05)', borderRadius: '15px', border: '1px solid rgba(16, 185, 129, 0.2)' }}>
              <CheckCircle2 color="#10b981" size={56} style={{ margin: '0 auto 1.5rem auto' }} />
              <h4 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Piste Transmise !</h4>
              <p className="text-muted">Si notre équipe a le coup de cœur, nous vous contacterons sous 7 jours.</p>
              <button className="btn-secondary mt-4" onClick={() => setDemoSent(false)}>Soumettre un autre titre</button>
            </div>
          ) : (
            <form onSubmit={handleDemoSubmit}>
              <label className="form-label">Nom de l'Artiste / Groupe</label>
              <input type="text" className="form-control" required />

              <label className="form-label">Adresse Email</label>
              <input type="email" className="form-control" required />

              <label className="form-label">Lien vers la piste (Soundcloud, Drive...)</label>
              <input type="url" className="form-control" required />

              <button type="submit" className="btn-secondary" style={{ width: '100%', marginTop: '1rem' }}>Soumettre la Démo</button>
            </form>
          )}
        </div>

        {/* Studio Service */}
        <div className="glass-panel" style={{ borderTop: '4px solid #10b981', background: 'linear-gradient(180deg, rgba(16, 185, 129, 0.05) 0%, rgba(15, 10, 20, 0.4) 100%)', display: 'flex', flexDirection: 'column' }}>
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.8rem' }}><Settings size={24} color="#10b981" /> Studio Mastering</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>Faites propulser vos fréquences aux standards de l'industrie par nos ingénieurs.</p>
          <div style={{ fontSize: '3rem', fontWeight: '900', marginBottom: '1.5rem', color: 'white', fontFamily: 'Outfit', lineHeight: 1 }}>
            50.000<span style={{ fontSize: '1.2rem', color: 'var(--text-muted)', fontWeight: '500' }}> FC/titre</span>
          </div>
          <ul style={{ listStyle: 'none', padding: '0', marginBottom: '3rem', flexGrow: 1 }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', color: 'var(--text-muted)' }}><CheckCircle2 size={20} color="#10b981" /> Livraison Express 72h</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', color: 'var(--text-muted)' }}><CheckCircle2 size={20} color="#10b981" /> 2 Révisions Audio</li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem', color: 'var(--text-muted)' }}><CheckCircle2 size={20} color="#10b981" /> Optimisé Streaming (Lufs)</li>
          </ul>
          <button
            className="btn-primary"
            style={{ width: '100%', background: 'linear-gradient(135deg, #10b981, #059669)' }}
            onClick={() => addToCart({ name: 'Session Mix/Master Premium', price: 50000 })}
          >
            Ajouter au panier
          </button>
        </div>
      </div>
    </motion.div>
  );
}

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isAuthenticated, currentUser, userData } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Petit délai le temps que Firebase vérifie la session
    const timeout = setTimeout(() => {
      if (!isAuthenticated && !currentUser) {
        navigate('/auth');
      } else if (currentUser) {
        // Fetch historique d'achat personnel
        const fetchOrders = async () => {
          try {
            const q = query(collection(db, "orders"), where("userId", "==", currentUser.uid));
            const querySnapshot = await getDocs(q);
            const userOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            // Trier par date la plus récente
            userOrders.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
            setOrders(userOrders);
          } catch (e) {
            console.error("Erreur récupération historique d'achat", e);
          }
        };
        fetchOrders();
      }
    }, 1500);
    return () => clearTimeout(timeout);
  }, [isAuthenticated, currentUser, navigate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (e) {
      console.error('Erreur déconnexion', e);
    }
  };

  if (!isAuthenticated || !currentUser) return (
    <div className="section container flex-center" style={{ minHeight: '80vh' }}>
      <p className="text-muted">Vérification de la session en cours...</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="section container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary-color), var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(109, 40, 217, 0.4)', fontSize: '2rem', fontWeight: '800' }}>
          {userData?.name ? userData.name[0].toUpperCase() : (currentUser.email ? currentUser.email[0].toUpperCase() : <User size={36} color="white" />)}
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.2rem' }}>Bonjour, {userData?.name || 'Artiste'}</h2>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>{currentUser.email}</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div className="dashboard-menu">
            <button className={`dashboard-menu-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <BarChart size={20} /> Vue d'ensemble
            </button>
            <button className={`dashboard-menu-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
              <ShoppingBag size={20} /> Historique Achat
            </button>
            <button className={`dashboard-menu-item ${activeTab === 'settings' ? 'active' : ''}`} onClick={() => setActiveTab('settings')}>
              <Settings size={20} /> Compte & Sécurité
            </button>
            {userData?.role === 'admin' && (
              <button className="dashboard-menu-item" onClick={() => navigate('/admin')} style={{ color: 'var(--primary-color)' }}>
                <Settings size={20} /> Espace Administrateur
              </button>
            )}
            <button className="dashboard-menu-item" onClick={handleLogout} style={{ color: '#f43f5e', marginTop: 'auto' }}>
              <LogOut size={20} /> Déconnexion
            </button>
          </div>
        </div>

        <div className="glass-panel">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 style={{ marginBottom: '2.5rem', fontSize: '1.8rem' }}>Tableau de bord</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '20px' }}>
                  <p className="text-muted" style={{ marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Abonnement Actuel</p>
                  <h4 style={{ color: 'var(--secondary-color)', fontSize: '1.4rem' }}>Aucun (Standard)</h4>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '20px' }}>
                  <p className="text-muted" style={{ marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Démos Envoyées / Refusées</p>
                  <h4 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>0</h4>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Historique d'Achats</h3>
              {orders.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '4rem 0', opacity: 0.5 }}>
                  <ShoppingBag size={48} style={{ marginBottom: '1rem' }} />
                  <p className="text-muted">Aucune commande pour le moment.</p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {orders.map((order, idx) => (
                    <div key={idx} style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '1.5rem', borderRadius: '15px' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <div>
                          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.2rem' }}>Commande du {order.createdAt?.toDate().toLocaleDateString('fr-FR')}</p>
                          <p style={{ fontWeight: 'bold' }}>Total: {order.total.toLocaleString()} FC <span style={{ color: 'var(--secondary-color)', fontSize: '0.9rem', marginLeft: '0.5rem', border: '1px solid var(--secondary-color)', padding: '2px 6px', borderRadius: '8px' }}>{order.paymentMethod.toUpperCase()}</span></p>
                        </div>
                        <div style={{ background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', padding: '0.4rem 1rem', borderRadius: '50px', fontSize: '0.9rem', fontWeight: 'bold' }}>
                          Réglée
                        </div>
                      </div>
                      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                        {order.items.map((item, i) => (
                          <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.95rem', marginBottom: '0.5rem' }}>
                            <span>1x {item.name}</span>
                            <span className="text-muted">{item.price.toLocaleString()} FC</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem' }}>Configuration</h3>
              <p className="text-muted">Ces paramètres globaux seront disponibles dans une version ultérieure.</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const { isAuthenticated, currentUser, userData } = useContext(AppContext);
  const [allOrders, setAllOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isAuthenticated || !currentUser) {
        navigate('/auth');
      } else if (userData && userData.role !== 'admin') {
        navigate('/dashboard');
      } else if (userData && userData.role === 'admin') {
        // Fetch TOUTES les commandes pour l'admin panel
        const fetchAllOrders = async () => {
          try {
            const querySnapshot = await getDocs(collection(db, "orders"));
            const fetchedOrders = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            fetchedOrders.sort((a, b) => b.createdAt.toDate() - a.createdAt.toDate());
            setAllOrders(fetchedOrders);
          } catch (e) {
            console.error("Erreur admin orders", e);
          }
        };
        fetchAllOrders();
      }
    }, 1000);
    return () => clearTimeout(timeout);
  }, [isAuthenticated, currentUser, userData, navigate]);

  if (!isAuthenticated || !currentUser || !userData || userData.role !== 'admin') return (
    <div className="section container flex-center" style={{ minHeight: '80vh' }}>
      <p className="text-muted">Vérification des droits d'administration en cours...</p>
    </div>
  );

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="section container">
      <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '4rem' }}>
        <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #f43f5e, var(--secondary-color))', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 10px 20px rgba(244, 63, 94, 0.4)', fontSize: '2rem', fontWeight: '800' }}>
          <Settings size={36} color="white" />
        </div>
        <div>
          <h2 style={{ fontSize: '2.5rem', marginBottom: '0.2rem' }}>Administration <span style={{ fontSize: '1rem', color: 'var(--primary-color)', verticalAlign: 'middle', border: '1px solid var(--primary-color)', padding: '2px 8px', borderRadius: '10px' }}>PRO</span></h2>
          <p className="text-muted" style={{ fontSize: '1.1rem' }}>Espace réservé aux développeurs & Mngt</p>
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="glass-panel" style={{ padding: '2rem' }}>
          <div className="dashboard-menu">
            <button className={`dashboard-menu-item ${activeTab === 'overview' ? 'active' : ''}`} onClick={() => setActiveTab('overview')}>
              <BarChart size={20} /> Vue Générale
            </button>
            <button className={`dashboard-menu-item ${activeTab === 'artists' ? 'active' : ''}`} onClick={() => setActiveTab('artists')}>
              <Mic2 size={20} /> Gestion Artistes
            </button>
            <button className={`dashboard-menu-item ${activeTab === 'store' ? 'active' : ''}`} onClick={() => setActiveTab('store')}>
              <ShoppingBag size={20} /> Boutique & Stocks
            </button>
            <button className={`dashboard-menu-item ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>
              <CheckCircle2 size={20} /> Toutes les Commandes
            </button>
            <button className="dashboard-menu-item" onClick={() => navigate('/dashboard')} style={{ marginTop: 'auto' }}>
              <ArrowLeft size={20} /> Retour au Site
            </button>
          </div>
        </div>

        <div className="glass-panel">
          {activeTab === 'overview' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 style={{ marginBottom: '2.5rem', fontSize: '1.8rem' }}>Vue d'ensemble du Site</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '3rem' }}>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '20px' }}>
                  <p className="text-muted" style={{ marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Ventes Store</p>
                  <h4 style={{ color: 'var(--primary-color)', fontSize: '1.8rem' }}>{allOrders.reduce((acc, curr) => acc + curr.total, 0).toLocaleString()} <span style={{ fontSize: '1rem' }}>FC</span></h4>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '20px' }}>
                  <p className="text-muted" style={{ marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Commandes</p>
                  <h4 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>{allOrders.length}</h4>
                </div>
                <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.05)', padding: '2rem', borderRadius: '20px' }}>
                  <p className="text-muted" style={{ marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Nouveaux Fans</p>
                  <h4 style={{ fontSize: '1.8rem', fontFamily: 'Outfit' }}>--</h4>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'artists' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 style={{ marginBottom: '2.5rem', fontSize: '1.8rem' }}>Gestion des Artistes</h3>
              <div style={{ background: 'rgba(244, 63, 94, 0.05)', border: '1px solid rgba(244, 63, 94, 0.2)', padding: '2rem', borderRadius: '20px', marginBottom: '3rem' }}>
                <h4 style={{ marginBottom: '1rem' }}>Initialisation Firestore (Test)</h4>
                <p className="text-muted" style={{ marginBottom: '1.5rem', fontSize: '0.95rem' }}>Déployez les données factices initiales dans Firebase pour peupler la page Artiste si elle est vide.</p>
                <button className="btn-primary" style={{ width: '100%' }} onClick={async () => {
                  if (!window.confirm("Envoyer les artistes (Lynx, Nova...) sur Firestore ?")) return;
                  try {
                    for (const artist of INITIAL_ARTISTS) {
                      await setDoc(doc(db, "artists", artist.id), artist);
                    }
                    alert("Succès ! Les artistes sont en ligne.");
                  } catch (e) {
                    console.error(e);
                    alert("Erreur d'écriture Firebase.");
                  }
                }}>
                  <Upload size={18} style={{ marginRight: '0.5rem' }} /> Injecter les données
                </button>
              </div>
            </motion.div>
          )}

          {activeTab === 'store' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 style={{ marginBottom: '2.5rem', fontSize: '1.8rem' }}>Boutique & Produits</h3>
              <p className="text-muted">L'ajout de produits dynamiques depuis cet espace (T-shirts, Casquettes, CDs) arrivera dans une prochaine mise à jour.</p>
            </motion.div>
          )}

          {activeTab === 'orders' && (
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
              <h3 style={{ marginBottom: '2rem', fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <ShoppingBag size={24} color="var(--primary-color)" /> Commandes Validées
              </h3>
              {allOrders.length === 0 ? (
                <p className="text-muted" style={{ fontSize: '1rem', marginTop: '2rem' }}>Aucune commande passée sur la plateforme.</p>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse', marginTop: '1rem', fontSize: '0.95rem' }}>
                    <thead>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                        <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Date</th>
                        <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Client / Email</th>
                        <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Montant</th>
                        <th style={{ padding: '1rem 0', color: 'var(--text-muted)' }}>Paiement</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allOrders.map((o, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                          <td style={{ padding: '1rem 0' }}>{o.createdAt?.toDate().toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}</td>
                          <td style={{ padding: '1rem 0', fontWeight: 'bold' }}>{o.userEmail}</td>
                          <td style={{ padding: '1rem 0', color: 'white' }}>{o.total.toLocaleString()} FC</td>
                          <td style={{ padding: '1rem 0' }}>
                            <span style={{ fontSize: '0.8rem', border: '1px solid var(--primary-color)', color: 'var(--primary-color)', padding: '2px 8px', borderRadius: '10px' }}>
                              {o.paymentMethod.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
}

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/artistes" element={<Artistes />} />
          <Route path="/artistes/:id" element={<ArtisteProfile />} />
          <Route path="/store" element={<Store />} />
          <Route path="/pro" element={<PortailPro />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  );
};

function App() {
  return (
    <AppProvider>
      <Router>
        <CartSidebar />
        <AnimatedRoutes />
      </Router>
    </AppProvider>
  );
}

export default App;
