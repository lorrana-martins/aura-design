    const projectsData = [
      {
        title: "Residência Acervo",
        location: "Jardins, São Paulo",
        image: "assets/images/projeto-sala-2.png",
        desc: "Uma residência de 480 m² desenhada para valorizar a luz filtrada da tarde e acolher a coleção de arte moderna da família. A transição entre os ambientes sociais ocorre através de pórticos revestidos em lâminas naturais de nogueira americana, contrapondo-se ao piso em mármore travertino navona bruto.",
        materials: "Nogueira americana natural, mármore travertino navona levigado, tecidos em linho cru e mobiliário assinado por Sergio Rodrigues e Jorge Zalszupin."
      },
      {
        title: "Ateliê & Biblioteca",
        location: "Alto de Pinheiros, São Paulo",
        image: "assets/images/projeto-biblioteca.png",
        desc: "Ambiente reservado para contemplação, leitura e pesquisa. A estante foi desenhada com montantes metálicos delgados em banho bronze e prateleiras em freijó maciço, criando ritmo e profundidade sem pesar no visual do ambiente.",
        materials: "Madeira freijó brasileira com acabamento acetinado, perfis de aço escovado com banho bronze antiquado e iluminação perimetral linear difusa."
      },
      {
        title: "Cozinha Monolítica",
        location: "Cidade Jardim, São Paulo",
        image: "assets/images/projeto-cozinha.png",
        desc: "Conceito de cozinha oculta e acolhedora integrada ao espaço social. A grande bancada em ilha funciona como bloco escultural de preparo e degustação, enquanto os eletrodomésticos e áreas de despensa desaparecem por trás de portas camarão mimetizadas.",
        materials: "Granito preto absoluto escovado fosco, marcenaria laqueada em tom fendi escuro e metais com acabamento bronze suave."
      },
      {
        title: "Penthouse Faria Lima",
        location: "Itaim Bibi / Faria Lima, São Paulo",
        image: "assets/images/projeto-sala-2.png",
        desc: "Cobertura duplex contemporânea pensada para um empresário de tecnologia. Linhas limpas e rigor geométrico equilibram o conforto sensorial através de tapetes de tear manual e um sofisticado sistema de iluminação dimerizável que redefine a atmosfera ao entardecer.",
        materials: "Painéis ripados em carvalho ebanizado, pedras naturais brasileiras, couro conhaque e obras de arte geométrica."
      },
      {
        title: "Suíte Master Bruma",
        location: "Morumbi, São Paulo",
        image: "assets/images/projeto-quarto.png",
        desc: "Dormitório projetado como um santuário de descanso absoluto. A cabeceira estofada contínua abraça a parede principal com linho belga natural, apoiada por mesinhas de cabeceira em balanço e arandelas de leitura em latão fosco.",
        materials: "Linho belga texturizado, assoalho de madeira maciça cumaru, tapeçaria de lã orgânica e controle automatizado de persianas e iluminação."
      },
      {
        title: "Sala de Banho Nero",
        location: "Itaim Bibi, São Paulo",
        image: "assets/images/projeto-banheiro.png",
        desc: "Banheiro master inspirado nas salas termais de hotéis boutique europeus. Cuba esculpida em bloco maciço de mármore e chuveiro de teto com cromoterapia suave proporcionam uma experiência diária de spa particular.",
        materials: "Mármore nero marquina com veios dourados pontuais, metais escovados em tom champanhe fosco e vidro canelado fumê."
      },
      {
        title: "Galeria Terracota",
        location: "Vila Nova Conceição, São Paulo",
        image: "assets/images/projeto-terracota.png",
        desc: "Hall e living de entrada com volumetria inspirada em elementos cerâmicos ancestrais. Paredes com textura mineral exclusiva acolhem esculturas contemporâneas sob feixes de luz direcionados com precisão milimétrica.",
        materials: "Argamassa mineral artesanal em tom terracota desidratado, pedra sabão esculpida e iluminação pontual de galeria."
      }
    ];

    // Scroll Navbar Effect
    const header = document.getElementById('mainHeader');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }, { passive: true });

    // Drawer Mobile
    const openMenuBtn = document.getElementById('openMobileMenu');
    const closeMenuBtn = document.getElementById('closeMobileMenu');
    const drawer = document.getElementById('mobileDrawer');
    const overlay = document.getElementById('drawerOverlay');

    function openDrawer() {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    }

    function closeDrawer() {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    openMenuBtn.addEventListener('click', openDrawer);
    closeMenuBtn.addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);
    drawer.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Controle da trilha sonora do Hero
    const ambientAudio = document.getElementById('ambientAudio');
    const audioBtn = document.getElementById('audioToggleBtn');
    const volumeText = document.getElementById('volumeText');
    const mutedIcon = document.getElementById('mutedIcon');
    const playingIcon = document.getElementById('playingIcon');

    audioBtn.addEventListener('click', async () => {
      if (ambientAudio.paused) {
        try {
          await ambientAudio.play();
          volumeText.textContent = "Trilha sonora ligada";
          audioBtn.setAttribute('aria-label', 'Desativar trilha sonora');
          audioBtn.setAttribute('aria-pressed', 'true');
          audioBtn.style.color = "var(--gold-primary)";
          mutedIcon.style.display = 'none';
          playingIcon.style.display = '';
        } catch (error) {
          volumeText.textContent = "Não foi possível reproduzir a trilha";
        }
      } else {
        ambientAudio.pause();
        volumeText.textContent = "Trilha sonora desligada";
        audioBtn.setAttribute('aria-label', 'Ativar trilha sonora');
        audioBtn.setAttribute('aria-pressed', 'false');
        audioBtn.style.color = "";
        mutedIcon.style.display = '';
        playingIcon.style.display = 'none';
      }
    });

    // ==========================================================================
    // GSAP SCROLLTRIGGER - BUILD SEQUENCE CONTROLLER
    // ==========================================================================
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

    function initBuildSequence() {
      const video = document.getElementById('sequenceVideo');
      const section = document.getElementById('processo');
      if (!video || !section) return;

      // Garantir que o vídeo esteja pausado e mudo para permitir scrubbing puro via scroll
      video.pause();
      video.muted = true;

      // Usar matchMedia para tratar responsividade e acessibilidade (prefers-reduced-motion)
      const mm = gsap.matchMedia();

      mm.add({
        isDesktop: "(min-width: 1025px)",
        isMobile: "(max-width: 1024px)",
        reduceMotion: "(prefers-reduced-motion: reduce)",
        allowMotion: "(prefers-reduced-motion: no-preference)"
      }, (context) => {
        const { reduceMotion, isDesktop, isMobile } = context.conditions;

        if (reduceMotion) {
          // Acessibilidade: sem pinning ou scroll-hijack
          gsap.set(["#seqBlock1", "#seqBlock2", "#seqBlock3"], {
            autoAlpha: 1,
            y: 0,
            x: 0,
            position: "static",
            marginBottom: "2rem"
          });
          return;
        }

        // Timeline mestre pinada na seção "process-section" (id="processo")
        const buildTimeline = gsap.timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: isMobile ? "+=1800" : "+=2800",
            pin: true,
            scrub: isMobile ? 0.6 : 1.2,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });

        // Proxy para avanço dos frames do vídeo sincronizado com a rolagem
        const videoProxy = { time: 0 };
        const duration = (video.duration && !isNaN(video.duration) && video.duration > 0.5) ? video.duration : 8;

        // O avanço do vídeo percorre a timeline inteira (duração normalizada de 10s)
        buildTimeline.to(videoProxy, {
          time: duration - 0.05,
          ease: "none",
          duration: 10,
          onUpdate: () => {
            if (video.readyState >= 1) {
              video.currentTime = videoProxy.time;
            }
          }
        }, 0);

        // Configuração inicial dos 3 blocos
        const xDist = isDesktop ? 50 : 0;
        const yDist = isDesktop ? 0 : 25;

        gsap.set(["#seqBlock1", "#seqBlock2", "#seqBlock3"], {
          autoAlpha: 0,
          yPercent: isDesktop ? -50 : 0
        });

        gsap.set("#seqBlock1", {
          x: -xDist,
          y: isDesktop ? 0 : yDist
        });
        gsap.set("#seqBlock2", {
          x: xDist,
          y: isDesktop ? 0 : yDist
        });
        gsap.set("#seqBlock3", {
          x: -xDist,
          y: isDesktop ? 0 : yDist
        });

        // BLOCO 1 (INÍCIO - ESQUERDA)
        // Aparece suavemente no início (0.4s a 1.3s), permanece até 2.4s e desaparece até 3.2s
        buildTimeline.to("#seqBlock1", {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power2.out"
        }, 0.4)
        .to("#seqBlock1", {
          autoAlpha: 0,
          x: -xDist * 0.6,
          duration: 0.8,
          ease: "power2.in"
        }, 2.4);

        // BLOCO 2 (MEIO - DIREITA)
        // Aparece suavemente no meio (3.6s a 4.5s), permanece até 5.8s e desaparece até 6.6s
        buildTimeline.to("#seqBlock2", {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power2.out"
        }, 3.6)
        .to("#seqBlock2", {
          autoAlpha: 0,
          x: xDist * 0.6,
          duration: 0.8,
          ease: "power2.in"
        }, 5.8);

        // BLOCO 3 (FIM - ESQUERDA)
        // Aparece suavemente no fim (7.0s a 7.9s), permanece até 9.1s e conclui até 9.8s
        buildTimeline.to("#seqBlock3", {
          autoAlpha: 1,
          x: 0,
          y: 0,
          duration: 0.9,
          ease: "power2.out"
        }, 7.0)
        .to("#seqBlock3", {
          autoAlpha: 0,
          x: -xDist * 0.6,
          duration: 0.8,
          ease: "power2.in"
        }, 9.1);

        // Atualizar ScrollTrigger quando o vídeo carregar os metadados
        if (video.readyState < 1) {
          video.addEventListener('loadedmetadata', () => {
            ScrollTrigger.refresh();
          }, { once: true });
        }
      });
    }

    // Inicializar quando o DOM estiver pronto
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', initBuildSequence);
    } else {
      initBuildSequence();
    }
    }

    // Filtro do Portfólio
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const category = card.getAttribute('data-category');
          if (filterValue === 'all' || category === filterValue) {
            card.style.display = '';
            setTimeout(() => {
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.opacity = '0';
            card.style.transform = 'translateY(10px)';
            setTimeout(() => {
              card.style.display = 'none';
            }, 300);
          }
        });
      });
    });

    // Lightbox Modal de Detalhes do Projeto
    const projectModal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalProjectImg');
    const modalTitle = document.getElementById('modalProjectTitle');
    const modalLoc = document.getElementById('modalProjectLoc');
    const modalDesc = document.getElementById('modalProjectDesc');
    const modalMaterials = document.getElementById('modalProjectMaterials');

    function openProjectModal(index) {
      const data = projectsData[index];
      if (!data) return;

      modalImg.src = data.image;
      modalImg.alt = data.title;
      modalTitle.textContent = data.title;
      modalLoc.textContent = data.location;
      modalDesc.textContent = data.desc;
      modalMaterials.textContent = data.materials;

      projectModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }

    function closeProjectModal() {
      projectModal.classList.remove('active');
      document.body.style.overflow = '';
    }

    projectCards.forEach((card, index) => {
      card.addEventListener('click', () => openProjectModal(index));
    });

    projectModal.querySelector('.modal-close-btn').addEventListener('click', closeProjectModal);
    projectModal.querySelector('.modal-content .btn-gold').addEventListener('click', closeProjectModal);

    // Fechar modal ao clicar fora ou com tecla Escape
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) {
        closeProjectModal();
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && projectModal.classList.contains('active')) {
        closeProjectModal();
      }
    });

    // Envio Elegante do Formulário de Contato
    function handleFormSubmit(event) {
      event.preventDefault();

      const form = document.getElementById('contactForm');
      const submitBtn = form.querySelector('button[type="submit"]');
      const feedback = document.getElementById('formFeedback');

      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = "Processando Solicitação...";
      submitBtn.disabled = true;

      // Simulação de envio com feedback sofisticado
      setTimeout(() => {
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        feedback.classList.add('success');
        form.reset();

        setTimeout(() => {
          feedback.classList.remove('success');
        }, 8000);
      }, 1200);
    }

    document.getElementById('contactForm').addEventListener('submit', handleFormSubmit);
  