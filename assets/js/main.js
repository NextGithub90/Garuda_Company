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
            nav_about: "About Us",
            nav_services: "Services",
            nav_contact: "Contact Us",
            nav_search: "SEARCH",
            nav_login: "LOGIN",

            // Hero
            hero_badge_1: "Leading Maritime Excellence",
            hero_title_1: "Global Shipping & Logistics",
            hero_desc_1: "Connecting global markets through reliable, efficient, and seamless maritime logistics.",
            hero_badge_2: "World-Class Port Infrastructure",
            hero_title_2: "Advanced Port & Terminal Solutions",
            hero_desc_2: "Driving efficient cargo handling and optimized turnaround across key global gateways.",
            hero_badge_3: "Integrated Supply Chain",
            hero_title_3: "End-to-End Multimodal Transport",
            hero_desc_3: "Connecting every stage of your logistics journey with efficiency and precision.",
            hero_btn_services: "Our Services",
            hero_btn_contact: "Contact Us",

            // Home - About Us Teaser
            about_tag: "About Us",
            about_title: "Connecting The World Through Maritime Excellence",
            about_desc: "Established in Jakarta in 2025, PT. Garuda Mas Shipping delivers integrated maritime and logistics solutions designed to meet the evolving demands of global trade. With a focus on reliability, efficiency, and innovation, we connect businesses to opportunities worldwide.",
            about_vessels: "Vessels",
            about_ports: "Ports",
            about_employees: "Employees",
            about_btn_more: "Read More",

            // Values
            values_tag: "Core Principles",
            values_title: "Our Values",
            values_desc: "Our principles define our culture and guide our pursuit of operational excellence, integrity, and trusted maritime services.",
            vision_title: "Our Vision",
            vision_desc: "To be a trusted global logistics partner, connecting businesses and moving possibilities across borders.",
            mission_title: "Our Mission",
            mission_desc: "To deliver reliable logistics solutions through excellence, innovation, and trusted partnerships.",
            hsse_title: "HSSE Excellence",
            hsse_desc: "Prioritizing Health, Safety, Security, and Environment in every operation to protect our people, assets, and the planet.",

            // Services
            services_tag: "Our Core Expertise",
            services_title: "Services",
            services_desc: "Our integrated approach brings together specialized services to deliver end to end solutions across the maritime logistics spectrum.",
            
            service_1_eyebrow: "01. Global Reach",
            service_1_title: "Sea Freight",
            service_1_desc: "Through established carrier partnerships, we provide reliable and cost efficient sea freight solutions, optimized for transit time, capacity, and secure delivery.",
            service_1_f1: "FCL & LCL Shipments",
            service_1_f2: "Route Optimization",
            service_1_f3: "Global Carrier Network",
            service_1_f4: "Cost Effective",

            service_2_eyebrow: "02. Smooth Processing",
            service_2_title: "Customs Clearance",
            service_2_desc: "Professional customs clearance services for import and export.",
            service_2_f1: "Import & Export Clearance",
            service_2_f2: "Certificates Handling",
            service_2_f3: "Document Processing",
            service_2_f4: "Compliance Consultation",

            service_3_eyebrow: "03. End-To-End",
            service_3_title: "Project Logistic",
            service_3_desc: "End to end logistics solutions to ensure project cargo is delivered safely, efficiently, and in the right sequence.",
            service_3_f1: "Heavy Lift Operations",
            service_3_f2: "Sequence Planning",
            service_3_f3: "Site Management",
            service_3_f4: "Dedicated Supervision",

            service_4_eyebrow: "04. Secure Storage",
            service_4_title: "Warehousing",
            service_4_desc: "Flexible warehousing solutions for secure storage, efficient handling, and container loading.",
            service_4_f1: "Secure Storage Facilities",
            service_4_f2: "Container Stuffing",
            service_4_f3: "Loading & Unloading",
            service_4_f4: "Inventory Management",

            service_5_eyebrow: "05. Reliable Mobility",
            service_5_title: "Land Transportation",
            service_5_desc: "Reliable land transportation solutions, ensuring safe, efficient, and timely delivery.",
            service_5_f1: "Container Truck Fleet",
            service_5_f2: "GPS Fleet Tracking",
            service_5_f3: "Heavy Cargo Hauling",
            service_5_f4: "On-Time Delivery",

            // Connected Nationwide Section
            nationwide_tag: "HEAD OFFICE & BRANCH NETWORK",
            nationwide_title: "Connected Nationwide",
            nationwide_desc: "Garuda Mas Shipping connects your business to global markets through reliable international freight forwarding solutions and an extensive worldwide network.",
            btn_open_maps: "Open in Google Maps",

            // About Page specifics
            about_page_title: "About Us",
            story_tag: "Our Story",
            story_title: "A Legacy of Maritime Excellence",
            story_p1: "Established in 2025 in Jakarta, Indonesia, PT. Garuda Mas Shipping is a maritime and logistics company built on expertise, integrity, and a commitment to excellence.",
            story_p2: "Led by seasoned maritime and logistics professionals, we deliver proven expertise in shipping agency and freight forwarding services, with a strong focus on reliability, precision, and long-term partnerships.",
            story_p3: "We deliver precise, dependable, and efficient shipping solutions, combining deep industry knowledge with a professional and responsive approach. Our commitment is clear: to deliver with confidence, uphold the highest standards, and build lasting partnerships.",
            founder_quote: "\"Building trust through precision, integrity, and excellence to deliver strategic logistics solutions for global business growth.\"",
            founder_role: "Management of PT. Garuda Mas Shipping",

            reach_tag: "Our Reach",
            reach_title: "Global Network, Local Expertise",
            reach_desc: "Our global network connects key shipping routes and markets, supported by strong local expertise and trusted industry relationships. We provide seamless coordination, reliable execution, and consistent service across borders.",
            btn_partner: "Partner With Us",

            // Services Page specifics
            services_page_title: "Our Services",
            services_overview_tag: "Comprehensive Solutions",
            services_overview_title: "Driving Global Trade Forward",
            services_overview_desc: "Garuda Mas Shipping delivers integrated maritime and logistics solutions, combining precision, efficiency, and reliability to support seamless global supply chains.",
            
            why_choose_tag: "The Garuda Mas Advantage",
            why_choose_title: "Why Choose Our Services",
            benefit_1_title: "Global Network",
            benefit_1_desc: "Strategic partnerships across major international ports, reliable, and efficient cross-border logistics.",
            benefit_2_title: "24/7 Operations",
            benefit_2_desc: "Round-the-clock monitoring and dedicated support to ensure seamless operations, timely response, and uninterrupted cargo movement.",
            benefit_3_title: "Secure & Safe",
            benefit_3_desc: "Maintaining the highest standards of maritime safety and cargo protection to ensure secure, compliant, and reliable operations.",
            benefit_4_title: "Cost Efficient",
            benefit_4_desc: "Strategic routing and integrated supply chain management designed to enhance efficiency and optimize overall logistics costs.",

            cta_title: "Ready to Elevate Your Logistics?",
            cta_desc: "Partner with Garuda Mas Shipping and experience a higher standard of maritime excellence.",
            btn_quote: "Get a Quote",

            // Contact Page specifics
            contact_page_title: "Contact Us",
            contact_hero_subtitle: "Contact our team to discuss your logistics and supply chain needs.",
            contact_tag: "Send Message",
            contact_heading: "Tell us your needs, and we will support your business",
            contact_subheading: "Have questions, need further information, or looking for the right logistics solutions? Fill out this form and our team will get in touch with you shortly.",
            contact_lbl_name: "Full Name <span class=\"text-danger\">*</span>",
            contact_ph_name: "John Doe",
            contact_lbl_email: "Email <span class=\"text-danger\">*</span>",
            contact_ph_email: "name@company.com",
            contact_lbl_phone: "Phone Number <span class=\"text-danger\">*</span>",
            contact_ph_phone: "812 3456 7890",
            contact_lbl_company: "Company <span class=\"text-danger\">*</span>",
            contact_ph_company: "PT Global Maritime",
            contact_lbl_position: "Position <span class=\"text-danger\">*</span>",
            contact_ph_position: "Supply Chain Manager",
            contact_lbl_service: "Services of Interest <span class=\"text-danger\">*</span>",
            contact_opt_select: "Select...",
            contact_opt_integrated: "Integrated Supply Chain Solution",
            contact_lbl_source: "How did you hear about Garuda Mas Shipping?",
            contact_src_search: "Website / Search Engine",
            contact_src_social: "Social Media (LinkedIn, Instagram)",
            contact_src_ref: "Business Partner / Referral",
            contact_src_event: "Logistics Expo / Conference",
            contact_src_other: "Other",
            contact_lbl_message: "Inquiry / Message <span class=\"text-danger\">*</span>",
            contact_ph_message: "Write your message or inquiry here...",
            contact_btn_submit: "Submit Message",
            contact_alert_success_title: "Message Sent Successfully!",
            contact_alert_success: "Thank you! Your message has been sent. Our team will contact you shortly.",

            // Footer
            footer_about: "Connecting the world through reliable maritime logistics. Your trusted partner for global supply chain solutions.",
            footer_quick_links: "Quick Links",
            footer_contact_us: "Contact Us",
            footer_jakarta: "Jakarta Office",
            footer_medan: "Medan Office",
            footer_rights: "© 2025 Garuda Mas Shipping. All Rights Reserved.",
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
            hero_title_1: "Pengiriman Global & Logistik",
            hero_desc_1: "Menghubungkan pasar global melalui logistik maritim yang andal, efisien, dan terintegrasi mulus.",
            hero_badge_2: "Infrastruktur Pelabuhan Berkelas Dunia",
            hero_title_2: "Solusi Terminal & Pelabuhan Canggih",
            hero_desc_2: "Mendorong penanganan kargo yang efisien dan perputaran optimal di gerbang logistik utama dunia.",
            hero_badge_3: "Rantai Pasok Terintegrasi",
            hero_title_3: "Transportasi Multimoda Ujung-ke-Ujung",
            hero_desc_3: "Menghubungkan setiap tahapan perjalanan logistik Anda dengan efisiensi dan presisi.",
            hero_btn_services: "Layanan Kami",
            hero_btn_contact: "Hubungi Kami",

            // Home - About Us Teaser
            about_tag: "Tentang Kami",
            about_title: "Menghubungkan Dunia Melalui Keunggulan Maritim",
            about_desc: "Didirikan di Jakarta pada tahun 2025, PT. Garuda Mas Shipping menghadirkan solusi maritim dan logistik terintegrasi yang dirancang untuk memenuhi tuntutan perdagangan global yang terus berkembang. Berfokus pada keandalan, efisiensi, dan inovasi, kami menghubungkan bisnis ke berbagai peluang di seluruh dunia.",
            about_vessels: "Kapal",
            about_ports: "Pelabuhan",
            about_employees: "Karyawan",
            about_btn_more: "Selengkapnya",

            // Values
            values_tag: "Prinsip Utama",
            values_title: "Nilai-Nilai Kami",
            values_desc: "Prinsip-prinsip kami membentuk budaya kerja dan memandu komitmen kami dalam mencapai keunggulan operasional, integritas, serta layanan maritim terpercaya.",
            vision_title: "Visi Kami",
            vision_desc: "Menjadi mitra logistik global terpercaya, menghubungkan bisnis dan membuka berbagai peluang tanpa batas.",
            mission_title: "Misi Kami",
            mission_desc: "Menghadirkan solusi logistik yang andal melalui keunggulan, inovasi, dan kemitraan terpercaya.",
            hsse_title: "Keunggulan HSSE",
            hsse_desc: "Memprioritaskan Kesehatan, Keselamatan, Keamanan, dan Lingkungan dalam setiap operasi untuk melindungi insan dan bumi kita.",

            // Services
            services_tag: "Keahlian Utama Kami",
            services_title: "Layanan",
            services_desc: "Pendekatan terintegrasi kami memadukan layanan khusus untuk menghadirkan solusi menyeluruh di seluruh spektrum logistik maritim.",
            
            service_1_eyebrow: "01. Jangkauan Global",
            service_1_title: "Sea Freight",
            service_1_desc: "Melalui kemitraan operator pelayaran terpercaya, kami menyediakan solusi angkutan laut yang andal dan hemat biaya, dioptimalkan untuk waktu transit, kapasitas, dan pengiriman yang aman.",
            service_1_f1: "Pengiriman FCL & LCL",
            service_1_f2: "Optimasi Rute Pelayaran",
            service_1_f3: "Jaringan Operator Global",
            service_1_f4: "Hemat Biaya",

            service_2_eyebrow: "02. Pemrosesan Lancar",
            service_2_title: "Customs Clearance",
            service_2_desc: "Layanan kepabeanan profesional untuk izin impor dan ekspor.",
            service_2_f1: "Izin Impor & Ekspor",
            service_2_f2: "Penanganan Sertifikat",
            service_2_f3: "Pemrosesan Dokumen",
            service_2_f4: "Konsultasi Kepatuhan",

            service_3_eyebrow: "03. Ujung-ke-Ujung",
            service_3_title: "Project Logistic",
            service_3_desc: "Solusi logistik ujung-ke-ujung untuk memastikan kargo proyek dikirim dengan aman, efisien, dan dalam urutan yang tepat.",
            service_3_f1: "Operasi Muatan Berat",
            service_3_f2: "Perencanaan Sekuensial",
            service_3_f3: "Manajemen Lokasi",
            service_3_f4: "Supervisi Khusus",

            service_4_eyebrow: "04. Penyimpanan Aman",
            service_4_title: "Warehousing",
            service_4_desc: "Solusi pergudangan fleksibel untuk penyimpanan yang aman, penanganan efisien, dan pemuatan kontainer.",
            service_4_f1: "Fasilitas Gudang Aman",
            service_4_f2: "Stuffing Kontainer",
            service_4_f3: "Muat & Bongkar Barang",
            service_4_f4: "Manajemen Inventaris",

            service_5_eyebrow: "05. Mobilitas Terpercaya",
            service_5_title: "Land Transportation",
            service_5_desc: "Solusi transportasi darat yang andal, memastikan pengiriman yang aman, efisien, dan tepat waktu.",
            service_5_f1: "Armada Truk Kontainer",
            service_5_f2: "Pelacakan GPS Armada",
            service_5_f3: "Pengangkutan Kargo Berat",
            service_5_f4: "Pengiriman Tepat Waktu",

            // Connected Nationwide Section
            nationwide_tag: "Jaringan Kantor Pusat & Cabang",
            nationwide_title: "Terhubung Secara Nasional",
            nationwide_desc: "Garuda Mas Shipping menghubungkan bisnis Anda ke pasar global melalui solusi freight forwarding internasional yang andal dan jaringan luas di seluruh dunia.",
            btn_open_maps: "Buka di Google Maps",

            // About Page specifics
            about_page_title: "Tentang Kami",
            story_tag: "Kisah Kami",
            story_title: "Warisan Keunggulan Maritim",
            story_p1: "Didirikan pada tahun 2025 di Jakarta, Indonesia, PT. Garuda Mas Shipping adalah perusahaan maritim dan logistik yang dibangun atas dasar keahlian, integritas, dan komitmen terhadap keunggulan.",
            story_p2: "Dipimpin oleh para profesional maritim dan logistik berpengalaman, kami menghadirkan keahlian teruji dalam layanan keagenan kapal dan freight forwarding, dengan fokus kuat pada keandalan, presisi, dan kemitraan jangka panjang.",
            story_p3: "Kami menghadirkan solusi pengiriman yang presisi, andal, dan efisien, memadukan pengetahuan industri yang mendalam dengan pendekatan profesional dan responsif. Komitmen kami jelas: memberikan layanan dengan penuh percaya diri, menjunjung standar tertinggi, dan membangun kemitraan yang berkelanjutan.",
            founder_quote: "\"Membangun kepercayaan melalui presisi, integritas, dan keunggulan untuk menghadirkan solusi logistik strategis bagi pertumbuhan bisnis global.\"",
            founder_role: "Manajemen PT. Garuda Mas Shipping",

            reach_tag: "Jangkauan Kami",
            reach_title: "Jaringan Global, Keahlian Lokal",
            reach_desc: "Jaringan global kami menghubungkan rute pelayaran dan pasar utama, didukung oleh keahlian lokal yang kuat dan hubungan industri yang terpercaya. Kami menghadirkan koordinasi yang lancar, eksekusi andal, serta layanan konsisten lintas batas.",
            btn_partner: "Bermitra Dengan Kami",

            // Services Page specifics
            services_page_title: "Layanan Kami",
            services_overview_tag: "Solusi Menyeluruh",
            services_overview_title: "Mendorong Perdagangan Global Maju",
            services_overview_desc: "Garuda Mas Shipping menghadirkan solusi maritim dan logistik terintegrasi, memadukan presisi, efisiensi, dan keandalan untuk mendukung kelancaran rantai pasok global.",
            
            why_choose_tag: "Keunggulan Garuda Mas",
            why_choose_title: "Mengapa Memilih Layanan Kami",
            benefit_1_title: "Jaringan Global",
            benefit_1_desc: "Kemitraan strategis di pelabuhan internasional utama, menghadirkan logistik lintas batas yang andal dan efisien.",
            benefit_2_title: "Operasional 24/7",
            benefit_2_desc: "Pemantauan sepanjang waktu dan dukungan berdedikasi untuk memastikan kelancaran operasional, respons tepat waktu, dan pergerakan kargo tanpa henti.",
            benefit_3_title: "Aman & Terlindungi",
            benefit_3_desc: "Menjaga standar tertinggi keselamatan maritim dan perlindungan kargo untuk memastikan operasional yang aman, patuh regulasi, dan andal.",
            benefit_4_title: "Efisien & Hemat",
            benefit_4_desc: "Perutean strategis dan manajemen rantai pasok terintegrasi yang dirancang untuk meningkatkan efisiensi serta mengoptimalkan total biaya logistik.",

            cta_title: "Siap Meningkatkan Kualitas Logistik Anda?",
            cta_desc: "Bermitra dengan Garuda Mas Shipping dan rasakan standar keunggulan maritim yang lebih tinggi.",
            btn_quote: "Dapatkan Penawaran",

            // Contact Page specifics
            contact_page_title: "Hubungi Kami",
            contact_hero_subtitle: "Hubungi tim kami untuk mendiskusikan kebutuhan logistik dan rantai pasok Anda.",
            contact_tag: "Kirim Pesan",
            contact_heading: "Sampaikan kebutuhan Anda, dan kami dapat mendukung bisnis Anda",
            contact_subheading: "Punya pertanyaan, membutuhkan informasi lebih lanjut, atau sedang mencari solusi logistik yang tepat? Isi formulir ini dan tim kami akan segera menghubungi Anda.",
            contact_lbl_name: "Nama Lengkap <span class=\"text-danger\">*</span>",
            contact_ph_name: "Budi Santoso",
            contact_lbl_email: "Email <span class=\"text-danger\">*</span>",
            contact_ph_email: "email@bisnis.com",
            contact_lbl_phone: "Nomor Telepon <span class=\"text-danger\">*</span>",
            contact_ph_phone: "812 3456 7890",
            contact_lbl_company: "Perusahaan <span class=\"text-danger\">*</span>",
            contact_ph_company: "PT Jaya Berkah",
            contact_lbl_position: "Posisi <span class=\"text-danger\">*</span>",
            contact_ph_position: "Manajer Logistik / Pemasaran",
            contact_lbl_service: "Bisnis yang Diminati <span class=\"text-danger\">*</span>",
            contact_opt_select: "Pilih...",
            contact_opt_integrated: "Solusi Rantai Pasok Terintegrasi",
            contact_lbl_source: "Dari mana Anda mengetahui Garuda Mas Shipping?",
            contact_src_search: "Situs Web / Mesin Pencari",
            contact_src_social: "Media Sosial (LinkedIn, Instagram)",
            contact_src_ref: "Mitra Bisnis / Rekomendasi",
            contact_src_event: "Pameran / Konferensi Logistik",
            contact_src_other: "Lainnya",
            contact_lbl_message: "Pertanyaan <span class=\"text-danger\">*</span>",
            contact_ph_message: "Tulis pesan atau pertanyaan Anda di sini...",
            contact_btn_submit: "Kirim",
            contact_alert_success_title: "Pesan Berhasil Terkirim!",
            contact_alert_success: "Terima kasih! Pesan Anda telah berhasil dikirim. Tim kami akan segera menghubungi Anda.",

            // Footer
            footer_about: "Menghubungkan dunia melalui logistik maritim yang andal. Mitra terpercaya Anda untuk solusi rantai pasok global.",
            footer_quick_links: "Tautan Cepat",
            footer_contact_us: "Hubungi Kami",
            footer_jakarta: "Kantor Jakarta",
            footer_medan: "Kantor Medan",
            footer_rights: "© 2025 Garuda Mas Shipping. Hak Cipta Dilindungi.",
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
