document.addEventListener('DOMContentLoaded', async () => {
    try {
        // 1. JSON 데이터 가져오기
        // fetch 경로는 index.html과 같은 위치에 있는 projects.json을 참조합니다.
        const response = await fetch('projects.json');
        if (!response.ok) throw new Error('데이터 로드 실패');
        const data = await response.json();
        
        // 데이터가 존재할 때만 각 섹션 렌더링 실행
        if (data) {
            renderHero(data.settings);
            renderAbout(data.about);
            renderWorks(data.projects);
            setupNav();
        }
    } catch (e) {
        console.error("데이터를 불러오는 중 오류가 발생했습니다:", e);
    }

    // 이메일 복사 기능
    const copyBtn = document.getElementById('copy-email-btn');
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            const emailElement = document.getElementById('display-email');
            if (!emailElement) return;
            
            const email = emailElement.textContent;
            navigator.clipboard.writeText(email);
            const originalText = email;
            emailElement.textContent = "COPIED!";
            setTimeout(() => {
                emailElement.textContent = originalText;
            }, 1500);
        });
    }
});

/**
 * 히어로 섹션 렌더링
 */
function renderHero(settings) {
    if (!settings) return;
    const heroSub = document.getElementById('hero-sub');
    if (heroSub) heroSub.textContent = settings.subTitle;
    
    // 타이틀 애니메이션이나 변경이 필요할 경우 사용
    const heroTitle = document.getElementById('hero-title');
    if (heroTitle && settings.mainTitle) {
        // heroTitle.textContent = settings.mainTitle; 
    }
}

/**
 * 자기소개 및 경력 사항 렌더링
 */
function renderAbout(about) {
    if (!about) return;
    
    const intro = document.getElementById('about-intro');
    if (intro) intro.textContent = about.intro;

    const container = document.getElementById('experience-container');
    if (container && about.experiences) {
        container.innerHTML = ''; // 초기화
        about.experiences.forEach(exp => {
            const item = document.createElement('div');
            item.className = "group border-l border-white/10 pl-6 py-2 hover:border-blue-500 transition-colors cursor-default";
            item.innerHTML = `
                <span class="text-[10px] font-mono text-gray-500 uppercase tracking-tighter">${exp.period}</span>
                <h4 class="text-lg font-bold text-white/90 group-hover:text-white transition-colors">${exp.title}</h4>
                <p class="text-sm text-gray-500 leading-relaxed">${exp.desc}</p>
            `;
            container.appendChild(item);
        });
    }
}

/**
 * 프로젝트 목록 렌더링 (클릭 시 상세 페이지 이동)
 */
function renderWorks(projects) {
    if (!projects) return;
    
    // HTML에 정의된 컨테이너 ID 확인 (둘 중 하나라도 있으면 작동)
    const container = document.getElementById('project-container') || document.getElementById('project-grid');
    if (!container) {
        console.warn("프로젝트를 표시할 컨테이너(#project-container)를 찾을 수 없습니다.");
        return;
    }
    
    container.innerHTML = '';
    
    projects.forEach(project => {
        const card = document.createElement('div');
        // 카드 스타일링 및 텐션 효과를 위한 클래스
        card.className = "work-card group relative overflow-hidden bg-[#111] border border-white/5 transition-all duration-500 hover:-translate-y-2";
        
        // 클릭 시 이동할 URL (JSON에 정의된 url 우선, 없으면 기본 경로 사용)
        const targetUrl = project.url || `work/${project.id}.html`;
        
        card.style.cursor = 'pointer';
        card.onclick = () => {
            window.location.href = targetUrl;
        };

        card.innerHTML = `
            <div class="img-box aspect-[4/5] overflow-hidden grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700">
                <img src="${project.image}" alt="${project.title}" class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                     onerror="this.src='https://placehold.co/600x800/111/333?text=Project+Image'">
            </div>
            <div class="info-box absolute bottom-0 left-0 w-full p-8 bg-gradient-to-t from-black/90 via-black/40 to-transparent">
                <span class="text-[10px] text-blue-500 uppercase tracking-[0.2em] mb-2 block font-semibold">${project.category || 'Architecture'}</span>
                <h4 class="text-2xl font-bold italic text-white mb-3 group-hover:text-blue-400 transition-colors">${project.title}</h4>
                <div class="flex flex-wrap gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    ${project.tags ? project.tags.map(t => `<span class="text-[9px] uppercase tracking-tighter text-gray-400 bg-white/5 px-2 py-0.5 rounded border border-white/10">#${t}</span>`).join('') : ''}
                </div>
            </div>
            <!-- 상세 보기 화살표 아이콘 -->
            <div class="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg>
            </div>
        `;
        container.appendChild(card);
    });
}

/**
 * 스냅 스크롤 위치에 따라 네비게이션 메뉴 활성화
 */
function setupNav() {
    const container = document.getElementById('fullpage-container');
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!container) return;

    container.addEventListener('scroll', () => {
        let current = "";
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            // 섹션이 화면의 절반 이상을 차지할 때 현재 섹션으로 인지
            if (container.scrollTop >= sectionTop - window.innerHeight / 2) {
                current = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            const href = link.getAttribute("href");
            if (href === `#${current}`) {
                link.classList.add("active");
            }
        });
    });
}