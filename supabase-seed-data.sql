-- ============================================
-- AVORAHUB - PRODUCTION DATA SEED
-- Run this in Supabase SQL Editor
-- ============================================

-- ============================================
-- 1. STARTUPS DATA
-- ============================================
INSERT INTO startups (id, name, tagline, description, category, stage, website, country, logo_url, likes, comments, featured, founded_year, team_size, funding, created_at) VALUES
('67c03540-3bab-4942-bfa8-6c5d7be884ae', 'DoktorYanında', 'Sağlık hizmetlerini dijitalleştiriyoruz', 
'DoktorYanında, Türkiye''nin lider telehealth platformudur. Hastalar, 7/24 video görüşme ile doktorlara ulaşabilir, reçete alabilir ve sağlık kayıtlarını güvenle saklayabilir. 500+ doktor ve 100.000+ aktif kullanıcı ile sağlık hizmetlerini herkes için erişilebilir kılıyoruz.',
'Sağlık', 'Seed', 'https://doktoryaninda.com', 'TR', null, 245, 18, true, 2022, '11-50', '$2M', NOW() - INTERVAL '30 days'),

('a1b2c3d4-e5f6-7890-abcd-ef1234567890', 'LojistikAI', 'Akıllı lojistik çözümleri', 
'LojistikAI, yapay zeka destekli lojistik optimizasyon platformudur. Rota planlaması, depo yönetimi ve teslimat takibi konularında şirketlere %30 maliyet tasarrufu sağlıyoruz. 50+ kurumsal müşteri ile Türkiye''nin en hızlı büyüyen lojistik-tech startup''ıyız.',
'Lojistik', 'Series A', 'https://lojistikai.com', 'TR', null, 189, 12, false, 2021, '51-100', '$5M', NOW() - INTERVAL '45 days'),

('b2c3d4e5-f6a7-8901-bcde-f12345678901', 'FinansTech', 'Kişisel finans yönetimi', 
'FinansTech, bireyler ve KOBİ''ler için akıllı finans yönetim uygulamasıdır. Bütçe takibi, yatırım önerileri ve otomatik tasarruf özellikleri ile kullanıcıların finansal hedeflerine ulaşmasına yardımcı oluyoruz. 250.000+ kullanıcı, 50M+ TL yönetilen varlık.',
'Fintech', 'Pre-seed', 'https://finanstech.io', 'TR', null, 312, 24, true, 2023, '1-10', '$500K', NOW() - INTERVAL '15 days'),

('c3d4e5f6-a7b8-9012-cdef-123456789012', 'EduPlay', 'Oyunlaştırılmış eğitim platformu', 
'EduPlay, K-12 öğrencileri için gamification tabanlı eğitim platformudur. Matematik, fen ve kodlama derslerini interaktif oyunlarla öğretiyoruz. MEB müfredatına uyumlu, 1000+ okul ve 500.000+ öğrenci tarafından kullanılıyor.',
'EdTech', 'Seed', 'https://eduplay.com.tr', 'TR', null, 567, 45, true, 2020, '11-50', '$3M', NOW() - INTERVAL '60 days'),

