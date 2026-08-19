/**
 * Garuda Mas Shipping - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', function () {
    // 1. Navbar scroll effect
    const navbar = document.getElementById('mainNav');

    if (navbar) {
        window.addEventListener('scroll', function () {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }

    // 2. Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId.startsWith('#')) return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();

                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click();
                }

                const navHeight = navbar ? navbar.offsetHeight : 0;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Search Modal Functionality
    const searchTriggers = document.querySelectorAll('.search-trigger');
    const searchModal = document.getElementById('searchModal');
    const searchCloseBtn = document.getElementById('searchCloseBtn');
    const searchInput = document.getElementById('searchModalInput');

    if (searchModal) {
        searchTriggers.forEach(trigger => {
            trigger.addEventListener('click', function (e) {
                e.preventDefault();
                searchModal.classList.add('show');
                if (searchInput) {
                    setTimeout(() => searchInput.focus(), 150);
                }
            });
        });

        if (searchCloseBtn) {
            searchCloseBtn.addEventListener('click', function () {
                searchModal.classList.remove('show');
            });
        }

        searchModal.addEventListener('click', function (e) {
            if (e.target === searchModal) {
                searchModal.classList.remove('show');
            }
        });

        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && searchModal.classList.contains('show')) {
                searchModal.classList.remove('show');
            }
        });
    }

    // 4. Connected Nationwide Map Switcher (Jakarta / Medan)
    const mapPillButtons = document.querySelectorAll('.location-pill-btn');
    const nationwideMapIframe = document.getElementById('nationwideMapIframe');
    const mapLocationTitle = document.getElementById('mapLocationTitle');
    const mapLocationAddress = document.getElementById('mapLocationAddress');
    const mapExternalLink = document.getElementById('mapExternalLink');

    const locationData = {
        jakarta: {
            title_en: "Jakarta Head Office (HQ)",
            title_id: "Kantor Pusat Jakarta (HQ)",
            address: "Galeri Niaga Mediterania II, Jl. Pantai Indah Utara 2 Blok J8 L, North Jakarta 14460",
            embedUrl: "https://maps.google.com/maps?q=Galeri%20Niaga%20Mediterania%20II%20Pantai%20Indah%20Kapuk%20Jakarta&t=&z=15&ie=UTF8&iwloc=&output=embed",
            externalUrl: "https://maps.app.goo.gl/EW4m8V6uoxpQNSDp7"
        },
        medan: {
            title_en: "Medan Branch Office",
            title_id: "Kantor Cabang Medan",
            address: "Mega Prima Building 6th Floor, Jl. Kapt. Pattimura No.92 Medan, North Sumatera 20153",
            embedUrl: "https://maps.google.com/maps?q=Mega%20Prima%20Building%20Medan&t=&z=15&ie=UTF8&iwloc=&output=embed",
            externalUrl: "https://maps.app.goo.gl/wnggGRr87YSMLQvG9"
        }
    };

    if (mapPillButtons.length > 0 && nationwideMapIframe) {
        mapPillButtons.forEach(btn => {
            btn.addEventListener('click', function () {
                const locKey = this.getAttribute('data-location');
                if (!locationData[locKey]) return;

                mapPillButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');

                nationwideMapIframe.src = locationData[locKey].embedUrl;

                const currentLang = localStorage.getItem('gms_lang') || 'en';
                if (mapLocationTitle) {
                    mapLocationTitle.textContent = currentLang === 'id' ? locationData[locKey].title_id : locationData[locKey].title_en;
                }
                if (mapLocationAddress) {
                    mapLocationAddress.textContent = locationData[locKey].address;
                }
                if (mapExternalLink) {
                    mapExternalLink.href = locationData[locKey].externalUrl;
                }
            });
        });
    }

    // 5. Contact Form Submission Handler
    const contactForm = document.getElementById('gmsContactForm');
    const formSuccessAlert = document.getElementById('formSuccessAlert');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            if (formSuccessAlert) {
                formSuccessAlert.classList.remove('d-none');
                contactForm.reset();
                formSuccessAlert.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => {
                    formSuccessAlert.classList.add('d-none');
                }, 7000);
            }
        });
    }

    // 6. Multi-Language Switcher (EN / ID)
    const langSwitchButtons = document.querySelectorAll('[data-lang]');
    const currentLangLabel = document.getElementById('currentLangLabel');

    const translations = {
        en: {
            // Navbar
            nav_home: "Home",
            nav_about: "About",
            nav_services: "Services",
            nav_contact: "Contact Us",
            nav_search: "SEARCH",
            nav_login: "LOGIN",

            // Hero
            hero_badge_1: "Leading Maritime Excellence",
            hero_title_1: "Global Shipping & Cargo Logistics",
            hero_desc_1: "Connecting world ports with reliable, efficient, and technologically advanced maritime freight solutions.",
            hero_badge_2: "World-Class Port Infrastructure",
            hero_title_2: "Precision Port & Terminal Solutions",
            hero_desc_2: "Delivering optimal turnaround times and seamless cargo handling at strategic hubs worldwide.",
            hero_badge_3: "Integrated Supply Chain",
            hero_title_3: "End-to-End Multimodal Transport",
            hero_desc_3: "Comprehensive sea freight, customs clearance, and road logistics tailored to your business needs.",
            hero_btn_services: "Our Services",
            hero_btn_contact: "Contact Us",

            // Home - About Us Teaser
            about_tag: "About Us",
            about_title: "Connecting The World Through Maritime Excellence",
            about_desc: "PT. Garuda Mas Shipping was established in 2023 in Jakarta, Indonesia, as a response to the increasingly dynamic needs of the logistics industry. While we are a progressive entity, our core strength is rooted in the leadership of our founder, Ms. Yani Elviani.",
            about_vessels: "Vessels",
            about_ports: "Ports",
            about_employees: "Employees",
            about_btn_more: "Read More",

            // Values
            values_tag: "Core Principles",
            values_title: "Our Values",
            values_desc: "We are guided by unwavering principles that shape our operations, culture, and commitment to delivering exceptional maritime services safely and responsibly.",
            vision_title: "Our Vision",
            vision_desc: "To be the leading global maritime logistics partner, recognized for our operational excellence, innovation, and sustainable practices.",
            mission_title: "Our Mission",
            mission_desc: "To provide safe, reliable, and cost-effective maritime transport solutions while fostering a culture of continuous improvement.",
            hsse_title: "HSSE Excellence",
            hsse_desc: "Prioritizing Health, Safety, Security, and Environment in every operation to protect our people, assets, and the planet.",

            // Services
            services_tag: "Our Core Expertise",
            services_title: "Services",
            services_desc: "Our integrated approach combines specialized divisions, ensuring comprehensive solutions across the maritime logistics spectrum.",
            
            service_1_eyebrow: "01. Global Reach",
            service_1_title: "Sea Freight",
            service_1_desc: "Our partnerships with carriers will help you to move your cargo at an optimal transportation time and cost.",
            service_1_f1: "FCL & LCL Shipments",
            service_1_f2: "Route Optimization",
            service_1_f3: "Global Carrier Network",
            service_1_f4: "Cost Effective",

            service_2_eyebrow: "02. Smooth Processing",
            service_2_title: "Customs Clearance",
            service_2_desc: "We handle customs processing for import and export clearance, declaration and certificate etc.",
            service_2_f1: "Import & Export Clearance",
            service_2_f2: "Certificates Handling",
            service_2_f3: "Document Processing",
            service_2_f4: "Compliance Consultation",

            service_3_eyebrow: "03. End-To-End",
            service_3_title: "Project Logistic",
            service_3_desc: "We provide end-to-end services to deliver all cargo associated with a client project in the correct sequence.",
            service_3_f1: "Heavy Lift Operations",
            service_3_f2: "Sequence Planning",
            service_3_f3: "Site Management",
            service_3_f4: "Dedicated Supervision",

            service_4_eyebrow: "04. Secure Storage",
            service_4_title: "Warehousing",
            service_4_desc: "We provide warehousing services to ease our clients with storing their goods and loading their goods into container.",
            service_4_f1: "Secure Storage Facilities",
            service_4_f2: "Container Stuffing",
            service_4_f3: "Loading & Unloading",
            service_4_f4: "Inventory Management",

            service_5_eyebrow: "05. Reliable Mobility",
            service_5_title: "Land Transportation",
            service_5_desc: "We provide reliable land transportation services, offering safe, efficient, and trusted mobility solutions for your business needs.",
            service_5_f1: "Container Truck Fleet",
            service_5_f2: "GPS Fleet Tracking",
            service_5_f3: "Heavy Cargo Hauling",
            service_5_f4: "On-Time Delivery",

            // Connected Nationwide Section
            nationwide_tag: "Head Office & Branches",
            nationwide_title: "Connected Nationwide",
            nationwide_desc: "With our head office in Jakarta and branches across key cities, Garuda Mas Shipping is positioned to support your operations wherever you do business.",
            btn_open_maps: "Open in Google Maps",

            // About Page specifics
            about_page_title: "About Us",
            story_tag: "Our Story",
            story_title: "A Legacy of Maritime Excellence",
            story_p1: "PT. Garuda Mas Shipping was established in 2023 in Jakarta, Indonesia, as a response to the increasingly dynamic needs of the logistics industry. While we are a progressive entity, our core strength is rooted in the leadership of our founder, Ms. Yani Elviani, who brings extensive experience in the freight forwarding and shipping agency industry dating back to 2015.",
            story_p2: "Her professional journey includes a solid track record in managing various global shipping business lines, ranging from agency representation for Heung-A, Emirates Shipping Line, and Bengal Tiger Line, to specializing in Out of Gauge (OOG) cargo with Sarjak Container Lines. Her diversified expertise in the Isotank sector (ITT & Suttons), as well as vessel operations (X-Press Feeder) and NVOCC, serves as the primary pillar shaping the service standards at PT. Garuda Mas Shipping.",
            founder_quote: "\"PT. Garuda Mas Shipping build trust through precision, acting as a strategic partner for your international business growth.\"",
            founder_role: "Founder & Director",

            reach_tag: "Our Reach",
            reach_title: "Global Network, Local Expertise",
            reach_desc: "We maintain a strong presence in major international shipping routes, combining our extensive global infrastructure with deep local knowledge to deliver unparalleled service across continents.",
            reach_terminals: "Port Terminals",
            reach_vessels: "Modern Vessels",
            reach_professionals: "Professionals",
            reach_iso: "ISO 9001",
            btn_partner: "Partner With Us",

            // Services Page specifics
            services_page_title: "Our Services",
            services_overview_tag: "Comprehensive Solutions",
            services_overview_title: "Driving Global Trade Forward",
            services_overview_desc: "At Garuda Mas Shipping, we offer a comprehensive suite of maritime and logistics services designed to meet the complex demands of global supply chains. Our tailored solutions ensure efficiency, reliability, and precision for every cargo we handle.",
            
            why_choose_tag: "The Garuda Mas Advantage",
            why_choose_title: "Why Choose Our Services",
            benefit_1_title: "Global Network",
            benefit_1_desc: "Extensive partnerships across major international ports ensuring seamless cross-border logistics.",
            benefit_2_title: "24/7 Operations",
            benefit_2_desc: "Round-the-clock monitoring and support to address any operational needs immediately.",
            benefit_3_title: "Secure & Safe",
            benefit_3_desc: "Strict adherence to international maritime safety standards and cargo protection protocols.",
            benefit_4_title: "Cost Efficient",
            benefit_4_desc: "Optimized routing and integrated supply chain management to reduce your overall logistics costs.",

            cta_title: "Ready to Optimize Your Logistics?",
            cta_desc: "Partner with Garuda Mas Shipping today and experience a new standard of maritime excellence. Let our experts craft a tailored solution for your business.",
            btn_quote: "Get a Quote",

            // Contact Page specifics
            contact_page_title: "Contact Us",
            contact_hero_subtitle: "Contact our team to discuss your logistics and supply chain needs.",
            contact_tag: "Send Message",
            contact_heading: "Tell us your needs, and we will support your business",
            contact_subheading: "Have questions, need further information, or looking for the right logistics solutions? Fill out this form and our team will get in touch with you shortly.",
            contact_lbl_name: "Full Name *",
            contact_ph_name: "e.g. John Doe",
            contact_lbl_email: "Email *",
            contact_ph_email: "e.g. name@company.com",
            contact_lbl_phone: "Phone Number *",
            contact_ph_phone: "e.g. +62 812 3456 7890",
            contact_lbl_company: "Company *",
            contact_ph_company: "e.g. PT Global Maritime",
            contact_lbl_position: "Position *",
            contact_ph_position: "e.g. Supply Chain Manager",
            contact_lbl_service: "Services of Interest *",
            contact_opt_select: "Select...",
            contact_opt_integrated: "Integrated Supply Chain Solution",
            contact_lbl_source: "How did you hear about Garuda Mas Shipping?",
            contact_src_search: "Website / Search Engine",
            contact_src_social: "Social Media (LinkedIn, Instagram)",
            contact_src_ref: "Business Partner / Referral",
            contact_src_event: "Logistics Expo / Conference",
            contact_src_other: "Other",
            contact_lbl_message: "Inquiry / Message *",
            contact_ph_message: "Write your message or inquiry here...",
            contact_btn_submit: "Submit Message",
            contact_alert_success_title: "Message Sent Successfully!",
            contact_alert_success: "Thank you! Your message has been sent. Our team will contact you shortly.",

            // Footer
            footer_about: "Delivering excellence across the world's oceans. Your trusted partner in global maritime logistics and supply chain solutions.",
            footer_quick_links: "Quick Links",
            footer_contact_us: "Contact Us",
            footer_jakarta: "Jakarta Office",
            footer_medan: "Medan Office",
            footer_rights: "© 2026 Garuda Mas Shipping. All Rights Reserved.",
            footer_privacy: "Privacy Policy",
            footer_terms: "Terms of Service"
        },
        id: {
            // Navbar
            nav_home: "Beranda",
            nav_about: "Tentang Kami",
            nav_services: "Layanan",
            nav_contact: "Hubungi Kami",
            nav_search: "CARI",
            nav_login: "MASUK",

            // Hero
            hero_badge_1: "Keunggulan Maritim Terdepan",
            hero_title_1: "Pengiriman Kargo & Logistik Global",
            hero_desc_1: "Menghubungkan pelabuhan dunia dengan solusi pengiriman kargo maritim yang handal, efisien, dan berteknologi maju.",
            hero_badge_2: "Infrastruktur Pelabuhan Berkelas Dunia",
            hero_title_2: "Solusi Presisi Terminal & Pelabuhan",
            hero_desc_2: "Menghadirkan waktu putar armada yang optimal dan penanganan kargo yang lancar di pusat strategis dunia.",
            hero_badge_3: "Rantai Pasok Terintegrasi",
            hero_title_3: "Transportasi Multimoda Ujung-ke-Ujung",
            hero_desc_3: "Pengangkutan laut, kepabeanan, dan logistik darat yang disesuaikan dengan kebutuhan bisnis Anda.",
            hero_btn_services: "Layanan Kami",
            hero_btn_contact: "Hubungi Kami",

            // Home - About Us Teaser
            about_tag: "Tentang Kami",
            about_title: "Menghubungkan Dunia Melalui Keunggulan Maritim",
            about_desc: "PT. Garuda Mas Shipping didirikan pada tahun 2023 di Jakarta, Indonesia, untuk menjawab kebutuhan industri logistik yang semakin dinamis di bawah kepemimpinan pendiri kami, Ibu Yani Elviani.",
            about_vessels: "Kapal",
            about_ports: "Pelabuhan",
            about_employees: "Karyawan",
            about_btn_more: "Selengkapnya",

            // Values
            values_tag: "Prinsip Utama",
            values_title: "Nilai-Nilai Kami",
            values_desc: "Kami dipandu oleh prinsip teguh yang membentuk operasional, budaya, dan komitmen kami untuk memberikan layanan maritim terbaik dengan aman dan bertanggung jawab.",
            vision_title: "Visi Kami",
            vision_desc: "Menjadi mitra logistik maritim global terdepan yang diakui atas keunggulan operasional, inovasi, dan praktik berkelanjutan.",
            mission_title: "Misi Kami",
            mission_desc: "Menyediakan solusi transportasi maritim yang aman, andal, dan hemat biaya serta menumbuhkan budaya perbaikan berkelanjutan.",
            hsse_title: "Keunggulan HSSE",
            hsse_desc: "Memprioritaskan Kesehatan, Keselamatan, Keamanan, dan Lingkungan dalam setiap operasi untuk melindungi insan dan bumi kita.",

            // Services
            services_tag: "Keahlian Utama Kami",
            services_title: "Layanan",
            services_desc: "Pendekatan terintegrasi kami memadukan divisi khusus, memastikan solusi menyeluruh di seluruh spektrum logistik maritim.",
            
            service_1_eyebrow: "01. Jangkauan Global",
            service_1_title: "Sea Freight",
            service_1_desc: "Kemitraan kami dengan operator kapal membantu Anda mengangkut kargo dengan waktu dan biaya transportasi yang optimal.",
            service_1_f1: "Pengiriman FCL & LCL",
            service_1_f2: "Optimasi Rute Pelayaran",
            service_1_f3: "Jaringan Operator Global",
            service_1_f4: "Hemat Biaya",

            service_2_eyebrow: "02. Pemrosesan Lancar",
            service_2_title: "Customs Clearance",
            service_2_desc: "Kami menangani pemrosesan kepabeanan untuk izin ekspor dan impor, deklarasi, serta sertifikasi resmi.",
            service_2_f1: "Izin Impor & Ekspor",
            service_2_f2: "Penanganan Sertifikat",
            service_2_f3: "Pemrosesan Dokumen",
            service_2_f4: "Konsultasi Kepatuhan",

            service_3_eyebrow: "03. Ujung-ke-Ujung",
            service_3_title: "Project Logistic",
            service_3_desc: "Kami menyediakan layanan menyeluruh untuk mengirimkan seluruh kargo proyek klien dalam urutan yang tepat.",
            service_3_f1: "Operasi Muatan Berat",
            service_3_f2: "Perencanaan Sekuensial",
            service_3_f3: "Manajemen Lokasi",
            service_3_f4: "Supervisi Khusus",

            service_4_eyebrow: "04. Penyimpanan Aman",
            service_4_title: "Warehousing",
            service_4_desc: "Kami menyediakan layanan pergudangan untuk memudahkan penyimpanan barang dan pemuatan ke dalam kontainer.",
            service_4_f1: "Fasilitas Gudang Aman",
            service_4_f2: "Stuffing Kontainer",
            service_4_f3: "Muat & Bongkar Barang",
            service_4_f4: "Manajemen Inventaris",

            service_5_eyebrow: "05. Mobilitas Terpercaya",
            service_5_title: "Land Transportation",
            service_5_desc: "Kami menyediakan layanan transportasi darat terpercaya, menghadirkan solusi mobilitas yang aman, efisien, dan tepat waktu untuk kebutuhan bisnis Anda.",
            service_5_f1: "Armada Truk Kontainer",
            service_5_f2: "Pelacakan GPS Armada",
            service_5_f3: "Pengangkutan Kargo Berat",
            service_5_f4: "Pengiriman Tepat Waktu",

            // Connected Nationwide Section
            nationwide_tag: "Kantor Pusat & Cabang",
            nationwide_title: "Terhubung Secara Nasional",
            nationwide_desc: "Dengan kantor pusat di Jakarta dan cabang di berbagai kota strategis, Garuda Mas Shipping siap mendukung operasional bisnis Anda di mana pun berada.",
            btn_open_maps: "Buka di Google Maps",

            // About Page specifics
            about_page_title: "Tentang Kami",
            story_tag: "Kisah Kami",
            story_title: "Warisan Keunggulan Maritim",
            story_p1: "PT. Garuda Mas Shipping didirikan pada tahun 2023 di Jakarta, Indonesia, untuk menjawab kebutuhan industri logistik yang semakin dinamis. Kekuatan utama kami berakar pada kepemimpinan pendiri kami, Ibu Yani Elviani, yang memiliki pengalaman luas di industri freight forwarding dan keagenan pelayaran sejak tahun 2015.",
            story_p2: "Perjalanan profesional beliau mencakup rekam jejak solid dalam mengelola berbagai lini bisnis pelayaran global, mulai dari keagenan Heung-A, Emirates Shipping Line, dan Bengal Tiger Line, hingga spesialisasi kargo Out of Gauge (OOG) bersama Sarjak Container Lines. Keahlian di sektor Isotank (ITT & Suttons), operasional kapal (X-Press Feeder), dan NVOCC menjadi pilar utama standar layanan PT. Garuda Mas Shipping.",
            founder_quote: "\"PT. Garuda Mas Shipping membangun kepercayaan melalui presisi, bertindak sebagai mitra strategis bagi pertumbuhan bisnis internasional Anda.\"",
            founder_role: "Pendiri & Direktur Utama",

            reach_tag: "Jangkauan Kami",
            reach_title: "Jaringan Global, Keahlian Lokal",
            reach_desc: "Kami hadir di rute pelayaran internasional utama, memadukan infrastruktur global luas dengan pengetahuan lokal mendalam untuk menghadirkan layanan prima lintas benua.",
            reach_terminals: "Terminal Pelabuhan",
            reach_vessels: "Kapal Modern",
            reach_professionals: "Profesional",
            reach_iso: "ISO 9001",
            btn_partner: "Bermitra Dengan Kami",

            // Services Page specifics
            services_page_title: "Layanan Kami",
            services_overview_tag: "Solusi Menyeluruh",
            services_overview_title: "Mendorong Perdagangan Global Maju",
            services_overview_desc: "Di Garuda Mas Shipping, kami menawarkan rangkaian lengkap layanan maritim dan logistik yang dirancang untuk memenuhi tuntutan rantai pasok global. Solusi kami memastikan efisiensi, keandalan, dan presisi bagi setiap kargo.",
            
            why_choose_tag: "Keunggulan Garuda Mas",
            why_choose_title: "Mengapa Memilih Layanan Kami",
            benefit_1_title: "Jaringan Global",
            benefit_1_desc: "Kemitraan luas di pelabuhan internasional utama memastikan kelancaran logistik lintas batas negara.",
            benefit_2_title: "Operasional 24/7",
            benefit_2_desc: "Pemantauan dan dukungan tanpa henti sepanjang waktu untuk merespons setiap kebutuhan operasional secara instan.",
            benefit_3_title: "Aman & Terlindungi",
            benefit_3_desc: "Kepatuhan ketat terhadap standar keselamatan maritim internasional dan protokol perlindungan kargo.",
            benefit_4_title: "Efisien & Hemat",
            benefit_4_desc: "Perutean yang dioptimalkan dan manajemen rantai pasok terintegrasi untuk menekan total biaya logistik Anda.",

            cta_title: "Siap Mengoptimalkan Logistik Anda?",
            cta_desc: "Bermitra dengan Garuda Mas Shipping hari ini dan rasakan standar baru keunggulan maritim. Tim ahli kami siap menyusun solusi terbaik untuk bisnis Anda.",
            btn_quote: "Dapatkan Penawaran",

            // Contact Page specifics
            contact_page_title: "Hubungi Kami",
            contact_hero_subtitle: "Hubungi tim kami untuk mendiskusikan kebutuhan logistik dan rantai pasok Anda.",
            contact_tag: "Kirim Pesan",
            contact_heading: "Sampaikan kebutuhan Anda, dan kami dapat mendukung bisnis Anda",
            contact_subheading: "Punya pertanyaan, membutuhkan informasi lebih lanjut, atau sedang mencari solusi logistik yang tepat? Isi formulir ini dan tim kami akan segera menghubungi Anda.",
            contact_lbl_name: "Nama Lengkap *",
            contact_ph_name: "Contoh: Budi Santoso",
            contact_lbl_email: "Email *",
            contact_ph_email: "Contoh: email@bisnis.com",
            contact_lbl_phone: "Nomor Telepon *",
            contact_ph_phone: "Contoh: 081234567890",
            contact_lbl_company: "Perusahaan *",
            contact_ph_company: "Contoh: PT Jaya Berkah",
            contact_lbl_position: "Posisi *",
            contact_ph_position: "Contoh: Manajer Logistik / Pemasaran",
            contact_lbl_service: "Bisnis yang Diminati *",
            contact_opt_select: "Pilih...",
            contact_opt_integrated: "Solusi Rantai Pasok Terintegrasi",
            contact_lbl_source: "Dari mana Anda mengetahui Garuda Mas Shipping?",
            contact_src_search: "Situs Web / Mesin Pencari",
            contact_src_social: "Media Sosial (LinkedIn, Instagram)",
            contact_src_ref: "Mitra Bisnis / Rekomendasi",
            contact_src_event: "Pameran / Konferensi Logistik",
            contact_src_other: "Lainnya",
            contact_lbl_message: "Pertanyaan *",
            contact_ph_message: "Tulis pesan atau pertanyaan Anda di sini...",
            contact_btn_submit: "Kirim",
            contact_alert_success_title: "Pesan Berhasil Terkirim!",
            contact_alert_success: "Terima kasih! Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.",

            // Footer
            footer_about: "Menghadirkan keunggulan di seluruh samudera dunia. Mitra terpercaya Anda dalam logistik maritim global dan solusi rantai pasok.",
            footer_quick_links: "Tautan Cepat",
            footer_contact_us: "Hubungi Kami",
            footer_jakarta: "Kantor Jakarta",
            footer_medan: "Kantor Medan",
            footer_rights: "© 2026 Garuda Mas Shipping. Hak Cipta Dilindungi.",
            footer_privacy: "Kebijakan Privasi",
            footer_terms: "Syarat & Ketentuan"
        }
    };

    function setLanguage(lang) {
        if (!translations[lang]) return;
        localStorage.setItem('gms_lang', lang);

        if (currentLangLabel) {
            currentLangLabel.textContent = lang.toUpperCase();
        }

        document.querySelectorAll('[data-i18n]').forEach(el => {
            const key = el.getAttribute('data-i18n');
            if (translations[lang][key]) {
                if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
                    el.placeholder = translations[lang][key];
                } else {
                    el.innerHTML = translations[lang][key];
                }
            }
        });

        // Update map location label if nationwide map is present
        const activeMapPill = document.querySelector('.location-pill-btn.active');
        if (activeMapPill) {
            const locKey = activeMapPill.getAttribute('data-location');
            if (locationData[locKey] && mapLocationTitle) {
                mapLocationTitle.textContent = lang === 'id' ? locationData[locKey].title_id : locationData[locKey].title_en;
            }
        }

        // Update active class in dropdown items
        langSwitchButtons.forEach(btn => {
            if (btn.getAttribute('data-lang') === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
    }

    langSwitchButtons.forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            const lang = this.getAttribute('data-lang');
            setLanguage(lang);
        });
    });

    // Check saved language or default to EN
    const savedLang = localStorage.getItem('gms_lang') || 'en';
    setLanguage(savedLang);
});
