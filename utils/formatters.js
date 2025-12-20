// Para birimi formatı - Türk Lirası
export function formatCurrency(amount) {
    if (!amount && amount !== 0) return '₺0';

    return new Intl.NumberFormat('tr-TR', {
        style: 'currency',
        currency: 'TRY',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
}

// Tarih formatı - DD.MM.YYYY
export function formatDate(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    return new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    }).format(date);
}

// Relative time - "X dakika/saat/gün önce"
export function formatRelativeTime(dateString) {
    if (!dateString) return '';

    const date = new Date(dateString);
    const now = new Date();
    const diff = now - date;

    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 1) return 'Az önce';
    if (minutes < 60) return `${minutes} dakika önce`;
    if (hours < 24) return `${hours} saat önce`;
    if (days < 7) return `${days} gün önce`;

    return formatDate(dateString);
}

// Sayı formatı - Türkçe (1.000, 1.000.000 gibi)
export function formatNumber(num) {
    if (!num && num !== 0) return '0';
    return new Intl.NumberFormat('tr-TR').format(num);
}
