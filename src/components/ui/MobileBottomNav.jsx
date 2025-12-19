import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const MobileBottomNavComponent = () => {
  const location = useLocation();

  const navigationItems = [
    { label: 'Tableau', path: '/investment-dashboard', icon: 'LayoutDashboard' },
    { label: 'Opportunités', path: '/investment-opportunities', icon: 'TrendingUp' },
    { label: 'Historique', path: '/investment-history', icon: 'History' },
    { label: 'Compte', path: '/account-settings', icon: 'User' }
  ];

  return (
    <nav className="mobile-bottom-nav">
      <div className="mobile-nav-items">
        {navigationItems?.map((item) => (
          <Link
            key={item?.path}
            to={item?.path}
            className={`mobile-nav-item ${location?.pathname === item?.path ? 'active' : ''}`}
          >
            <Icon name={item?.icon} size={24} />
            <span className="mobile-nav-label">{item?.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

const MobileBottomNav = MobileBottomNavComponent;

export default MobileBottomNav;
