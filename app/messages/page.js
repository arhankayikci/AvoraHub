"use client";

import { useState, useRef, useEffect } from 'react';
import styles from './messages.module.css';

// Demo konuşmalar
const DEMO_CONVERSATIONS = [
    {
        id: 1,
        name: 'Ahmet Yılmaz',
        avatar: 'AY',
        color: '#6366F1',
        online: true,
        lastMessage: 'Harika! Yarın görüşmek üzere.',
        time: '14:32',
        unread: 2,
    },
    {
        id: 2,
        name: 'Elif Demir',
        avatar: 'ED',
        color: '#EC4899',
        online: true,
        lastMessage: 'Pitch deck\'i inceledim, çok başarılı olmuş.',
        time: '12:15',
        unread: 0,
    },
    {
        id: 3,
        name: 'Can Öztürk',
        avatar: 'CÖ',
        color: '#8B5CF6',
        online: false,
        lastMessage: 'Teknik detayları konuşalım mı?',
        time: 'Dün',
        unread: 0,
    },
    {
        id: 4,
        name: 'PayFlex Team',
        avatar: 'PF',
        color: '#10B981',
        online: true,
        lastMessage: 'Demo için uygun bir zaman belirleyelim.',
        time: 'Dün',
        unread: 5,
    },
    {
        id: 5,
        name: 'Selin Arslan',
        avatar: 'SA',
        color: '#F59E0B',
        online: false,
        lastMessage: 'Growth stratejisi hakkında görüşlerinizi almak isterim.',
        time: '2 gün önce',
        unread: 0,
    },
];

// Demo mesajlar
const DEMO_MESSAGES = {
    1: [
        { id: 1, text: 'Merhaba Ahmet Bey, startup\'ınız hakkında daha fazla bilgi almak istiyorum.', sent: false, time: '13:45' },
        { id: 2, text: 'Merhaba! Tabii ki, size yardımcı olmaktan mutluluk duyarım.', sent: true, time: '13:47' },
        { id: 3, text: 'Özellikle hangi konularda bilgi almak istersiniz?', sent: true, time: '13:47' },
        { id: 4, text: 'Yatırım turumuz ve büyüme planlarımız hakkında konuşabiliriz.', sent: true, time: '13:48' },
        { id: 5, text: 'Harika! Yarın 14:00\'te uygun musunuz? Zoom üzerinden görüşebiliriz.', sent: false, time: '14:30' },
        { id: 6, text: 'Harika! Yarın görüşmek üzere.', sent: true, time: '14:32', status: 'read' },
    ],
    2: [
        { id: 1, text: 'Elif Hanım, pitch deck\'imizi incelemeniz için gönderdim.', sent: true, time: '11:00' },
        { id: 2, text: 'Teşekkürler, şimdi bakıyorum.', sent: false, time: '11:30' },
        { id: 3, text: 'Pitch deck\'i inceledim, çok başarılı olmuş.', sent: false, time: '12:15' },
    ],
};

export default function MessagesPage() {
    const [activeConversation, setActiveConversation] = useState(null);
    const [messages, setMessages] = useState([]);
    const [newMessage, setNewMessage] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const messagesEndRef = useRef(null);

    useEffect(() => {
        if (activeConversation) {
            setTimeout(() => {
                setMessages(DEMO_MESSAGES[activeConversation.id] || []);
            }, 0);
        }
    }, [activeConversation]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleSendMessage = () => {
        if (!newMessage.trim() || !activeConversation) return;

        const message = {
            id: messages.length + 1,
            text: newMessage,
            sent: true,
            time: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
            status: 'sent'
        };

        setMessages([...messages, message]);
        setNewMessage('');
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const filteredConversations = DEMO_CONVERSATIONS.filter(conv =>
        conv.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                {/* Sidebar */}
                <div className={styles.sidebar}>
                    <div className={styles.sidebarHeader}>
                        <h2 className={styles.sidebarTitle}>💬 Mesajlar</h2>
                        <div className={styles.searchBox}>
                            <span className={styles.searchIcon}>🔍</span>
                            <input
                                type="text"
                                placeholder="Kişi veya grup ara..."
                                className={styles.searchInput}
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className={styles.conversationList}>
                        {filteredConversations.map(conv => (
                            <div
                                key={conv.id}
                                className={`${styles.conversation} ${activeConversation?.id === conv.id ? styles.active : ''}`}
                                onClick={() => setActiveConversation(conv)}
                            >
                                <div className={styles.avatar} style={{ background: conv.color }}>
                                    {conv.avatar}
                                    {conv.online && <span className={styles.onlineBadge}></span>}
                                </div>
                                <div className={styles.convInfo}>
                                    <div className={styles.convHeader}>
                                        <span className={styles.convName}>{conv.name}</span>
                                        <span className={styles.convTime}>{conv.time}</span>
                                    </div>
                                    <p className={styles.convPreview}>{conv.lastMessage}</p>
                                </div>
                                {conv.unread > 0 && (
                                    <span className={styles.unreadBadge}>{conv.unread}</span>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Chat Area */}
                <div className={styles.chatArea}>
                    {activeConversation ? (
                        <>
                            {/* Chat Header */}
                            <div className={styles.chatHeader}>
                                <div className={styles.chatHeaderLeft}>
                                    <div className={styles.avatar} style={{ background: activeConversation.color }}>
                                        {activeConversation.avatar}
                                        {activeConversation.online && <span className={styles.onlineBadge}></span>}
                                    </div>
                                    <div>
                                        <h3 className={styles.chatTitle}>{activeConversation.name}</h3>
                                        <span className={styles.chatStatus}>
                                            {activeConversation.online ? '🟢 Çevrimiçi' : '⚫ Çevrimdışı'}
                                        </span>
                                    </div>
                                </div>
                                <div className={styles.headerActions}>
                                    <button className={styles.actionBtn}>📞</button>
                                    <button className={styles.actionBtn}>📹</button>
                                    <button className={styles.actionBtn}>⋯</button>
                                </div>
                            </div>

                            {/* Messages */}
                            <div className={styles.messages}>
                                <div className={styles.dateLabel}>
                                    <span className={styles.dateBadge}>Bugün</span>
                                </div>

                                {messages.map(msg => (
                                    <div
                                        key={msg.id}
                                        className={`${styles.messageGroup} ${msg.sent ? styles.sent : styles.received}`}
                                    >
                                        <div className={styles.messageBubble}>
                                            <p className={styles.messageText}>{msg.text}</p>
                                            <span className={styles.messageTime}>
                                                {msg.time}
                                                {msg.sent && (
                                                    <span className={styles.messageStatus}>
                                                        {msg.status === 'read' ? ' ✓✓' : ' ✓'}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                ))}

                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input Area */}
                            <div className={styles.inputArea}>
                                <div className={styles.inputContainer}>
                                    <button className={styles.attachBtn}>📎</button>
                                    <input
                                        type="text"
                                        placeholder="Mesajınızı yazın..."
                                        className={styles.messageInput}
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        onKeyPress={handleKeyPress}
                                    />
                                    <button className={styles.emojiBtn}>😊</button>
                                    <button
                                        className={styles.sendBtn}
                                        onClick={handleSendMessage}
                                        disabled={!newMessage.trim()}
                                    >
                                        ➤
                                    </button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className={styles.emptyState}>
                            <span className={styles.emptyIcon}>💬</span>
                            <h3 className={styles.emptyTitle}>Bir sohbet seçin</h3>
                            <p className={styles.emptyText}>
                                Soldan bir kişi veya grup seçerek mesajlaşmaya başlayın
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
