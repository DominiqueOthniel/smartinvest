import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';
import Image from '../AppImage';

const CommunityChatComponent = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: 'user1',
      userName: 'Kofi Mensah',
      userAvatar: 'KM',
      message: 'Bonjour ! Quelqu\'un a déjà investi dans le projet Résidence Luxe Abidjan Plateau ?',
      timestamp: new Date(Date.now() - 3600000),
      likes: 3,
      replies: 2
    },
    {
      id: 2,
      userId: 'user2',
      userName: 'Amina Diallo',
      userAvatar: 'AD',
      message: 'Oui, j\'ai investi 500 000 CFA il y a 2 semaines. Le projet avance bien !',
      timestamp: new Date(Date.now() - 3300000),
      likes: 5,
      replies: 1
    },
    {
      id: 3,
      userId: 'user3',
      userName: 'Jean Kouassi',
      userAvatar: 'JK',
      message: 'Quel est le rendement estimé pour ce projet ?',
      timestamp: new Date(Date.now() - 3000000),
      likes: 2,
      replies: 0
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const fileInputRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(file => {
      const isImage = file.type.startsWith('image/');
      const isVideo = file.type.startsWith('video/');
      return isImage || isVideo;
    });

    if (validFiles.length === 0) {
      alert('Veuillez sélectionner uniquement des images ou des vidéos');
      return;
    }

    setSelectedFiles([...selectedFiles, ...validFiles]);

    // Créer des prévisualisations
    const previews = validFiles.map(file => {
      const preview = {
        file,
        type: file.type.startsWith('image/') ? 'image' : 'video',
        url: URL.createObjectURL(file)
      };
      return preview;
    });

    setFilePreviews([...filePreviews, ...previews]);
  };

  const removeFilePreview = (index) => {
    const preview = filePreviews[index];
    URL.revokeObjectURL(preview.url);
    
    const newPreviews = filePreviews.filter((_, i) => i !== index);
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    
    setFilePreviews(newPreviews);
    setSelectedFiles(newFiles);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() && filePreviews.length === 0) return;

    // Simuler l'upload des fichiers (dans une vraie app, vous feriez un upload vers un serveur)
    const uploadedMedia = filePreviews.map(preview => ({
      type: preview.type,
      url: preview.url, // Dans une vraie app, ce serait l'URL du serveur
      name: preview.file.name,
      size: preview.file.size
    }));

    const message = {
      id: messages.length + 1,
      userId: 'currentUser',
      userName: 'Vous',
      userAvatar: 'KM',
      message: newMessage,
      media: uploadedMedia.length > 0 ? uploadedMedia : undefined,
      timestamp: new Date(),
      likes: 0,
      replies: 0
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setSelectedFiles([]);
    
    // Nettoyer les URLs des prévisualisations
    filePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    setFilePreviews([]);
    setIsTyping(false);
    
    // Réinitialiser l'input file
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleLike = (messageId) => {
    setMessages(messages.map(msg => 
      msg.id === messageId 
        ? { ...msg, likes: msg.likes + 1 }
        : msg
    ));
  };

  const formatTime = (date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'À l\'instant';
    if (diffInMinutes < 60) return `Il y a ${diffInMinutes}min`;
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `Il y a ${diffInHours}h`;
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
            <Icon name="Users" size={20} color="var(--color-primary)" />
          </div>
          <div>
            <h3 className="font-semibold text-foreground">Chat Communautaire</h3>
            <p className="text-xs text-muted-foreground">{messages.length} membres actifs</p>
          </div>
        </div>
        <button className="p-2 rounded-lg hover:bg-muted transition-colors">
          <Icon name="Settings" size={18} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3 group">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-primary/60 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-primary-foreground">{msg.userAvatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-foreground text-sm">{msg.userName}</span>
                <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
              </div>
              <div className="bg-card border border-border rounded-lg p-3 mb-2 group-hover:border-primary/30 transition-colors">
                {msg.message && (
                  <p className="text-foreground text-sm whitespace-pre-wrap break-words mb-2">{msg.message}</p>
                )}
                {msg.media && msg.media.length > 0 && (
                  <div className="space-y-2">
                    {msg.media.map((media, index) => (
                      <div key={index} className="relative">
                        {media.type === 'image' ? (
                          <div className="rounded-lg overflow-hidden max-w-md">
                            <img
                              src={media.url}
                              alt={media.name}
                              className="w-full h-auto max-h-96 object-contain cursor-pointer hover:opacity-90 transition-opacity"
                              onClick={() => window.open(media.url, '_blank')}
                            />
                          </div>
                        ) : (
                          <div className="rounded-lg overflow-hidden max-w-md">
                            <video
                              src={media.url}
                              controls
                              className="w-full h-auto max-h-96"
                            >
                              Votre navigateur ne supporte pas la lecture de vidéos.
                            </video>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1">{media.name} ({formatFileSize(media.size)})</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <div className="flex items-center gap-4">
                <button
                  onClick={() => handleLike(msg.id)}
                  className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
                >
                  <Icon name="Heart" size={14} />
                  <span>{msg.likes}</span>
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="MessageCircle" size={14} />
                  <span>{msg.replies} réponses</span>
                </button>
                <button className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors">
                  <Icon name="Share2" size={14} />
                  <span>Partager</span>
                </button>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Prévisualisations des fichiers */}
      {filePreviews.length > 0 && (
        <div className="bg-card border-t border-border p-4">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm font-medium text-foreground">Fichiers sélectionnés:</span>
            <span className="text-xs text-muted-foreground">({filePreviews.length})</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {filePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                {preview.type === 'image' ? (
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-border">
                    <img
                      src={preview.url}
                      alt={preview.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                    <Icon name="Video" size={32} />
                  </div>
                )}
                <button
                  onClick={() => removeFilePreview(index)}
                  className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="X" size={14} />
                </button>
                <p className="text-xs text-muted-foreground mt-1 truncate w-24" title={preview.file.name}>
                  {preview.file.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="bg-card border-t border-border p-4">
        <form onSubmit={handleSendMessage} className="flex gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={handleFileSelect}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="px-4 py-2.5 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors flex items-center gap-2"
            title="Ajouter une image ou une vidéo"
          >
            <Icon name="Image" size={18} />
            <span className="hidden sm:inline">Média</span>
          </button>
          <div className="flex-1 relative">
            <input
              ref={inputRef}
              type="text"
              value={newMessage}
              onChange={(e) => {
                setNewMessage(e.target.value);
                setIsTyping(e.target.value.length > 0);
              }}
              placeholder="Écrivez un message..."
              className="w-full px-4 py-2.5 pr-10 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
            />
            <button
              type="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg hover:bg-muted transition-colors"
            >
              <Icon name="Smile" size={18} />
            </button>
          </div>
          <button
            type="submit"
            disabled={!newMessage.trim() && filePreviews.length === 0}
            className="px-6 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity flex items-center gap-2"
          >
            <Icon name="Send" size={18} />
            <span className="hidden sm:inline">Envoyer</span>
          </button>
        </form>
        {isTyping && (
          <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
            <span className="animate-pulse">●</span>
            Vous êtes en train d'écrire...
          </p>
        )}
      </div>
    </div>
  );
};

const CommunityChat = CommunityChatComponent;

export default CommunityChat;
