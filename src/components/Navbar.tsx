"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "#home", label: "خانه" },
    { href: "#collections", label: "محصولات" },
    { href: "#craftsmanship", label: "کیفیت ساخت" },
    { href: "#about", label: "درباره ما" },
    { href: "#contact", label: "تماس" },
  ];

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        isScrolled
          ? "bg-espresso/95 backdrop-blur-md shadow-lg py-3"
          : "bg-transparent py-6"
      )}
    >
      <div className="container-wide flex items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex items-center gap-3 group">
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-clay to-clay-deep flex items-center justify-center shadow-luxe transition-transform group-hover:scale-105">
            <span className="font-display text-cream text-xl font-bold">آ</span>
          </div>
          <div className="flex flex-col">
            <span
              className={cn(
                "font-display text-2xl font-bold tracking-wide transition-colors",
                isScrolled ? "text-cream" : "text-espresso"
              )}
            >
              آوین
            </span>
            <span
              className={cn(
                "text-xs uppercase tracking-[0.2em] transition-colors",
                isScrolled ? "text-sand/80" : "text-stone/70"
              )}
            >
              Avin Gallery
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm font-medium transition-colors link-underline",
                isScrolled
                  ? "text-cream/90 hover:text-cream"
                  : "text-espresso/80 hover:text-espresso"
              )}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA Button - Desktop */}
        <div className="hidden lg:block">
          <a
            href="#contact"
            className={cn(
              "btn-clay text-xs px-6 py-2.5",
              !isScrolled && "bg-espresso text-cream hover:bg-clay"
            )}
          >
            مشاوره رایگان
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className={cn(
            "lg:hidden p-2 rounded-full transition-colors",
            isScrolled
              ? "text-cream hover:bg-cream/10"
              : "text-espresso hover:bg-espresso/5"
          )}
          aria-label="منو"
        >
          {isMobileMenuOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <Menu className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden fixed inset-0 z-40 bg-espresso/98 backdrop-blur-xl transition-all duration-500",
          isMobileMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-2xl font-display font-bold text-cream hover:text-clay transition-colors"
              style={{
                transitionDelay: `${index * 50}ms`,
                opacity: isMobileMenuOpen ? 1 : 0,
                transform: isMobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setIsMobileMenuOpen(false)}
            className="btn-clay mt-4"
          >
            مشاوره رایگان
          </a>
        </div>
      </div>
    </header>
  );
}
