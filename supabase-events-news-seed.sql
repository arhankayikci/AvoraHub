-- =============================================
-- AVORAHUB - ETKİNLİKLER VE HABERLER
-- Mevcut tablolara sütun ekleme + Seed Data
-- =============================================

-- =============================================
-- EVENTS TABLOSU - EKSİK SÜTUNLARI EKLE
-- =============================================

-- Önce tabloyu oluştur (eğer yoksa)
CREATE TABLE IF NOT EXISTS events (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Eksik sütunları ekle
ALTER TABLE events ADD COLUMN IF NOT EXISTS date DATE;
ALTER TABLE events ADD COLUMN IF NOT EXISTS time TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS location TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'Etkinlik';
ALTER TABLE events ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT false;
ALTER TABLE events ADD COLUMN IF NOT EXISTS attendees INTEGER DEFAULT 0;
ALTER TABLE events ADD COLUMN IF NOT EXISTS featured BOOLEAN DEFAULT false;
ALTER TABLE events ADD COLUMN IF NOT EXISTS speakers TEXT[] DEFAULT '{}';
ALTER TABLE events ADD COLUMN IF NOT EXISTS organizer TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS registration_url TEXT;
ALTER TABLE events ADD COLUMN IF NOT EXISTS image TEXT;

-- =============================================
-- NEWS TABLOSU - EKSİK SÜTUNLARI EKLE
-- =============================================

CREATE TABLE IF NOT EXISTS news (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE news ADD COLUMN IF NOT EXISTS summary TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS content TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS category TEXT DEFAULT 'Genel';
ALTER TABLE news ADD COLUMN IF NOT EXISTS author TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS author_avatar TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS image_url TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS source_url TEXT;
ALTER TABLE news ADD COLUMN IF NOT EXISTS published_at TIMESTAMP WITH TIME ZONE DEFAULT NOW();
ALTER TABLE news ADD COLUMN IF NOT EXISTS views INTEGER DEFAULT 0;

-- =============================================
-- RLS POLİTİKALARI (varsa atla)
-- =============================================

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE news ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'events' AND policyname = 'Events are publicly readable') THEN
        EXECUTE 'CREATE POLICY "Events are publicly readable" ON events FOR SELECT USING (true)';
    END IF;
    IF NOT EXISTS (SELECT 1 FROM pg_policies WHERE tablename = 'news' AND policyname = 'News are publicly readable') THEN
        EXECUTE 'CREATE POLICY "News are publicly readable" ON news FOR SELECT USING (true)';
    END IF;
END $$;

-- =============================================
-- MEVCUT VERİLERİ TEMİZLE (OPSİYONEL)
-- =============================================

DELETE FROM events;
DELETE FROM news;

-- =============================================
-- ETKİNLİKLER SEED DATA
-- =============================================

INSERT INTO events (title, description, date, time, location, type, is_online, attendees, featured, speakers, organizer) VALUES

('Türkiye Startup Zirvesi 2025', 
 '500+ girişimci, 100+ yatırımcı, 50+ konuşmacı ile startup dünyasının kalbi İstanbul''da atacak.',
 '2025-03-15', '09:00', 'İstanbul Kongre Merkezi', 'Demo Day',
 false, 850, true, 
 ARRAY['Serdar Kuzuloğlu', 'Nevzat Aydın'], 'AvoraHub'),

('AI & Future Tech Summit', 
 'Yapay zeka ve geleceğin teknolojileri hakkında öncü uzmanlardan sunumlar.',
 '2025-02-20', '10:00', 'Ankara Bilkent Otel', 'Workshop',
 false, 400, true, 
 ARRAY['Dr. Emre Yılmaz', 'Zeynep Ton'], 'TechAnkara'),

('Yatırımcı Buluşması: Series A Hazırlık', 
 'Series A yatırımı için finansal modelleme ve yatırımcı görüşmeleri.',
 '2025-01-28', '13:00', 'Kolektif House, Maslak', 'Networking',
 false, 45, false, 
 ARRAY['Burak Büyükdemir'], 'AvoraHub Ventures'),

('SaaS Metrics Masterclass', 
 'MRR, ARR, Churn, CAC, LTV ve diğer kritik SaaS metrikleri.',
 '2025-01-20', '19:00', 'Online - Zoom', 'Webinar',
 true, 180, false, 
 ARRAY['Ozan Dağdeviren'], 'SaaS Türkiye'),

('Product-Market Fit Nasıl Bulunur?', 
 'Ürün-pazar uyumu bulma stratejileri ve pivot kararları.',
 '2025-01-25', '20:00', 'Online - Google Meet', 'Webinar',
 true, 150, false, 
 ARRAY['Hakan Baş'], 'Founders Network TR'),

('Climate Tech Hackathon İstanbul', 
 '48 saatlik hackathon. 100.000 TL ödül havuzu.',
 '2025-02-08', '09:00', 'Google Campus, Galata', 'Workshop',
 false, 180, true, 
 ARRAY['Ali Sabancı', 'WWF Türkiye'], 'Climate Action TR'),

('FinTech Innovation Challenge', 
 'Açık bankacılık ve embedded finance çözümleri geliştirin.',
 '2025-02-22', '10:00', 'İTÜ Teknokent', 'Workshop',
 false, 120, false, 
 ARRAY['Garanti BBVA', 'İş Bankası'], 'FinTech İstanbul'),

('Startup Founder Kahvaltısı', 
 'Her ay düzenlenen networking kahvaltısı.',
 '2025-01-18', '09:30', 'Coffee Department, Kadıköy', 'Networking',
 false, 28, false, 
 ARRAY[]::TEXT[], 'Startup Grind Istanbul'),

('Women in Tech Mixer', 
 'Teknoloji sektöründe çalışan kadınlar için networking.',
 '2025-02-14', '18:30', 'Soho House, Beyoğlu', 'Networking',
 false, 75, false, 
 ARRAY['Didem Soydan', 'Elif Demirkol'], 'Women Who Code Istanbul'),

('No-Code ile MVP Geliştirme', 
 'Bubble, Webflow ile kod yazmadan MVP oluşturun.',
 '2025-01-30', '14:00', 'Impact Hub, Karaköy', 'Workshop',
 false, 22, false, 
 ARRAY['Can Özyurt'], 'No-Code Türkiye'),

('Growth Hacking 101', 
 'Virality, referral programları ve growth loopları.',
 '2025-02-05', '15:00', 'Workinton, Levent', 'Workshop',
 false, 35, false, 
 ARRAY['Mert Yüksel'], 'Growth Hackers TR'),

('Pitch Deck Hazırlama Atölyesi', 
 'Yatırımcıları etkileyecek pitch deck nasıl hazırlanır?',
 '2025-01-22', '16:00', 'Workistan, Beşiktaş', 'Workshop',
 false, 25, false, 
 ARRAY['Selcuk Atli'], 'AvoraHub');

-- =============================================
-- HABERLER SEED DATA
-- =============================================

INSERT INTO news (title, summary, content, category, author, author_avatar, image_url, published_at, views) VALUES

('Getir, 500 Milyon Dolar Yeni Yatırım Aldı', 
 'Türkiye''nin unicorn''u Getir, Softbank liderliğindeki turda 500 milyon dolar yatırım aldı.',
 'Getir, Softbank Vision Fund 2 liderliğindeki yatırım turunda 500 milyon dolar yatırım aldı. Şirket değerlemesi 12 milyar dolara yükseldi.',
 'Yatırım', 'AvoraHub Editör', 'https://randomuser.me/api/portraits/men/1.jpg',
 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800',
 NOW() - INTERVAL '2 days', 15420),

('Vivoo, 20 Milyon Dolar Topladı', 
 'Sağlık teknolojisi girişimi Vivoo, Series B turunda 20 milyon dolar yatırım aldı.',
 'İstanbul merkezli Vivoo, 40+ ülkede 500.000+ kullanıcıya ulaştı.',
 'Yatırım', 'Startup Haberleri', 'https://randomuser.me/api/portraits/women/2.jpg',
 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800',
 NOW() - INTERVAL '1 day', 8234),

('2025 Türkiye Startup Ekosistemi Raporu', 
 '2024''te 2.1 milyar dolar yatırım yapıldı. FinTech ve HealthTech öne çıkan sektörler.',
 'FinTech 650 milyon dolar ile en çok yatırım alan sektör oldu.',
 'Analiz', 'Startups.watch', 'https://randomuser.me/api/portraits/men/3.jpg',
 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800',
 NOW() - INTERVAL '3 days', 12567),

('Yapay Zeka Startupları İçin Altın Çağ', 
 'OpenAI''ın başarısı ardından AI yatırımları rekor kırdı.',
 'Türkiye''den Cogram ve Maum.ai gibi startuplar global ilgi görüyor.',
 'Trendler', 'Tech Analiz', 'https://randomuser.me/api/portraits/women/4.jpg',
 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800',
 NOW() - INTERVAL '4 days', 9876),

('Insider, 100+ Ülkede 1200+ Müşteriye Ulaştı', 
 'Türkiye''nin ikinci unicorn''u global pazarlama devi haline geldi.',
 'IKEA, Samsung, Toyota gibi markaların tercihi.',
 'Başarı Hikayesi', 'Girişim Haberleri', 'https://randomuser.me/api/portraits/men/5.jpg',
 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
 NOW() - INTERVAL '5 days', 7654),

('İyzico''nun Satış Hikayesi', 
 'Barbaros Özbuğutu''nun kurduğu iyzico, 165 milyon dolara PayU''ya satıldı.',
 'Türk FinTech tarihinin en önemli exitleri arasında.',
 'Başarı Hikayesi', 'FinTech Türkiye', 'https://randomuser.me/api/portraits/women/6.jpg',
 'https://images.unsplash.com/photo-1556742044-3c52d6e88c62?w=800',
 NOW() - INTERVAL '1 week', 6543),

('Google for Startups İstanbul Hub Açıldı', 
 'Google, Karaköy''de startup hub açtı. Ücretsiz çalışma alanı ve mentorluk.',
 'Seçilen startuplara Google Cloud kredileri sunuluyor.',
 'Ekosistem', 'Startup Ekosistem', 'https://randomuser.me/api/portraits/men/7.jpg',
 'https://images.unsplash.com/photo-1573164713988-8665fc963095?w=800',
 NOW() - INTERVAL '6 days', 5432),

('TÜBİTAK BIGG Başvuruları Açıldı', 
 '400.000 TL''ye kadar hibe desteği. Son başvuru 15 Şubat 2025.',
 'Teknoloji tabanlı iş fikirlerine mentorluk desteği.',
 'Hibe', 'TÜBİTAK', 'https://randomuser.me/api/portraits/women/8.jpg',
 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800',
 NOW() - INTERVAL '1 day', 11234),

('Web3 ve Kripto: Türkiye''nin Fırsatı', 
 'BtcTurk, Paribu milyarlarca dolar işlem hacmi yönetiyor.',
 'Web3 startupları yatırımcı ilgisi çekiyor.',
 'Trendler', 'Kripto Haber', 'https://randomuser.me/api/portraits/men/9.jpg',
 'https://images.unsplash.com/photo-1639762681057-408e52192e55?w=800',
 NOW() - INTERVAL '8 days', 8765),

('CleanTech Yatırımları Artıyor', 
 'Güneş enerjisi ve atık yönetimi startupları öne çıkıyor.',
 '2025''te 500 milyon TL yatırım bekleniyor.',
 'Trendler', 'Yeşil Ekonomi', 'https://randomuser.me/api/portraits/women/10.jpg',
 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800',
 NOW() - INTERVAL '10 days', 6789);

-- =============================================
-- TAMAMLANDI ✅
-- =============================================
