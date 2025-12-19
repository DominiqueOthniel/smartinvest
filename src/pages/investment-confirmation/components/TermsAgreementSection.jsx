import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { Checkbox } from '../../../components/ui/Checkbox';

const TermsAgreementSection = ({ onAgreementChange }) => {
  const [agreements, setAgreements] = useState({
    riskDisclosure: false,
    investmentContract: false,
    termsOfService: false,
    dataProcessing: false
  });

  const [expandedSection, setExpandedSection] = useState(null);

  const agreementItems = [
    {
      id: 'riskDisclosure',
      label: 'Divulgation des Risques',
      required: true,
      preview: "J'ai lu et compris les risques associés à cet investissement, notamment la possibilité de perte partielle ou totale du capital investi.",
      fullText: `DIVULGATION DES RISQUES D'INVESTISSEMENT\n\nTout investissement comporte des risques. En investissant dans ce projet, vous reconnaissez et acceptez les risques suivants :\n\n1. RISQUE DE PERTE EN CAPITAL\nVotre investissement peut perdre de la valeur et vous pourriez ne pas récupérer le montant initial investi.\n\n2. RISQUE DE LIQUIDITÉ\nVos actions peuvent ne pas être facilement vendables et vous pourriez devoir attendre la fin du projet pour récupérer votre investissement.\n\n3. RISQUE DE MARCHÉ\nLes conditions économiques et de marché peuvent affecter négativement la performance du projet.\n\n4. RISQUE OPÉRATIONNEL\nLe projet peut rencontrer des difficultés opérationnelles imprévues affectant les rendements.\n\nEn cochant cette case, vous confirmez avoir lu, compris et accepté ces risques.`
    },
    {
      id: 'investmentContract',label: 'Contrat d\'Investissement',
      required: true,
      preview: "J'accepte les termes du contrat d'investissement incluant les conditions de participation, les droits et obligations des investisseurs.",
      fullText: `CONTRAT D'INVESTISSEMENT\n\nCe contrat établit les termes et conditions de votre participation au projet d'investissement.\n\nARTICLE 1 - OBJET DU CONTRAT\nLe présent contrat définit les modalités de votre investissement dans le projet et vos droits en tant qu'actionnaire.\n\nARTICLE 2 - MONTANT ET ACTIONS\nVotre investissement vous donne droit à un nombre d'actions proportionnel au montant investi.\n\nARTICLE 3 - DROITS DES INVESTISSEURS\n- Droit aux dividendes selon la performance du projet\n- Droit de vote aux assemblées générales\n- Droit à l'information sur la gestion du projet\n\nARTICLE 4 - OBLIGATIONS\n- Respecter les décisions des assemblées générales\n- Ne pas céder vos actions sans autorisation\n- Maintenir la confidentialité des informations sensibles\n\nARTICLE 5 - DURÉE\nLe contrat prend effet à la date de confirmation du paiement et reste valable pour la durée du projet.`
    },
    {
      id: 'termsOfService',label: 'Conditions Générales d\'Utilisation',
      required: true,
      preview: "J\'accepte les conditions générales d\'utilisation de la plateforme SmartInvest Africa et m\'engage à respecter les règles de la communauté.",
      fullText: `CONDITIONS GÉNÉRALES D'UTILISATION\n\nBienvenue sur SmartInvest Africa. En utilisant notre plateforme, vous acceptez les conditions suivantes :\n\n1. UTILISATION DE LA PLATEFORME\nVous vous engagez à utiliser la plateforme de manière responsable et conforme aux lois en vigueur.\n\n2. COMPTE UTILISATEUR\nVous êtes responsable de la sécurité de votre compte et de toutes les activités effectuées sous votre compte.\n\n3. TRANSACTIONS\nToutes les transactions sont finales et irrévocables une fois confirmées.\n\n4. FRAIS\nDes frais de traitement s'appliquent à chaque transaction comme indiqué lors de la confirmation.\n\n5. CONFIDENTIALITÉ\nNous protégeons vos données personnelles conformément à notre politique de confidentialité.\n\n6. MODIFICATIONS\nNous nous réservons le droit de modifier ces conditions avec préavis aux utilisateurs.\n\n7. RÉSILIATION\nNous pouvons suspendre ou résilier votre compte en cas de violation de ces conditions.`
    },
    {
      id: 'dataProcessing',
      label: 'Traitement des Données Personnelles',
      required: true,
      preview: "J'autorise SmartInvest Africa à traiter mes données personnelles conformément à la politique de confidentialité et aux régulations RGPD.",
      fullText: `CONSENTEMENT AU TRAITEMENT DES DONNÉES\n\nEn cochant cette case, vous consentez au traitement de vos données personnelles dans les conditions suivantes :\n\n1. DONNÉES COLLECTÉES\n- Informations d'identification (nom, prénom, date de naissance)\n- Coordonnées (email, téléphone, adresse)\n- Informations financières (transactions, investissements)\n- Données de navigation sur la plateforme\n\n2. FINALITÉS DU TRAITEMENT\n- Gestion de votre compte investisseur\n- Traitement de vos transactions\n- Communication sur vos investissements\n- Amélioration de nos services\n- Conformité réglementaire\n\n3. DURÉE DE CONSERVATION\nVos données sont conservées pendant la durée de votre relation avec SmartInvest Africa et 10 ans après pour les obligations légales.\n\n4. VOS DROITS\nVous disposez d'un droit d'accès, de rectification, d'effacement, de limitation et de portabilité de vos données.\n\n5. SÉCURITÉ\nNous mettons en œuvre des mesures techniques et organisationnelles pour protéger vos données.\n\n6. TRANSFERTS\nVos données peuvent être transférées à nos partenaires de paiement sécurisés (Stripe) dans le cadre du traitement des transactions.`
    }
  ];

  const handleAgreementChange = (agreementId, checked) => {
    const newAgreements = { ...agreements, [agreementId]: checked };
    setAgreements(newAgreements);
    
    const allRequired = agreementItems?.filter(item => item?.required)?.every(item => newAgreements?.[item?.id]);
    
    if (onAgreementChange) {
      onAgreementChange(allRequired);
    }
  };

  const toggleExpanded = (agreementId) => {
    setExpandedSection(expandedSection === agreementId ? null : agreementId);
  };

  return (
    <div className="bg-card border border-border rounded-xl p-6 space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-1">Accords et Conditions</h3>
          <p className="text-sm text-muted-foreground">Veuillez lire et accepter tous les documents requis</p>
        </div>
        <div className="w-12 h-12 rounded-lg bg-warning/10 flex items-center justify-center">
          <Icon name="FileText" size={24} color="var(--color-warning)" />
        </div>
      </div>
      <div className="space-y-4">
        {agreementItems?.map((item) => (
          <div key={item?.id} className="border border-border rounded-lg overflow-hidden">
            <div className="p-4 bg-muted/30">
              <div className="flex items-start gap-3">
                <Checkbox
                  checked={agreements?.[item?.id]}
                  onChange={(e) => handleAgreementChange(item?.id, e?.target?.checked)}
                  className="mt-1"
                />
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <p className="text-sm font-semibold text-foreground">{item?.label}</p>
                    {item?.required && (
                      <span className="text-xs font-semibold text-destructive">*Requis</span>
                    )}
                  </div>
                  <p className="text-xs text-muted-foreground mb-3">{item?.preview}</p>
                  <button
                    onClick={() => toggleExpanded(item?.id)}
                    className="flex items-center gap-2 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
                  >
                    <Icon 
                      name={expandedSection === item?.id ? 'ChevronUp' : 'ChevronDown'} 
                      size={14} 
                    />
                    <span>{expandedSection === item?.id ? 'Masquer' : 'Lire le document complet'}</span>
                  </button>
                </div>
              </div>
            </div>

            {expandedSection === item?.id && (
              <div className="p-4 bg-background border-t border-border">
                <div className="max-h-64 overflow-y-auto">
                  <pre className="text-xs text-muted-foreground whitespace-pre-wrap font-sans">
                    {item?.fullText}
                  </pre>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="flex items-start gap-3 p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <Icon name="AlertTriangle" size={18} color="var(--color-warning)" />
        <p className="text-xs text-warning">
          En confirmant cet investissement, vous déclarez avoir lu et accepté tous les documents ci-dessus. 
          Ces accords sont juridiquement contraignants.
        </p>
      </div>
    </div>
  );
};

export default TermsAgreementSection;