('d4e5f6a7-b8c9-0123-defa-234567890123', 'AgriSmart', 'Akıllı tarım teknolojileri', 
'AgriSmart, IoT sensörleri ve yapay zeka kullanarak çiftçilere akıllı tarım çözümleri sunar. Sulama optimizasyonu, hastalık tespiti ve verim tahmini ile tarımsal üretkenliği %40 artırıyoruz. 2000+ çiftçi, 50.000+ dönüm alan.',
'AgriTech', 'Series A', 'https://agrismart.com.tr', 'TR', null, 423, 32, false, 2019, '51-100', '$8M', NOW() - INTERVAL '90 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 2. PROBLEMS DATA
-- ============================================
INSERT INTO problems (id, title, description, category, country_code, country_name, author, votes, comments, created_at) VALUES
('16cb2ef5-a83e-43f2-befc-3f48782d9976', 'Elektrikli araç şarj eksikliği', 
'Türkiye''de elektrikli araç kullanıcıları olarak en büyük sorunumuz şarj istasyonu yetersizliği. Özellikle şehirlerarası yolculuklarda ve kırsal bölgelerde şarj istasyonu bulmak neredeyse imkansız. Mevcut istasyonların çoğu da farklı uygulamalar gerektiriyor, standart bir sistem yok. Bu durum EV adaptasyonunu ciddi şekilde engelliyor.',
'Ulaşım', 'TR', 'Türkiye', 'Mehmet K.', 342, 28, NOW() - INTERVAL '20 days'),

('e5f6a7b8-c9d0-1234-efab-345678901234', 'KOBİler için dijital pazarlama zorluğu', 
'Küçük işletme sahipleri olarak dijital pazarlama çok karmaşık ve maliyetli. Google Ads, Facebook, Instagram... Her platformun ayrı bilgi ve bütçe gerektirmesi küçük işletmeleri zorluyor. Basit, uygun fiyatlı ve etkili bir çözüm gerekiyor.',
'İş Dünyası', 'TR', 'Türkiye', 'Ayşe T.', 567, 45, NOW() - INTERVAL '10 days'),

('f6a7b8c9-d0e1-2345-fabc-456789012345', 'Yaşlılar için teknoloji erişim sorunu', 
'65 yaş üstü vatandaşların çoğu dijital hizmetlere erişmekte zorlanıyor. E-devlet, online bankacılık, sağlık randevusu gibi hayati hizmetler karmaşık arayüzler nedeniyle kullanılamıyor. Yaşlı dostu, basitleştirilmiş bir dijital asistan gerekiyor.',
'Sosyal', 'TR', 'Türkiye', 'Zeynep A.', 423, 67, NOW() - INTERVAL '35 days'),

('a7b8c9d0-e1f2-3456-abcd-567890123456', 'Gıda israfı problemi', 
'Restoranlar ve marketlerde günlük tonlarca gıda çöpe gidiyor. Son kullanma tarihi yaklaşan ürünleri ihtiyaç sahiplerine veya indirimli satışa yönlendirecek bir platform eksikliği var. Hem ekonomik hem çevresel büyük kayıp.',
'Sürdürülebilirlik', 'TR', 'Türkiye', 'Emre B.', 289, 34, NOW() - INTERVAL '50 days'),

('b8c9d0e1-f2a3-4567-bcde-678901234567', 'Freelancerlar için ödeme güvencesi', 
'Freelance çalışanlar olarak en büyük sorunumuz ödeme güvencesi. Projeyi teslim ettikten sonra ödeme almama riski çok yüksek. Escrow benzeri bir sistem veya güvenilir bir aracı platform Türkiye pazarında eksik.',
'Finans', 'TR', 'Türkiye', 'Can D.', 512, 89, NOW() - INTERVAL '5 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 3. JOBS DATA
-- ============================================
INSERT INTO jobs (id, title, company, company_logo, location, job_type, salary_range, description, requirements, benefits, apply_url, is_active, created_at) VALUES
('ff40376e-53f4-483c-ba16-8b911e6cbae8', 'Senior Frontend Developer', 'LojistikAI', null, 'İstanbul, Remote', 'Tam Zamanlı',
'60.000 - 90.000 TL',
'LojistikAI ekibine katılacak deneyimli bir Frontend Developer arıyoruz. React/Next.js teknolojileriyle çalışacak, kullanıcı deneyimini en üst düzeye çıkaracak modern ve performanslı arayüzler geliştireceksiniz. Startup kültürüne uyum sağlayabilecek, hızlı hareket edebilen adayları bekliyoruz.',
ARRAY['5+ yıl React deneyimi', 'Next.js bilgisi', 'TypeScript deneyimi', 'REST API entegrasyonu', 'Git versiyon kontrolü'],
ARRAY['Uzaktan çalışma imkanı', 'Esnek çalışma saatleri', 'Özel sağlık sigortası', 'Yıllık eğitim bütçesi', 'Stock option planı'],
'mailto:kariyer@lojistikai.com', true,
NOW() - INTERVAL '7 days'),

('a1234567-b890-cdef-1234-567890abcdef', 'Product Manager', 'DoktorYanında', null, 'İstanbul', 'Tam Zamanlı',
'70.000 - 100.000 TL',
'Sağlık teknolojileri alanında deneyimli bir Product Manager arıyoruz. Kullanıcı ihtiyaçlarını analiz edecek, ürün roadmapi oluşturacak ve cross-functional ekiplerle çalışarak ürün vizyonumuzu hayata geçireceksiniz.',
ARRAY['3+ yıl PM deneyimi', 'HealthTech deneyimi tercih sebebi', 'Agile/Scrum metodolojisi', 'Data-driven karar alma', 'Güçlü iletişim becerileri'],
ARRAY['Hibrit çalışma modeli', 'Liderlik eğitimleri', 'Yıllık performans bonusu', 'Sağlık sigortası', 'Yemek kartı'],
'mailto:pm@doktoryaninda.com', true,
NOW() - INTERVAL '3 days'),

('b2345678-c901-defa-2345-678901bcdef0', 'Data Scientist', 'AgriSmart', null, 'Ankara, Remote', 'Tam Zamanlı',
'55.000 - 80.000 TL',
'Tarım verilerini analiz edecek ve makine öğrenmesi modelleri geliştirecek bir Data Scientist arıyoruz. Hava durumu, toprak ve bitki verilerini kullanarak çiftçilere değerli öngörüler sunacaksınız.',
ARRAY['Python/R deneyimi', 'ML/DL framework bilgisi', 'SQL ve veri manipülasyonu', 'İstatistik bilgisi', 'Görselleştirme araçları'],
ARRAY['%100 remote çalışma', 'Konferans katılım desteği', 'Donanım desteği', 'Esnek izin politikası'],
'mailto:data@agrismart.com.tr', true,
NOW() - INTERVAL '14 days'),

('c3456789-d012-efab-3456-789012cdef01', 'UI/UX Designer', 'EduPlay', null, 'İstanbul', 'Tam Zamanlı',
'45.000 - 65.000 TL',
'Çocuklar için eğitici ve eğlenceli arayüzler tasarlayacak yaratıcı bir UI/UX Designer arıyoruz. Kullanıcı araştırması yapacak, wireframe ve prototip oluşturacak, tasarım sistemimizi geliştireceksiniz.',
ARRAY['3+ yıl UI/UX deneyimi', 'Figma/Sketch ustalığı', 'Çocuk UX deneyimi plus', 'Prototipleme araçları', 'Design thinking metodolojisi'],
ARRAY['Yaratıcı stüdyo ortamı', 'Tasarım eğitimleri', 'Yıllık Dribbble/Behance aboneliği', 'Ekipmanı kendin seç'],
'mailto:design@eduplay.com.tr', true,
NOW() - INTERVAL '21 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 4. INVESTORS/MENTORS DATA
-- ============================================
INSERT INTO investors (id, name, role, location, avatar, verified, bio, expertise, ticket_size, stage, geography, total_investments, active_deals, exits, created_at) VALUES
('a2036ae6-5a5c-48e9-899d-bcfc539ac6b8', 'Can Öztürk', 'Serial Entrepreneur & Angel Investor', 'İstanbul, Türkiye', 'CÖ', true,
'20 yıllık teknoloji ve girişimcilik deneyimi. 3 başarılı exit gerçekleştirdim. Şu an erken aşama startuplara yatırım yapıyor ve mentorluk veriyorum. E-ticaret, fintech ve SaaS alanlarında derin uzmanlık.',
ARRAY['E-ticaret', 'Fintech', 'SaaS', 'Büyüme Stratejisi'], '$50K - $250K', ARRAY['Pre-seed', 'Seed'], ARRAY['Türkiye', 'MENA'], 15, 4, 3, NOW() - INTERVAL '100 days'),

('be69e353-2697-4ffa-bf5d-67f0bd819e97', 'Deniz Aydın', 'UX Advisor & Design Mentor', 'Ankara, Türkiye', 'DA', true,
'Google ve Meta da 10+ yıl UX deneyimi. Şu an bağımsız danışman olarak startuplara ürün tasarımı konusunda mentorluk veriyorum. Human-centered design ve design thinking uzmanıyım.',
ARRAY['UX Design', 'Product Design', 'Design Thinking', 'User Research'], null, ARRAY['Mentorluk'], ARRAY['Türkiye'], 0, 0, 0, NOW() - INTERVAL '80 days'),

('c3047bf6-3a6c-49f0-a00e-dcfc640bd9c9', 'Murat Kaya', 'VC Partner', 'İstanbul, Türkiye', 'MK', true,
'Türk Ventures da Partner olarak erken ve büyüme aşaması yatırımlarından sorumluyum. Portföyde 25+ şirket, toplam 50M$ yatırım. Özellikle B2B SaaS ve marketplace modellere odaklanıyorum.',
ARRAY['B2B SaaS', 'Marketplace', 'Series A', 'Ölçekleme'], '$500K - $5M', ARRAY['Series A', 'Series B'], ARRAY['Türkiye', 'Avrupa'], 25, 8, 5, NOW() - INTERVAL '150 days'),

('d4158cf7-4b7d-50f1-b11f-edf6751ce0d0', 'Elif Yılmaz', 'Startup Advisor & Ex-CTO', 'İstanbul, Türkiye', 'EY', true,
'Trendyol ve Getir de CTO olarak görev yaptım. 15 yıllık yazılım geliştirme ve teknik liderlik deneyimi. Erken aşama startuplara teknik danışmanlık ve CTO mentorluk veriyorum.',
ARRAY['Tech Leadership', 'System Architecture', 'Scaling', 'Team Building'], null, ARRAY['Technical Advisory'], ARRAY['Türkiye'], 8, 3, 1, NOW() - INTERVAL '60 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 5. EVENTS DATA
-- ============================================
INSERT INTO events (id, title, description, date, time, location, event_type, attendees, max_attendees, speakers, image_url, registration_url, created_at) VALUES
('e5269df8-5c8e-61f2-c22f-fef6862df1e1', 'İstanbul Startup Summit 2025', 
'Türkiyenin en büyük startup etkinliği! 100+ startup, 50+ yatırımcı, networking ve pitch yarışması. Girişimcilik ekosisteminin tüm paydaşlarını bir araya getiriyoruz.',
'2025-01-15', '09:00', 'İstanbul Kongre Merkezi', 'Konferans', 245, 500, ARRAY['Can Öztürk', 'Elif Yılmaz', 'Murat Kaya'], null, 'https://istanbulstartupsummit.com', NOW() - INTERVAL '10 days'),

('f6370e19-6d9f-7213-d33a-0f1f973e02f2', 'Fintech Meetup - Ocak', 
'Aylık fintech buluşmamızda bu ay ödeme sistemlerindeki yenilikleri konuşacağız. Sektör liderlerinden sunumlar ve networking.',
'2025-01-20', '19:00', 'Kolektif House, Levent', 'Meetup', 78, 100, ARRAY['Fintech Turkey Ekibi'], null, 'https://meetup.com/fintech-turkey', NOW() - INTERVAL '5 days'),

('a7481f00-7e0a-8304-e441-0a0a084f03a3', 'AI & ML Workshop Serisi', 
'Üç günlük yoğun AI workshopu. Temel ML kavramlarından production deploymenta kadar hands-on eğitim. Sınırlı kontenjan!',
'2025-02-01', '10:00', 'Google for Startups Campus', 'Workshop', 32, 40, ARRAY['AI Turkey Ekibi'], null, 'https://ai-workshop.com.tr', NOW() - INTERVAL '2 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- 6. FORUM TOPICS DATA
-- ============================================
INSERT INTO forum_topics (id, title, content, category, author, author_avatar, replies, views, likes, is_pinned, tags, created_at) VALUES
('a8592001-8f1a-9405-f550-1a0a195014a4', 'Türkiyede startup kurmak için en iyi şehir hangisi?',
'Merhabalar, İstanbul dışında startup kurmayı düşünüyorum. Ankara, İzmir veya Antalyayı değerlendiriyorum. Deneyimlerinizi paylaşır mısınız? Özellikle yetenek havuzu, maliyet ve yaşam kalitesi açısından.',
'Genel', 'Ahmet Y.', 'AY', 34, 1245, 89, true, ARRAY['startup', 'şehir', 'karar'], NOW() - INTERVAL '15 days'),

('19603a12-9021-0516-a660-0111206a0515', 'Pre-seed yatırım sürecinizi nasıl yönettiniz?',
'İlk yatırım turumu kapatmaya çalışıyorum. Pitch deck hazırladım ama yatırımcılara nasıl ulaşacağım konusunda kararsızım. Cold email mi, intro mu? Tecrübelerinizi merak ediyorum.',
'Yatırım', 'Zehra K.', 'ZK', 28, 892, 56, false, ARRAY['yatırım', 'pre-seed', 'pitching'], NOW() - INTERVAL '8 days'),

('00714103-0a30-1607-a770-0030317106a6', 'Remote ekip yönetimi ipuçları',
'%100 remote çalışan bir startupım var. 10 kişilik ekibi yönetmek bazen zorlaşıyor. Özellikle iletişim ve kültür oluşturma konusunda önerileriniz var mı?',
'Operasyon', 'Burak T.', 'BT', 19, 567, 42, false, ARRAY['remote', 'ekip', 'yönetim'], NOW() - INTERVAL '3 days')
ON CONFLICT (id) DO NOTHING;

-- ============================================
-- MIGRATION COMPLETE!
-- Verify with: SELECT COUNT(*) FROM startups;
-- ============================================
