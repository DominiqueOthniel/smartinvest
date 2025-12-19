import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const HeaderComponent = () => {
  const location = useLocation();
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const navigationItems = [
    { label: 'Tableau de Bord', path: '/investment-dashboard', icon: 'LayoutDashboard' },
    { label: 'Opportunités', path: '/investment-opportunities', icon: 'TrendingUp' },
    { label: 'Historique', path: '/investment-history', icon: 'History' },
    { label: 'Communauté', path: '/community-chat', icon: 'MessageCircle' },
    { label: 'Mon Compte', path: '/account-settings', icon: 'User' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsUserDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleUserContextClick = () => {
    setIsUserDropdownOpen(!isUserDropdownOpen);
  };

  const handleLogout = () => {
    setIsUserDropdownOpen(false);
  };

  return (
    <header className="header">
      <div className="header-logo-container">
        <Link to="/investment-dashboard" className="header-logo">
          <Icon name="TrendingUp" size={24} color="#1A1A1A" />
        </Link>
        <span className="header-brand-text">SmartInvest Africa</span>
      </div>
      <nav className="header-nav">
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`header-nav-item ${location?.pathname === item?.path ? 'active' : ''}`}
          >
            <Icon name={item?.icon} size={18} />
            <span>{item?.label}</span>
          </Link>
        ))}
      </nav>
      <div className="header-user-section" ref={dropdownRef}>
        <div className="header-user-context" onClick={handleUserContextClick}>
          <div className="header-user-avatar">KM</div>
          <div className="header-user-info">
            <span className="header-user-name">Kofi Mensah</span>
            <span className="header-user-balance">125,000 CFA</span>
          </div>
          <Icon 
            name={isUserDropdownOpen ? 'ChevronUp' : 'ChevronDown'} 
            size={16} 
            color="var(--color-muted-foreground)" 
          />
        </div>

        <div className={`user-dropdown ${isUserDropdownOpen ? 'open' : ''}`}>
          <Link to="/account-settings" className="user-dropdown-item" onClick={() => setIsUserDropdownOpen(false)}>
            <Icon name="User" size={18} />
            <span>Mon Profil</span>
          </Link>
          <Link to="/investment-dashboard" className="user-dropdown-item" onClick={() => setIsUserDropdownOpen(false)}>
            <Icon name="Wallet" size={18} />
            <span>Mon Portefeuille</span>
          </Link>
          <div className="user-dropdown-divider" />
          <div className="user-dropdown-item" onClick={handleLogout}>
            <Icon name="LogOut" size={18} />
            <span>Déconnexion</span>
          </div>
        </div>
      </div>
    </header>
  );
};

const Header = HeaderComponent;

export default Header;
