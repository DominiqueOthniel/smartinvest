import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';


const PaymentMethodSection = ({ onPaymentMethodChange }) => {
  const [selectedMethod, setSelectedMethod] = useState('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });

  const paymentMethods = [
    {
      id: 'card',
      name: 'Carte Bancaire',
      description: 'Visa, Mastercard',
      icon: 'CreditCard',
      available: true
    },
    {
      id: 'mobile',
      name: 'Mobile Money',
      description: 'MTN, Orange, Moov',
      icon: 'Smartphone',
      available: true
    },
    {
      id: 'bank',
      name: 'Virement Bancaire',
      description: 'Transfert direct',
      icon: 'Building2',
      available: false
    }
  ];

  const handleMethodSelect = (methodId) => {
    setSelectedMethod(methodId);
    if (onPaymentMethodChange) {
      onPaymentMethodChange(methodId);
    }
  };

  const handleCardInputChange = (field, value) => {
    setCardDetails(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const cleaned = value?.replace(/\s/g, '');
    const formatted = cleaned?.match(/.{1,4}/g)?.join(' ') || cleaned;
    return formatted?.substring(0, 19);
  };

  const formatExpiryDate = (value) => {
    const cleaned = value?.replace(/\D/g, '');
    if (cleaned?.length >= 2) {
      return cleaned?.substring(0, 2) + '/' + cleaned?.substring(2, 4);
    }
    return cleaned;
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Méthode de Paiement</h3>
          <p className="text-sm text-muted-foreground">Sélectionnez votre mode de paiement sécurisé</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1.5 bg-success/10 border border-success/20 rounded-lg">
          <Icon name="Shield" size={16} color="var(--color-success)" />
          <span className="text-xs font-semibold text-success">Sécurisé SSL</span>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {paymentMethods?.map((method) => (
          <button
            key={method?.id}
            onClick={() => method?.available && handleMethodSelect(method?.id)}
            disabled={!method?.available}
            className={`relative p-4 rounded-lg border-2 transition-all ${
              selectedMethod === method?.id
                ? 'border-primary bg-primary/5'
                : method?.available
                ? 'border-border hover:border-primary/50 hover:bg-muted/50' :'border-border bg-muted/30 opacity-50 cursor-not-allowed'
            }`}
          >
            <div className="flex flex-col items-center gap-2 text-center">
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                selectedMethod === method?.id ? 'bg-primary/10' : 'bg-muted'
              }`}>
                <Icon 
                  name={method?.icon} 
                  size={24} 
                  color={selectedMethod === method?.id ? 'var(--color-primary)' : 'var(--color-muted-foreground)'} 
                />
              </div>
              <div>
                <p className={`text-sm font-semibold ${
                  selectedMethod === method?.id ? 'text-primary' : 'text-foreground'
                }`}>
                  {method?.name}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">{method?.description}</p>
              </div>
              {!method?.available && (
                <span className="absolute top-2 right-2 text-xs font-semibold text-warning bg-warning/10 px-2 py-0.5 rounded">
                  Bientôt
                </span>
              )}
            </div>
          </button>
        ))}
      </div>
      {selectedMethod === 'card' && (
        <div className="pt-4 border-t border-border space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Lock" size={16} color="var(--color-primary)" />
            <p className="text-sm font-semibold text-primary">Paiement Sécurisé par Stripe</p>
          </div>

          <Input
            label="Numéro de Carte"
            type="text"
            placeholder="1234 5678 9012 3456"
            value={cardDetails?.cardNumber}
            onChange={(e) => handleCardInputChange('cardNumber', formatCardNumber(e?.target?.value))}
            required
            maxLength={19}
          />

          <Input
            label="Nom sur la Carte"
            type="text"
            placeholder="KOFI MENSAH"
            value={cardDetails?.cardName}
            onChange={(e) => handleCardInputChange('cardName', e?.target?.value?.toUpperCase())}
            required
          />

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Date d'Expiration"
              type="text"
              placeholder="MM/AA"
              value={cardDetails?.expiryDate}
              onChange={(e) => handleCardInputChange('expiryDate', formatExpiryDate(e?.target?.value))}
              required
              maxLength={5}
            />

            <Input
              label="CVV"
              type="text"
              placeholder="123"
              value={cardDetails?.cvv}
              onChange={(e) => handleCardInputChange('cvv', e?.target?.value?.replace(/\D/g, '')?.substring(0, 3))}
              required
              maxLength={3}
            />
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <Icon name="Info" size={18} color="var(--color-muted-foreground)" />
            <p className="text-xs text-muted-foreground">
              Vos informations de paiement sont cryptées et sécurisées. Nous ne stockons jamais vos données bancaires.
            </p>
          </div>
        </div>
      )}
      {selectedMethod === 'mobile' && (
        <div className="pt-4 border-t border-border space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <Icon name="Smartphone" size={16} color="var(--color-primary)" />
            <p className="text-sm font-semibold text-primary">Paiement Mobile Money</p>
          </div>

          <Input
            label="Numéro de Téléphone"
            type="tel"
            placeholder="+225 XX XX XX XX XX"
            required
          />

          <div className="space-y-2">
            <label className="text-sm font-medium text-foreground">Opérateur</label>
            <div className="grid grid-cols-3 gap-3">
              {['MTN', 'Orange', 'Moov']?.map((operator) => (
                <button
                  key={operator}
                  className="p-3 border-2 border-border rounded-lg hover:border-primary hover:bg-primary/5 transition-all text-sm font-semibold text-foreground"
                >
                  {operator}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-start gap-3 p-4 bg-muted/50 rounded-lg">
            <Icon name="Info" size={18} color="var(--color-muted-foreground)" />
            <p className="text-xs text-muted-foreground">
              Vous recevrez une notification sur votre téléphone pour valider le paiement.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethodSection;