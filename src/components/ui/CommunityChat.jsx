import React, { useState, useEffect, useRef } from 'react';
import Icon from '../AppIcon';

const CommunityChatComponent = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      userId: 'user1',
      userName: 'Kofi Mensah',
      userAvatar: 'KM',
      message: 'Bonjour ! Quelqu\'un a déjà investi dans le projet Résidence Luxe Abidjan Plateau ?',
      timestamp: new Date(Date.now() - 3600000),
      likes: 3
    },
    {
      id: 2,
      userId: 'user2',
      userName: 'Amina Diallo',
      userAvatar: 'AD',
      message: 'Oui, j\'ai investi 500 000 CFA il y a 2 semaines. Le projet avance bien !',
      timestamp: new Date(Date.now() - 3300000),
      likes: 5
    }
  ]);
  
  const [newMessage, setNewMessage] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [filePreviews, setFilePreviews] = useState([]);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
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

    const uploadedMedia = filePreviews.map(preview => ({
      type: preview.type,
      url: preview.url,
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
      likes: 0
    };

    setMessages([...messages, message]);
    setNewMessage('');
    setSelectedFiles([]);
    
    filePreviews.forEach(preview => URL.revokeObjectURL(preview.url));
    setFilePreviews([]);
    
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
    return date.toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' });
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header simplifié */}
      <div className="bg-card border-b border-border p-4">
        <h3 className="font-semibold text-foreground">Communauté</h3>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div key={msg.id} className="flex gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
              <span className="text-sm font-semibold text-primary">{msg.userAvatar}</span>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-medium text-foreground text-sm">{msg.userName}</span>
                <span className="text-xs text-muted-foreground">{formatTime(msg.timestamp)}</span>
              </div>
              <div className="bg-card border border-border rounded-lg p-3 mb-2">
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
                      </div>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => handleLike(msg.id)}
                className="flex items-center gap-1 text-xs text-muted-foreground hover:text-primary transition-colors"
              >
                <Icon name="Heart" size={14} />
                <span>{msg.likes}</span>
              </button>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Prévisualisations */}
      {filePreviews.length > 0 && (
        <div className="bg-card border-t border-border p-3">
          <div className="flex flex-wrap gap-2">
            {filePreviews.map((preview, index) => (
              <div key={index} className="relative group">
                {preview.type === 'image' ? (
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-border">
                    <img
                      src={preview.url}
                      alt={preview.file.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 rounded-lg overflow-hidden border border-border bg-muted flex items-center justify-center">
                    <Icon name="Video" size={24} />
                  </div>
                )}
                <button
                  onClick={() => removeFilePreview(index)}
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-destructive text-destructive-foreground flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Icon name="X" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input simplifié */}
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
            className="px-3 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/80 transition-colors"
            title="Ajouter une image ou une vidéo"
          >
            <Icon name="Image" size={18} />
          </button>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Écrivez un message..."
            className="flex-1 px-4 py-2 bg-background border border-border rounded-lg text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!newMessage.trim() && filePreviews.length === 0}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-opacity"
          >
            <Icon name="Send" size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

const CommunityChat = CommunityChatComponent;

export default CommunityChat;
