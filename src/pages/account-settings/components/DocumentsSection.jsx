import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const DocumentsSection = () => {
  const [downloadingDoc, setDownloadingDoc] = useState(null);

  const documents = [
    {
      id: 1,
      name: "Contrat d\'investissement - Projet Immobilier Cocody",
      type: "contract",
      date: "15/12/2025",
      size: "2.4 MB",
      status: "signed"
    },
    {
      id: 2,
      name: "Relevé de compte - Décembre 2025",
      type: "statement",
      date: "01/12/2025",
      size: "856 KB",
      status: "available"
    },
    {
      id: 3,
      name: "Certificat fiscal 2025",
      type: "tax",
      date: "10/11/2025",
      size: "1.2 MB",
      status: "available"
    },
    {
      id: 4,
      name: "Contrat d\'investissement - Restaurant Le Palmier",
      type: "contract",
      date: "28/11/2025",
      size: "2.1 MB",
      status: "signed"
    },
    {
      id: 5,
      name: "Rapport de performance Q4 2025",
      type: "report",
      date: "05/12/2025",
      size: "3.8 MB",
      status: "available"
    },
    {
      id: 6,
      name: "Conditions générales d\'utilisation",
      type: "legal",
      date: "01/01/2025",
      size: "645 KB",
      status: "available"
    },
    {
      id: 7,
      name: "Politique de confidentialité",
      type: "legal",
      date: "01/01/2025",
      size: "512 KB",
      status: "available"
    },
    {
      id: 8,
      name: "Certificat de conformité réglementaire",
      type: "compliance",
      date: "15/01/2025",
      size: "1.8 MB",
      status: "available"
    }
  ];

  const getDocumentIcon = (type) => {
    switch (type) {
      case 'contract':
        return 'FileText';
      case 'statement':
        return 'Receipt';
      case 'tax':
        return 'Calculator';
      case 'report':
        return 'BarChart3';
      case 'legal':
        return 'Scale';
      case 'compliance':
        return 'ShieldCheck';
      default:
        return 'File';
    }
  };

  const getDocumentTypeLabel = (type) => {
    switch (type) {
      case 'contract':
        return 'Contrat';
      case 'statement':
        return 'Relevé';
      case 'tax':
        return 'Fiscal';
      case 'report':
        return 'Rapport';
      case 'legal':
        return 'Légal';
      case 'compliance':
        return 'Conformité';
      default:
        return 'Document';
    }
  };

  const getStatusBadge = (status) => {
    if (status === 'signed') {
      return (
        <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-success/10 text-success rounded">
          <Icon name="CheckCircle" size={12} />
          Signé
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 text-xs font-medium bg-primary/10 text-primary rounded">
        <Icon name="Download" size={12} />
        Disponible
      </span>
    );
  };

  const handleDownload = async (docId, docName) => {
    setDownloadingDoc(docId);
    
    setTimeout(() => {
      setDownloadingDoc(null);
      console.log('Downloading:', docName);
    }, 1500);
  };

  const contractDocs = documents?.filter(doc => doc?.type === 'contract');
  const financialDocs = documents?.filter(doc => ['statement', 'report']?.includes(doc?.type));
  const taxDocs = documents?.filter(doc => doc?.type === 'tax');
  const legalDocs = documents?.filter(doc => ['legal', 'compliance']?.includes(doc?.type));

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="FileText" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Contrats d'investissement</h3>
            <p className="text-sm text-muted-foreground">Vos contrats signés et documents d'investissement</p>
          </div>
        </div>

        <div className="space-y-3">
          {contractDocs?.map((doc) => (
            <div
              key={doc?.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                  <Icon name={getDocumentIcon(doc?.type)} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground truncate">{doc?.name}</h4>
                    {getStatusBadge(doc?.status)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{doc?.date}</span>
                    <span>•</span>
                    <span>{doc?.size}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-background rounded">
                      {getDocumentTypeLabel(doc?.type)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                loading={downloadingDoc === doc?.id}
                onClick={() => handleDownload(doc?.id, doc?.name)}
              >
                Télécharger
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Receipt" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Documents financiers</h3>
            <p className="text-sm text-muted-foreground">Relevés de compte et rapports de performance</p>
          </div>
        </div>

        <div className="space-y-3">
          {financialDocs?.map((doc) => (
            <div
              key={doc?.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                  <Icon name={getDocumentIcon(doc?.type)} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground truncate">{doc?.name}</h4>
                    {getStatusBadge(doc?.status)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{doc?.date}</span>
                    <span>•</span>
                    <span>{doc?.size}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-background rounded">
                      {getDocumentTypeLabel(doc?.type)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                loading={downloadingDoc === doc?.id}
                onClick={() => handleDownload(doc?.id, doc?.name)}
              >
                Télécharger
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Calculator" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Documents fiscaux</h3>
            <p className="text-sm text-muted-foreground">Certificats et déclarations fiscales</p>
          </div>
        </div>

        <div className="space-y-3">
          {taxDocs?.map((doc) => (
            <div
              key={doc?.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                  <Icon name={getDocumentIcon(doc?.type)} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground truncate">{doc?.name}</h4>
                    {getStatusBadge(doc?.status)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{doc?.date}</span>
                    <span>•</span>
                    <span>{doc?.size}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-background rounded">
                      {getDocumentTypeLabel(doc?.type)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                loading={downloadingDoc === doc?.id}
                onClick={() => handleDownload(doc?.id, doc?.name)}
              >
                Télécharger
              </Button>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-card border border-border rounded-xl p-6 lg:p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon name="Scale" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Documents légaux et conformité</h3>
            <p className="text-sm text-muted-foreground">Conditions générales et certifications</p>
          </div>
        </div>

        <div className="space-y-3">
          {legalDocs?.map((doc) => (
            <div
              key={doc?.id}
              className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/70 transition-colors"
            >
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center">
                  <Icon name={getDocumentIcon(doc?.type)} size={20} color="var(--color-primary)" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-semibold text-foreground truncate">{doc?.name}</h4>
                    {getStatusBadge(doc?.status)}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span>{doc?.date}</span>
                    <span>•</span>
                    <span>{doc?.size}</span>
                    <span>•</span>
                    <span className="px-2 py-0.5 bg-background rounded">
                      {getDocumentTypeLabel(doc?.type)}
                    </span>
                  </div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="Download"
                loading={downloadingDoc === doc?.id}
                onClick={() => handleDownload(doc?.id, doc?.name)}
              >
                Télécharger
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DocumentsSection;