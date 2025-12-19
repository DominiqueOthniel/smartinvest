import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Icon from '../AppIcon';

const UserContextIndicator = ({ 
  userName = 'Kofi Mensah',
  userInitials = 'KM',
  portfolioValue = 125000,
  currency = 'CFA'
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef?.current && !dropdownRef?.current?.contains(event?.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <div className="header-user-context" onClick={handleToggle}>
        <div className="header-user-avatar">{userInitials}</div>
        <div className="header-user-info">
          <span className="header-user-name">{userName}</span>
          <span className="header-user-balance">
            {portfolioValue?.toLocaleString('fr-FR')} {currency}
          </span>
        </div>
        <Icon 
          name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
          size={16} 
          color="var(--color-muted-foreground)" 
        />
      </div>
      <div className={`user-dropdown ${isOpen ? 'open' : ''}`}>
        <Link to="/account-settings" className="user-dropdown-item" onClick={() => setIsOpen(false)}>
          <Icon name="User" size={18} />
          <span>Mon Profil</span>
        </Link>
        <Link to="/investment-dashboard" className="user-dropdown-item" onClick={() => setIsOpen(false)}>
          <Icon name="Wallet" size={18} />
          <span>Mon Portefeuille</span>
        </Link>
        <Link to="/account-settings" className="user-dropdown-item" onClick={() => setIsOpen(false)}>
          <Icon name="Settings" size={18} />
          <span>Paramètres</span>
        </Link>
        <div className="user-dropdown-divider" />
        <Link to="/investment-history" className="user-dropdown-item" onClick={() => setIsOpen(false)}>
          <Icon name="History" size={18} />
          <span>Historique</span>
        </Link>
        <div className="user-dropdown-item" onClick={handleLogout}>
          <Icon name="LogOut" size={18} />
          <span>Déconnexion</span>
        </div>
      </div>
    </div>
  );
};

export default UserContextIndicator;