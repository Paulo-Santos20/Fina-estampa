// src/components/common/Header/Header.jsx
// Header controlado por CMS via SettingsContext: promo bar, logo, busca, menu e botão de carrinho.

import React, { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useSettings } from '../../../contexts/SettingsContext.jsx';
import { useCart } from '../../../contexts/CartContext.jsx';

function classNames(...args) {
  return args.filter(Boolean).join(' ');
}

export default function Header() {
  const navigate = useNavigate();
  const { settings, getWhatsAppLink } = useSettings();
  const { itemsCount, openCart } = useCart();
  const [mobileOpen, setMobileOpen] = useState(false);

  const promo = settings?.header?.promoBar;
  const brand = settings?.brand;
  const menu = settings?.header?.menu?.categories || [];
  const searchCfg = settings?.header?.search;

  const onSearchSubmit = (e) => {
    e.preventDefault();
    const q = new FormData(e.currentTarget).get('q')?.toString().trim();
    if (!q) return;
    navigate(`/catalog?q=${encodeURIComponent(q)}`);
  };

  return (
    <>
      {promo?.enabled && (
        <div
          role="region"
          aria-label="Promoção"
          style={{
            background: promo.background || '#722F37',
            color: promo.color || '#FFFFFF',
            fontSize: 14,
            textAlign: 'center',
            padding: '6px 12px',
          }}
        >
          {promo.text}
        </div>
      )}

      <header
        style={{
          borderBottom: '1px solid #F0F0F0',
          background: '#FFFFFF',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            padding: '10px 16px',
          }}
        >
          <button
            type="button"
            aria-label={mobileOpen ? 'Fechar menu' : 'Abrir menu'}
            onClick={() => setMobileOpen((v) => !v)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 40,
              height: 40,
              background: 'transparent',
              border: '1px solid #EEE',
              borderRadius: 8,
              cursor: 'pointer',
            }}
            className="lg-hidden"
          >
            <span style={{ width: 18, height: 2, background: '#000', display: 'block' }} />
          </button>

          <Link to="/" aria-label="Página inicial" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, textDecoration: 'none' }}>
            {brand?.logoUrl ? (
              <img
                src={brand.logoUrl}
                alt={brand?.name || 'Fina Estampa'}
                style={{ height: 36, width: 'auto' }}
              />
            ) : (
              <span style={{ fontWeight: 700, fontSize: 20, color: '#000' }}>
                {brand?.name || 'Fina Estampa'}
              </span>
            )}
          </Link>

          {searchCfg?.enabled && (
            <form
              onSubmit={onSearchSubmit}
              role="search"
              style={{ flex: 1, display: 'none', alignItems: 'center', gap: 8, maxWidth: 520 }}
              className="md-flex"
            >
              <input
                type="search"
                name="q"
                placeholder={searchCfg.placeholder || 'Buscar produtos...'}
                aria-label="Buscar produtos"
                style={{
                  flex: 1,
                  padding: '10px 12px',
                  borderRadius: 8,
                  border: '1px solid #E5E7EB',
                  outline: 'none',
                }}
              />
              <button
                type="submit"
                style={{
                  background: '#722F37',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: 8,
                  padding: '10px 14px',
                  cursor: 'pointer',
                  fontWeight: 600,
                }}
              >
                Buscar
              </button>
            </form>
          )}

          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: 12 }}>
            {settings?.header?.whatsapp?.enabled && (
              <a
                href={getWhatsAppLink()}
                
                rel="noreferrer"
                aria-label="Fale no WhatsApp"
                style={{
                  textDecoration: 'none',
                  background: '#25D366',
                  color: '#FFFFFF',
                  padding: '8px 12px',
                  borderRadius: 999,
                  fontWeight: 600,
                }}
              >
                WhatsApp
              </a>
            )}

            <button
              type="button"
              onClick={openCart}
              aria-label="Abrir carrinho"
              style={{
                position: 'relative',
                background: '#FFFFFF',
                border: '1px solid #EEE',
                borderRadius: 8,
                padding: '8px 12px',
                cursor: 'pointer',
                fontWeight: 600,
              }}
            >
              Carrinho
              {itemsCount > 0 && (
                <span
                  aria-label={`${itemsCount} itens no carrinho`}
                  style={{
                    position: 'absolute',
                    top: -8,
                    right: -8,
                    background: '#722F37',
                    color: '#FFF',
                    borderRadius: 999,
                    padding: '2px 6px',
                    fontSize: 12,
                    minWidth: 20,
                    textAlign: 'center',
                    lineHeight: '16px',
                  }}
                >
                  {itemsCount}
                </span>
              )}
            </button>
          </div>
        </div>

        <nav
          aria-label="Categorias"
          style={{
            display: 'none',
            borderTop: '1px solid #F0F0F0',
            borderBottom: '1px solid #F0F0F0',
            background: '#FFFFFF',
          }}
          className="lg-block"
        >
          <div style={{ maxWidth: 1200, margin: '0 auto', padding: '8px 16px', display: 'flex', gap: 20 }}>
            {menu.map((cat) => (
              <div key={cat.slug} style={{ position: 'relative' }}>
                <NavLink
                  to={`/catalog/${cat.slug}`}
                  className={({ isActive }) => classNames('nav-link', isActive ? 'active' : '')}
                  style={{
                    textDecoration: 'none',
                    color: '#000',
                    fontWeight: 600,
                    padding: '6px 8px',
                    borderRadius: 6,
                  }}
                >
                  {cat.label}
                </NavLink>
                {Array.isArray(cat.children) && cat.children.length > 0 && (
                  <div
                    role="menu"
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      background: '#FFFFFF',
                      border: '1px solid #EEE',
                      borderRadius: 8,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      padding: 8,
                      display: 'none',
                    }}
                    className="submenu"
                  >
                    {cat.children.map((sub) => (
                      <Link
                        key={sub}
                        to={`/catalog/${cat.slug}?sub=${encodeURIComponent(sub)}`}
                        style={{
                          display: 'block',
                          textDecoration: 'none',
                          color: '#333',
                          padding: '6px 10px',
                          borderRadius: 6,
                        }}
                      >
                        {sub}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </nav>

        {mobileOpen && (
          <div
            role="dialog"
            aria-label="Menu"
            style={{
              borderTop: '1px solid #EEE',
              background: '#FFFFFF',
              padding: 12,
            }}
          >
            {searchCfg?.enabled && (
              <form onSubmit={onSearchSubmit} role="search" style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
                <input
                  type="search"
                  name="q"
                  placeholder={searchCfg.placeholder || 'Buscar produtos...'}
                  aria-label="Buscar produtos"
                  style={{
                    flex: 1,
                    padding: '10px 12px',
                    borderRadius: 8,
                    border: '1px solid #E5E7EB',
                    outline: 'none',
                  }}
                />
                <button
                  type="submit"
                  style={{
                    background: '#722F37',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: 8,
                    padding: '10px 14px',
                    cursor: 'pointer',
                    fontWeight: 600,
                  }}
                >
                  Buscar
                </button>
              </form>
            )}
            <div style={{ display: 'grid', gap: 6 }}>
              {menu.map((cat) => (
                <div key={cat.slug}>
                  <Link
                    to={`/catalog/${cat.slug}`}
                    onClick={() => setMobileOpen(false)}
                    style={{ display: 'block', padding: '10px 8px', textDecoration: 'none', color: '#000', fontWeight: 600 }}
                  >
                    {cat.label}
                  </Link>
                  {Array.isArray(cat.children) && cat.children.length > 0 && (
                    <div style={{ paddingLeft: 8, display: 'grid', gap: 4 }}>
                      {cat.children.map((sub) => (
                        <Link
                          key={sub}
                          to={`/catalog/${cat.slug}?sub=${encodeURIComponent(sub)}`}
                          onClick={() => setMobileOpen(false)}
                          style={{ display: 'block', padding: '8px 8px', textDecoration: 'none', color: '#333' }}
                        >
                          {sub}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </header>
    </>
  );
}