import React, { useState } from 'react';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PersonalProfileSection = () => {
  const [formData, setFormData] = useState({
    firstName: "Kofi",
    lastName: "Mensah",
    email: "kofi.mensah@email.com",
    phone: "+225 07 12 34 56 78",
    dateOfBirth: "1985-06-15",
    nationality: "ci",
    city: "Abidjan",
    address: "Cocody, Riviera Golf",
    postalCode: "01 BP 1234",
    riskTolerance: "moderate",
    investmentGoal: "growth",
    preferredCurrency: "xof",
    monthlyInvestmentBudget: "50000"
  });

  const [errors, setErrors] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const nationalityOptions = [
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

  const riskToleranceOptions = [
    { value: 'conservative', label: 'Conservateur', description: 'Préférence pour les investissements à faible risque' },
    { value: 'moderate', label: 'Modéré', description: 'Équilibre entre risque et rendement' },
    { value: 'aggressive', label: 'Agressif', description: 'Acceptation de risques élevés pour des rendements potentiels plus importants' }
  ];

  const investmentGoalOptions = [
    { value: 'income', label: 'Revenus réguliers', description: 'Générer des revenus passifs constants' },
    { value: 'growth', label: 'Croissance du capital', description: 'Augmenter la valeur du portefeuille à long terme' },
    { value: 'balanced', label: 'Équilibré', description: 'Combinaison de revenus et de croissance' },
    { value: 'preservation', label: 'Préservation du capital', description: 'Protéger le capital investi' }
  ];

  const currencyOptions = [
    { value: 'xof', label: 'Franc CFA (XOF)', description: 'Franc CFA de l\'Afrique de l\'Ouest' },
    { value: 'xaf', label: 'Franc CFA (XAF)', description: 'Franc CFA de l\'Afrique Centrale' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e?.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors?.[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData?.firstName?.trim()) {
      newErrors.firstName = 'Le prénom est requis';
    }
    
    if (!formData?.lastName?.trim()) {
      newErrors.lastName = 'Le nom est requis';
    }
    
    if (!formData?.email?.trim()) {
      newErrors.email = 'L\'email est requis';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      newErrors.email = 'Format d\'email invalide';
    }
    
    if (!formData?.phone?.trim()) {
      newErrors.phone = 'Le téléphone est requis';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) {
      return;
    }

    setIsSaving(true);
    
    setTimeout(() => {
      setIsSaving(false);
      setIsEditing(false);
    }, 1500);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="User" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Profil Personnel</h3>
            <p className="text-sm text-muted-foreground">Gérez vos informations personnelles</p>
          </div>
        </div>
        {!isEditing && (
          <Button
            variant="outline"
            size="sm"
            iconName="Edit2"
            iconPosition="left"
            onClick={() => setIsEditing(true)}
          >
            Modifier
          </Button>
        )}
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Prénom"
            type="text"
            name="firstName"
            value={formData?.firstName}
            onChange={handleInputChange}
            error={errors?.firstName}
            disabled={!isEditing}
            required
          />
          <Input
            label="Nom"
            type="text"
            name="lastName"
            value={formData?.lastName}
            onChange={handleInputChange}
            error={errors?.lastName}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData?.email}
            onChange={handleInputChange}
            error={errors?.email}
            disabled={!isEditing}
            required
          />
          <Input
            label="Téléphone"
            type="tel"
            name="phone"
            value={formData?.phone}
            onChange={handleInputChange}
            error={errors?.phone}
            disabled={!isEditing}
            required
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Date de naissance"
            type="date"
            name="dateOfBirth"
            value={formData?.dateOfBirth}
            onChange={handleInputChange}
            disabled={!isEditing}
          />
          <Select
            label="Nationalité"
            options={nationalityOptions}
            value={formData?.nationality}
            onChange={(value) => handleSelectChange('nationality', value)}
            disabled={!isEditing}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Input
            label="Ville"
            type="text"
            name="city"
            value={formData?.city}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="md:col-span-1"
          />
          <Input
            label="Adresse"
            type="text"
            name="address"
            value={formData?.address}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="md:col-span-1"
          />
          <Input
            label="Code postal"
            type="text"
            name="postalCode"
            value={formData?.postalCode}
            onChange={handleInputChange}
            disabled={!isEditing}
            className="md:col-span-1"
          />
        </div>

        <div className="border-t border-border pt-6 mt-6">
          <h4 className="text-base font-semibold text-foreground mb-4">Préférences d'investissement</h4>
          
          <div className="space-y-4">
            <Select
              label="Tolérance au risque"
              description="Définissez votre niveau de confort avec le risque d'investissement"
              options={riskToleranceOptions}
              value={formData?.riskTolerance}
              onChange={(value) => handleSelectChange('riskTolerance', value)}
              disabled={!isEditing}
            />

            <Select
              label="Objectif d'investissement"
              description="Choisissez votre objectif financier principal"
              options={investmentGoalOptions}
              value={formData?.investmentGoal}
              onChange={(value) => handleSelectChange('investmentGoal', value)}
              disabled={!isEditing}
            />

            <Select
              label="Devise préférée"
              description="Sélectionnez la devise pour l'affichage de votre portefeuille"
              options={currencyOptions}
              value={formData?.preferredCurrency}
              onChange={(value) => handleSelectChange('preferredCurrency', value)}
              disabled={!isEditing}
            />

            <Input
              label="Budget d'investissement mensuel"
              type="number"
              name="monthlyInvestmentBudget"
              value={formData?.monthlyInvestmentBudget}
              onChange={handleInputChange}
              disabled={!isEditing}
              description="Montant que vous prévoyez d'investir chaque mois (optionnel)"
            />
          </div>
        </div>

        {isEditing && (
          <div className="flex items-center gap-3 pt-4 border-t border-border">
            <Button
              variant="default"
              loading={isSaving}
              iconName="Save"
              iconPosition="left"
              onClick={handleSave}
            >
              Enregistrer les modifications
            </Button>
            <Button
              variant="outline"
              onClick={handleCancel}
              disabled={isSaving}
            >
              Annuler
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PersonalProfileSection;