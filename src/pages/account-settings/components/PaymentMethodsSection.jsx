import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentMethodsSection = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [cardData, setCardData] = useState({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: '',
    billingCountry: 'ci'
  });
  const [cardErrors, setCardErrors] = useState({});
  const [isAddingCard, setIsAddingCard] = useState(false);
  const [removingCardId, setRemovingCardId] = useState(null);

  const savedCards = [
    {
      id: 1,
      type: 'visa',
      last4: '4242',
      expiryMonth: '12',
      expiryYear: '2026',
      holderName: 'Kofi Mensah',
      isDefault: true
    },
    {
      id: 2,
      type: 'mastercard',
      last4: '8888',
      expiryMonth: '08',
      expiryYear: '2027',
      holderName: 'Kofi Mensah',
      isDefault: false
    }
  ];

  const countryOptions = [
    { value: 'ci', label: 'Côte d\'Ivoire' },
    { value: 'sn', label: 'Sénégal' },
    { value: 'ml', label: 'Mali' },
    { value: 'bf', label: 'Burkina Faso' },
    { value: 'bj', label: 'Bénin' },
    { value: 'tg', label: 'Togo' },
    { value: 'ne', label: 'Niger' },
    { value: 'cm', label: 'Cameroun' },
    { value: 'ga', label: 'Gabon' },
    { value: 'cg', label: 'Congo' }
  ];

  const getCardIcon = (type) => {
    switch (type) {
      case 'visa':
        return 'CreditCard';
      case 'mastercard':
        return 'CreditCard';
      default:
        return 'CreditCard';
    }
  };

  const getCardBrandColor = (type) => {
    switch (type) {
      case 'visa':
        return 'text-blue-500';
      case 'mastercard':
        return 'text-orange-500';
      default:
        return 'text-muted-foreground';
    }
  };

  const handleCardInputChange = (e) => {
    const { name, value } = e?.target;
    let formattedValue = value;

    if (name === 'cardNumber') {
      formattedValue = value?.replace(/\s/g, '')?.replace(/(\d{4})/g, '$1 ')?.trim();
    } else if (name === 'expiryDate') {
      formattedValue = value?.replace(/\D/g, '')?.replace(/(\d{2})(\d{0,2})/, '$1/$2')?.substr(0, 5);
    } else if (name === 'cvv') {
      formattedValue = value?.replace(/\D/g, '')?.substr(0, 3);
    }

    setCardData(prev => ({ ...prev, [name]: formattedValue }));
    if (cardErrors?.[name]) {
      setCardErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setCardData(prev => ({ ...prev, [name]: value }));
  };

  const validateCardForm = () => {
    const newErrors = {};

    if (!cardData?.cardNumber?.replace(/\s/g, '')) {
      newErrors.cardNumber = 'Le numéro de carte est requis';
    } else if (cardData?.cardNumber?.replace(/\s/g, '')?.length !== 16) {
      newErrors.cardNumber = 'Numéro de carte invalide';
    }

    if (!cardData?.cardHolder?.trim()) {
      newErrors.cardHolder = 'Le nom du titulaire est requis';
    }

    if (!cardData?.expiryDate) {
      newErrors.expiryDate = 'La date d\'expiration est requise';
    } else if (!/^\d{2}\/\d{2}$/?.test(cardData?.expiryDate)) {
      newErrors.expiryDate = 'Format invalide (MM/AA)';
    }

    if (!cardData?.cvv) {
      newErrors.cvv = 'Le CVV est requis';
    } else if (cardData?.cvv?.length !== 3) {
      newErrors.cvv = 'CVV invalide';
    }

    setCardErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleAddCard = async () => {
    if (!validateCardForm()) {
      return;
    }

    setIsAddingCard(true);

    setTimeout(() => {
      setIsAddingCard(false);
      setShowAddCard(false);
      setCardData({
        cardNumber: '',
        cardHolder: '',
        expiryDate: '',
        cvv: '',
        billingCountry: 'ci'
      });
    }, 1500);
  };

  const handleRemoveCard = async (cardId) => {
    setRemovingCardId(cardId);

    setTimeout(() => {
      setRemovingCardId(null);
    }, 1500);
  };

  const handleSetDefault = (cardId) => {
    console.log('Setting default card:', cardId);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
              <Icon name="CreditCard" size={20} color="var(--color-primary)" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">Moyens de paiement</h3>
              <p className="text-sm text-muted-foreground">Gérez vos cartes bancaires enregistrées</p>
            </div>
          </div>
          {!showAddCard && (
            <Button
              variant="outline"
              size="sm"
              iconName="Plus"
              iconPosition="left"
              onClick={() => setShowAddCard(true)}
            >
              Ajouter une carte
            </Button>
          )}
        </div>

        {showAddCard && (
          <div className="mb-6 p-6 bg-muted/50 rounded-lg border border-border">
            <h4 className="text-base font-semibold text-foreground mb-4">Ajouter une nouvelle carte</h4>
            
            <div className="space-y-4">
              <Input
                label="Numéro de carte"
                type="text"
                name="cardNumber"
                value={cardData?.cardNumber}
                onChange={handleCardInputChange}
                error={cardErrors?.cardNumber}
                placeholder="1234 5678 9012 3456"
                maxLength={19}
                required
              />

              <Input
                label="Nom du titulaire"
                type="text"
                name="cardHolder"
                value={cardData?.cardHolder}
                onChange={handleCardInputChange}
                error={cardErrors?.cardHolder}
                placeholder="Nom tel qu'il apparaît sur la carte"
                required
              />

              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Date d'expiration"
                  type="text"
                  name="expiryDate"
                  value={cardData?.expiryDate}
                  onChange={handleCardInputChange}
                  error={cardErrors?.expiryDate}
                  placeholder="MM/AA"
                  required
                />

                <Input
                  label="CVV"
                  type="text"
                  name="cvv"
                  value={cardData?.cvv}
                  onChange={handleCardInputChange}
                  error={cardErrors?.cvv}
                  placeholder="123"
                  required
                />
              </div>

              <Select
                label="Pays de facturation"
                options={countryOptions}
                value={cardData?.billingCountry}
                onChange={(value) => handleSelectChange('billingCountry', value)}
              />

              <div className="flex items-center gap-3 pt-2">
                <Button
                  variant="default"
                  loading={isAddingCard}
                  iconName="Plus"
                  iconPosition="left"
                  onClick={handleAddCard}
                >
                  Ajouter la carte
                </Button>
                <Button
                  variant="outline"
                  onClick={() => {
                    setShowAddCard(false);
                    setCardData({
                      cardNumber: '',
                      cardHolder: '',
                      expiryDate: '',
                      cvv: '',
                      billingCountry: 'ci'
                    });
                    setCardErrors({});
                  }}
                  disabled={isAddingCard}
                >
                  Annuler
                </Button>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3">
          {savedCards?.map((card) => (
            <div
              key={card?.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-background flex items-center justify-center">
                  <Icon 
                    name={getCardIcon(card?.type)} 
                    size={24} 
                    className={getCardBrandColor(card?.type)} 
                  />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground">
                      •••• {card?.last4}
                    </h4>
                    {card?.isDefault && (
                      <span className="px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
                        Par défaut
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {card?.holderName} • Expire {card?.expiryMonth}/{card?.expiryYear}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!card?.isDefault && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleSetDefault(card?.id)}
                  >
                    Définir par défaut
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="Trash2"
                  loading={removingCardId === card?.id}
                  onClick={() => handleRemoveCard(card?.id)}
                >
                  Supprimer
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-start gap-3">
            <Icon name="ShieldCheck" size={20} color="var(--color-primary)" className="mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-1">Paiements sécurisés</h4>
              <p className="text-xs text-muted-foreground">
                Vos informations de paiement sont cryptées et sécurisées par Stripe. Nous ne stockons jamais vos données de carte complètes.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethodsSection;