-- ============================================
-- AVORAHUB - TURKISH UNICORNS SEED DATA
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. TÜRK UNICORN STARTUPLARI
INSERT INTO startups (id, name, tagline, description, category, stage, website, country, logo_url, likes, comments, featured, founded_year, team_size, funding, created_at) VALUES

('a0eebc99-9c0b-4ef8-bb6d-6bb9bd380a11', 'Getir', 'Dakikalar içinde kapında.',
'Teknoloji, veri ve operasyonel mükemmeliyeti birleştirerek market teslimatını dakikalara indiren, dünyada bir ilki gerçekleştiren teknoloji şirketi. 2015 yılında kurulan Getir, ultra-hızlı teslimat modeliyle dünya çapında bir devrim yarattı.',
'Delivery / Teknoloji', 'Unicorn', 'https://getir.com', 'TR',
'https://upload.wikimedia.org/wikipedia/commons/7/7d/Getir_logo.svg',
1250, 89, true, 2015, '1000+', '$12B', NOW() - INTERVAL '1 day'),

('b0eebc99-9c0b-4ef8-bb6d-6bb9bd380b22', 'Insider', 'Tek platform, sınırsız büyüme.',
'Yapay zeka destekli platformumuzla dünya genelinde 1200+ markanın müşteri deneyimlerini kişiselleştirmesini sağlayan global bir SaaS şirketiyiz. Coca-Cola, Samsung gibi devlerle çalışıyoruz.',
'SaaS / AI', 'Unicorn', 'https://useinsider.com', 'TR',
'https://mma.prnewswire.com/media/1963089/Insider_Logo.jpg',
980, 67, true, 2012, '500+', '$1.2B', NOW() - INTERVAL '2 days'),

('c0eebc99-9c0b-4ef8-bb6d-6bb9bd380c33', 'Dream Games', 'Royal Match''in yaratıcısı.',
'Teknoloji ve yaratıcılığı birleştirerek dünyanın en çok oynanan mobil oyunlarını İstanbul''dan geliştiriyoruz. Royal Match oyunumuz dünya çapında 500 milyon+ indirme aldı.',
'Gaming', 'Unicorn', 'https://dreamgames.com', 'TR',
'https://dreamgames.com/wp-content/uploads/2021/04/dreamgames_logo.png',
1450, 112, true, 2019, '200+', '$2.75B', NOW() - INTERVAL '3 days'),

('d0eebc99-9c0b-4ef8-bb6d-6bb9bd380d44', 'Midas', 'Yatırımın en kolay hali.',
'Amerikan borsalarına ve Borsa İstanbul''a düşük komisyonlarla yatırım yapmayı sağlayan, finansal özgürlük platformu. 1 milyon+ kullanıcı, $500M+ işlem hacmi.',
'Fintech', 'Series B', 'https://getmidas.com', 'TR',
'https://mma.prnewswire.com/media/1997676/Midas_Logo.jpg',
720, 45, true, 2020, '100+', '$45M', NOW() - INTERVAL '4 days'),

('e0eebc99-9c0b-4ef8-bb6d-6bb9bd380e55', 'Martı', 'Şehrin ulaşım süper uygulaması.',
'Mikro mobilite çözümleriyle şehir içi ulaşımı kolaylaştıran, çevre dostu ve paylaşımcı teknoloji girişimi. Elektrikli scooter, bisiklet ve moped paylaşımı.',
'Mobility', 'Series C', 'https://marti.tech', 'TR',
'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Mart%C4%B1_logo.svg/2560px-Mart%C4%B1_logo.svg.png',
560, 38, false, 2018, '200+', '$100M', NOW() - INTERVAL '5 days')

ON CONFLICT (id) DO NOTHING;

-- 2. İŞ İLANLARI (Unicornlara bağlı)
INSERT INTO jobs (id, title, company, company_logo, location, job_type, salary_range, description, requirements, benefits, apply_url, is_active, created_at) VALUES

-- GETİR İLANLARI
('f1111111-1111-1111-1111-111111111111', 'Senior Backend Engineer (Go)', 'Getir',
'https://upload.wikimedia.org/wikipedia/commons/7/7d/Getir_logo.svg',
'İstanbul (Hibrit)', 'Tam Zamanlı', '90.000₺ - 140.000₺',
'Yüksek trafikli sistemlerimizi ölçeklendirecek, Go diline hakim, mikroservis mimarisinde deneyimli takım arkadaşı arıyoruz. Dakikalık teslimat altyapımızı geliştirin.',
ARRAY['5+ yıl Backend deneyimi', 'Go/Golang uzmanlığı', 'Kubernetes', 'PostgreSQL', 'Redis'],
ARRAY['Rekabetçi maaş', 'Stock option', 'Uzaktan çalışma', 'Yemek kartı', 'Özel sağlık sigortası'],
'https://getir.com/careers', true, NOW() - INTERVAL '1 day'),

('f2222222-2222-2222-2222-222222222222', 'Data Scientist', 'Getir',
'https://upload.wikimedia.org/wikipedia/commons/7/7d/Getir_logo.svg',
'İstanbul (Ofis)', 'Tam Zamanlı', '70.000₺ - 110.000₺',
'Büyük veri setleri üzerinde çalışarak teslimat sürelerini optimize edecek algoritmalar geliştirecek veri bilimcisi. ML modelleri ile operasyonel mükemmelliği artırın.',
ARRAY['Python/R', 'Machine Learning', 'SQL', 'TensorFlow/PyTorch', 'A/B testing'],
ARRAY['Data-driven kültür', 'Mentorluk', 'Eğitim bütçesi', 'Kafeterya'],
'https://getir.com/careers', true, NOW() - INTERVAL '3 days'),

-- INSIDER İLANLARI
('f3333333-3333-3333-3333-333333333333', 'AI Product Manager', 'Insider',
'https://mma.prnewswire.com/media/1963089/Insider_Logo.jpg',
'Remote (Global)', 'Tam Zamanlı', 'Dolar Bazlı',
'Insider''ın yapay zeka ürünlerinin yol haritasını belirleyecek, global vizyona sahip ürün yöneticisi. 1200+ enterprise müşteriye hizmet veren AI platformumuzu şekillendireceksiniz.',
ARRAY['5+ yıl PM deneyimi', 'AI/ML ürün deneyimi', 'SaaS B2B', 'İngilizce C1', 'Data Analytics'],
ARRAY['Remote-first kültür', 'Dolar maaş', 'Stock option', 'Unlimited PTO'],
'https://useinsider.com/careers', true, NOW() - INTERVAL '2 days'),

('f4444444-4444-4444-4444-444444444444', 'Customer Success Manager', 'Insider',
'https://mma.prnewswire.com/media/1963089/Insider_Logo.jpg',
'İstanbul', 'Tam Zamanlı', '40.000₺ - 60.000₺',
'Global müşterilerimizin platform kullanımını optimize edecek, İngilizcesi akıcı iletişim uzmanı. Samsung, Coca-Cola gibi markalarla çalışacaksınız.',
ARRAY['3+ yıl CS deneyimi', 'SaaS deneyimi', 'İngilizce B2+', 'CRM bilgisi', 'Sunum becerileri'],
ARRAY['Global ekip', 'Kariyer gelişimi', 'Sağlık sigortası', 'Yemek kartı'],
'https://useinsider.com/careers', true, NOW() - INTERVAL '5 days'),

-- DREAM GAMES İLANLARI
('f5555555-5555-5555-5555-555555555555', 'Senior Unity Developer', 'Dream Games',
'https://dreamgames.com/wp-content/uploads/2021/04/dreamgames_logo.png',
'İstanbul (Ofis)', 'Tam Zamanlı', '120.000₺ + Bonus',
'Mobil oyun geliştirme konusunda tutkulu, C# ve Unity motoruna hakim deneyimli geliştirici. Royal Match ekibine katılın ve milyonlarca oyuncuya ulaşan oyunlar geliştirin.',
ARRAY['5+ yıl Unity', 'C# uzmanlığı', 'Mobil oyun deneyimi', 'Optimizasyon', 'Shader bilgisi'],
ARRAY['Dünya standartlarında maaş', 'Yıllık bonus', 'Oyun endüstrisi deneyimi', 'Rahat ofis'],
'https://dreamgames.com/careers', true, NOW() - INTERVAL '1 day'),

('f6666666-6666-6666-6666-666666666666', '3D Game Artist', 'Dream Games',
'https://dreamgames.com/wp-content/uploads/2021/04/dreamgames_logo.png',
'İstanbul', 'Tam Zamanlı', '80.000₺ - 120.000₺',
'Royal Match dünyasını zenginleştirecek, stilize sanat tarzına hakim 3D sanatçısı. Dünya çapında 500M+ indirme alan oyunun görsel dünyasını şekillendireceksiniz.',
ARRAY['3D Maya/Blender', 'Stilize sanat', 'Texture painting', 'Mobil optimizasyon'],
ARRAY['Yaratıcı ortam', 'Sanat ekibi', 'Referans gezileri', 'Ekipman desteği'],
'https://dreamgames.com/careers', true, NOW() - INTERVAL '7 days'),

-- MIDAS İLANLARI
('f7777777-7777-7777-7777-777777777777', 'Mobile Developer (Flutter)', 'Midas',
'https://mma.prnewswire.com/media/1997676/Midas_Logo.jpg',
'İstanbul (Hibrit)', 'Tam Zamanlı', '60.000₺ - 90.000₺',
'Finansal teknolojiler alanında kullanıcı dostu arayüzler geliştirecek Flutter uzmanı. 1M+ kullanıcının yatırım deneyimini iyileştireceksiniz.',
ARRAY['3+ yıl Flutter', 'Dart', 'REST API', 'State management', 'iOS/Android deployment'],
ARRAY['Fintech deneyimi', 'Hızlı büyüme', 'Stock option', 'Esnek çalışma'],
'https://getmidas.com/careers', true, NOW() - INTERVAL '4 days'),

('f8888888-8888-8888-8888-888888888888', 'Compliance Officer', 'Midas',
'https://mma.prnewswire.com/media/1997676/Midas_Logo.jpg',
'İstanbul', 'Tam Zamanlı', '50.000₺ - 80.000₺',
'SPK ve yasal mevzuatlara uyum süreçlerini yönetecek hukuk veya finans kökenli uzman. Yatırım platformumuzun regülasyonlarla uyumunu sağlayacaksınız.',
ARRAY['SPK mevzuatı', 'Finans/Hukuk lisans', 'AML/KYC', 'Risk yönetimi'],
ARRAY['Regtech deneyimi', 'Kariyer gelişimi', 'Sağlık sigortası'],
'https://getmidas.com/careers', true, NOW() - INTERVAL '10 days'),

-- MARTI İLANLARI
('f9999999-9999-9999-9999-999999999999', 'Operations Manager', 'Martı',
'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Mart%C4%B1_logo.svg/2560px-Mart%C4%B1_logo.svg.png',
'İzmir', 'Tam Zamanlı', '35.000₺ - 50.000₺',
'Ege bölgesindeki saha operasyonlarını ve filo yönetimini koordine edecek yönetici. 10.000+ araçlık filonun operasyonlarını yöneteceksiniz.',
ARRAY['Operasyon yönetimi', 'Filo deneyimi', 'Liderlik', 'Analitik düşünce'],
ARRAY['Saha deneyimi', 'Araç tahsisi', 'Büyüme fırsatı'],
'https://marti.tech/careers', true, NOW() - INTERVAL '6 days'),

('faaaaaaa-aaaa-aaaa-aaaa-aaaaaaaaaaaa', 'IoT Embedded Engineer', 'Martı',
'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Mart%C4%B1_logo.svg/2560px-Mart%C4%B1_logo.svg.png',
'İstanbul (Ar-Ge)', 'Tam Zamanlı', '80.000₺ - 120.000₺',
'Martı cihazlarının gömülü yazılımlarını geliştirecek, C/C++ bilgisine sahip mühendis. Scooter, bisiklet ve mopedlerin IoT sistemlerini tasarlayacaksınız.',
ARRAY['C/C++ embedded', 'IoT protokolleri', 'BLE/WiFi', 'PCB bilgisi', 'RTOS'],
ARRAY['Ar-Ge laboratuvarı', 'Prototip imkanı', 'Patent bonus', 'Eğitim bütçesi'],
'https://marti.tech/careers', true, NOW() - INTERVAL '8 days')

ON CONFLICT (id) DO NOTHING;

-- ============================================
-- VERIFICATION
-- ============================================
SELECT 'UNICORNS ADDED:' as status, COUNT(*) as count FROM startups WHERE stage = 'Unicorn'
UNION ALL
SELECT 'UNICORN JOBS ADDED:', COUNT(*) FROM jobs WHERE company IN ('Getir', 'Insider', 'Dream Games', 'Midas', 'Martı');
