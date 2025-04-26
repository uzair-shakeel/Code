import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import { RiMenu3Fill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  const navLinks = [
    { path: "/prequalification", label: "Prequalify" },
    { path: "/partners", label: "Partners" },
    { path: "/privacy", label: "Privacy" }
  ];

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    document.body.style.overflow = mobileMenuOpen ? 'hidden' : 'auto';

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'auto';
    };
  }, [mobileMenuOpen]);

  const currentYear = new Date().getFullYear();

  return (
    <>
      <header
        className={`bg-charcoal text-white py-4 px-4 md:px-8 fixed top-0 left-0 right-0 z-30 
          transition-shadow duration-300 ${scrolled ? 'shadow-custom border-b border-white/10' : ''}`}
      >
        <div className="w-full max-w-[1440px] mx-auto flex justify-between items-center">
          {/* Logo */}
          <Link to="/" className="text-2xl font-montserrat font-bold text-gold z-20">
            <img src={Logo} alt="Logo" className="h-[54px] md:h-16" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-lg hover:text-gold transition-colors duration-300"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden focus:outline-none relative z-50"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ?
              <IoMdClose size={30} className="text-gold" /> :
              <RiMenu3Fill size={30} />
            }
          </button>

          {/* Mobile Menu Overlay */}
          <div
            className={`fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden 
              transition-opacity duration-300 ${mobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          />

          {/* Mobile Menu */}
          <div
            ref={menuRef}
            className={`fixed top-0 right-0 h-full w-64 bg-charcoal shadow-lg z-40 
              transform transition-transform duration-300 ease-in-out md:hidden
              ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}
          >
            <div className="flex flex-col h-full">
              <div className="px-6 pt-[55px] pb-8 border-b border-gray-700"></div>

              {/* Mobile Navigation */}
              <nav className="flex flex-col px-6 py-8 space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className="text-lg hover:text-gold transition-colors duration-300 font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </nav>

              {/* Footer */}
              <div className="mt-auto px-6 py-8 border-t border-gray-700">
                <p className="text-sm text-gray-400 text-center">
                  © {currentYear} Your Company
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;