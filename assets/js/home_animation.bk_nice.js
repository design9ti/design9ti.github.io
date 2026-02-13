document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger, Observer, ScrollSmoother);
  animationFirst()
  animationSecond()
  setupSliderButtons()
  setupScrollDetection()
})

let isUserScrolling = false;

function setupScrollDetection() {
  let scrollTimeout;
  
  window.addEventListener('scroll', function() {
    isUserScrolling = true;
    clearTimeout(scrollTimeout);
    
    scrollTimeout = setTimeout(function() {
      isUserScrolling = false;
    }, 150); // Stop detecting scroll after 150ms of inactivity
  }, false);
}

function setupSliderButtons() {
  const dots = document.querySelectorAll('#banner-1-dots .dot');
  const banner = document.getElementById('banner-1');

  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const step = parseInt(this.getAttribute('data-step'));
      
      // Calculate scroll position based on step and new end: "+=650%"
      const bannerTop = banner.offsetTop;
      const viewportHeight = window.innerHeight;
      const totalScrollHeight = viewportHeight * 6.5; // 650% of viewport
      
      let scrollPosition;
      let targetProgress;
      
      if (step === 1) {
        // Dot 1: Go to top and reset (progress < 5%)
        scrollPosition = 0;
      } else if (step === 2) {
        // Dot 2: Play step 1 (Progress 6-25%, target middle at ~15%)
        targetProgress = 0.15;
      } else if (step === 3) {
        // Dot 3: Play step 2 (Progress 26-50%, target middle at ~38%)
        targetProgress = 0.38;
      } else if (step === 4) {
        // Dot 4: Play step 3 (Progress 51-75%, target middle at ~63%)
        targetProgress = 0.63;
      }
      
      if (targetProgress !== undefined) {
        scrollPosition = bannerTop + (totalScrollHeight * targetProgress);
      }

      // Update active dot
      dots.forEach(d => d.classList.remove('active'));
      this.classList.add('active');

      // Animate scroll to position
      window.scrollTo({
        top: scrollPosition,
        behavior: 'smooth'
      });
    });
  });
}

function animationFirst() {
  const dots = document.querySelectorAll('#banner-1-dots .dot');
  let currentStep = 0;
  let lastImageStep = 0; // Track which image position we're at
  
  // Initial setup
  gsap.set("#banner-1-img", { xPercent: -50, yPercent: -50, scale: 1, x: 0, y: 0 });
  gsap.set("#card-1-1, #card-1-2, #card-1-3", { autoAlpha: 0 });
  
  // Update active dot
  function updateDots(step) {
    dots.forEach((dot, index) => {
      dot.classList.toggle('active', index === step);
    });
  }
  
  // Move image only (no card)
  function moveImageToStep1() {
    if (lastImageStep === 1) return;
    lastImageStep = 1;
    updateDots(1);
    
    // Hide other cards and remove bounce class
    document.getElementById('card-1-2').classList.remove('bounce');
    document.getElementById('card-1-3').classList.remove('bounce');
    gsap.set("#card-1-2, #card-1-3", { autoAlpha: 0 });
    
    gsap.to("#banner-1-img", {
      scale: 1.4,
      x: '35%',
      y: '38%',
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Show card with bounce after image move completes
        document.getElementById('card-1-1').classList.add('bounce');
        gsap.to("#card-1-1", { autoAlpha: 1, duration: 0.1, ease: "power2.in" });
      }
    });
  }
  
  function moveImageToStep2() {
    if (lastImageStep === 2) return;
    lastImageStep = 2;
    updateDots(2);
    
    // Hide other cards and remove bounce class
    document.getElementById('card-1-1').classList.remove('bounce');
    document.getElementById('card-1-3').classList.remove('bounce');
    gsap.set("#card-1-1, #card-1-3", { autoAlpha: 0 });
    
    gsap.to("#banner-1-img", {
      scale: 1.4,
      x: '-53%',
      y: '0%',
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Show card with bounce after image move completes
        document.getElementById('card-1-2').classList.add('bounce');
        gsap.to("#card-1-2", { autoAlpha: 1, duration: 0.1, ease: "power2.in" });
      }
    });
  }
  
  function moveImageToStep3() {
    if (lastImageStep === 3) return;
    lastImageStep = 3;
    updateDots(3);
    
    // Hide other cards and remove bounce class
    document.getElementById('card-1-1').classList.remove('bounce');
    document.getElementById('card-1-2').classList.remove('bounce');
    gsap.set("#card-1-1, #card-1-2", { autoAlpha: 0 });
    
    gsap.to("#banner-1-img", {
      scale: 1.4,
      x: '-50%',
      y: '50%',
      duration: 1,
      ease: "power2.inOut",
      onComplete: () => {
        // Show card with bounce after image move completes
        document.getElementById('card-1-3').classList.add('bounce');
        gsap.to("#card-1-3", { autoAlpha: 1, duration: 0.1, ease: "power2.in" });
      }
    });
  }
  
  function moveImageToStep4() {
    if (lastImageStep === 4) return;
    lastImageStep = 4;
    updateDots(4);
    
    // Hide all cards and remove bounce class
    document.getElementById('card-1-1').classList.remove('bounce');
    document.getElementById('card-1-2').classList.remove('bounce');
    document.getElementById('card-1-3').classList.remove('bounce');
    gsap.to("#card-1-1, #card-1-2, #card-1-3", { autoAlpha: 0, duration: 0.1 });
    
    gsap.to("#banner-1-img", {
      x: 0,
      y: 0,
      scale: 1,
      duration: 1,
      ease: "power2.inOut"
    });
  }
  
  function resetAnimation() {
    // if (currentStep === 0 && lastImageStep === 0) return;
    currentStep = 0;
    lastImageStep = 0;
    updateDots(0);
    console.log('Reset animation called');
    document.getElementById('card-1-1').classList.remove('bounce');
    document.getElementById('card-1-2').classList.remove('bounce');
    document.getElementById('card-1-3').classList.remove('bounce');
    gsap.to("#card-1-1, #card-1-2, #card-1-3", { autoAlpha: 0, duration: 0.1 });
    gsap.to("#banner-1-img", {
      scale: 1,
      x: 0,
      y: 0,
      xPercent: -50, 
      yPercent: -50,
      duration: 0.6,
      ease: "power2.inOut",
      overwrite: true
    });
  }
  
  // Reset to original state
  function resetToOriginal() {
    currentStep = 0;
    lastImageStep = 0;
    updateDots(0);
    console.log('Reset to original state');
    
    document.getElementById('card-1-1').classList.remove('bounce');
    document.getElementById('card-1-2').classList.remove('bounce');
    document.getElementById('card-1-3').classList.remove('bounce');
    gsap.to("#card-1-1, #card-1-2, #card-1-3", { autoAlpha: 0, duration: 0.3 });
    gsap.to("#banner-1-img", {
      scale: 1,
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
      duration: 1,
      ease: "power2.inOut"
    });
  }
  
  // ScrollTrigger to pin and detect scroll progress
  ScrollTrigger.create({
    trigger: "#banner-1",
    start: "top top",
    end: "+=650%",
    pin: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress * 100; // 0-100
      
      // Move image based on progress - cards will show after image movement completes
      if (progress < 5) {
        resetAnimation();
      } else if (progress >= 6 && progress < 25) {
        moveImageToStep1();
      } else if (progress >= 26 && progress < 50) {
        moveImageToStep2();
      } else if (progress >= 51 && progress < 75) {
        moveImageToStep3();
      } else if (progress >= 76 && progress < 99) {
        moveImageToStep4();
      }
    },
    onLeaveBack: () => {
      // When scrolling back up past the trigger (to the very top)
      resetToOriginal();
    },
    // markers: true // debug usage
  });
  
  // Initial state
  updateDots(0);
}

function animationSecond() {
  let currentStep = 0;
  let lastImageStep = 0;
  
  // Initial setup
  gsap.set("#banner-2-img", { xPercent: -50, yPercent: -50, scale: 1, x: 0, y: 0 });
  gsap.set("#card-1, #card-2, #card-3, #card-4, #card-5", { autoAlpha: 0 });
  
  // Move image only (no card)
  function moveImageToStep1() {
    if (lastImageStep === 1) return;
    lastImageStep = 1;
    
    // Kill any ongoing animations and hide other cards
    gsap.killTweensOf(["#card-1", "#card-2", "#card-3", "#card-4", "#card-5"]);
    gsap.set("#card-2, #card-3, #card-4, #card-5", { autoAlpha: 0, y: 0 });
    
    gsap.to("#banner-2-img", {
      scale: 1.4,
      x: '560px',
      y: '260px',
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Bounce animation with GSAP
        gsap.fromTo("#card-1", 
          {
            autoAlpha: 0,
            y: 30
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          }
        );
      }
    });
  }
  
  function moveImageToStep2() {
    if (lastImageStep === 2) return;
    lastImageStep = 2;
    
    // Kill any ongoing animations and hide other cards
    gsap.killTweensOf(["#card-1", "#card-2", "#card-3", "#card-4", "#card-5"]);
    gsap.set("#card-1, #card-3, #card-4, #card-5", { autoAlpha: 0, y: 0 });
    
    gsap.to("#banner-2-img", {
      scale: 1.4,
      x: '660px',
      y: '-50px',
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Bounce animation with GSAP
        gsap.fromTo("#card-2", 
          {
            autoAlpha: 0,
            y: 30
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          }
        );
      }
    });
  }
  
  function moveImageToStep3() {
    if (lastImageStep === 3) return;
    lastImageStep = 3;
    
    // Kill any ongoing animations and hide other cards
    gsap.killTweensOf(["#card-1", "#card-2", "#card-3", "#card-4", "#card-5"]);
    gsap.set("#card-1, #card-2, #card-4, #card-5", { autoAlpha: 0, y: 0 });
    
    gsap.to("#banner-2-img", {
      scale: 1.4,
      x: '-15%',
      y: '5%',
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Bounce animation with GSAP
        gsap.fromTo("#card-3", 
          {
            autoAlpha: 0,
            y: 30
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          }
        );
      }
    });
  }
  
  function moveImageToStep4() {
    if (lastImageStep === 4) return;
    lastImageStep = 4;
    
    // Kill any ongoing animations and hide other cards
    gsap.killTweensOf(["#card-1", "#card-2", "#card-3", "#card-4", "#card-5"]);
    gsap.set("#card-1, #card-2, #card-3, #card-5", { autoAlpha: 0, y: 0 });
    
    gsap.to("#banner-2-img", {
      scale: 1.4,
      x: '-37%',
      y: '48%',
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Bounce animation with GSAP
        gsap.fromTo("#card-4", 
          {
            autoAlpha: 0,
            y: 30
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          }
        );
      }
    });
  }
  
  function moveImageToStep5() {
    if (lastImageStep === 5) return;
    lastImageStep = 5;
    
    // Kill any ongoing animations and hide other cards
    gsap.killTweensOf(["#card-1", "#card-2", "#card-3", "#card-4", "#card-5"]);
    gsap.set("#card-1, #card-2, #card-3, #card-4", { autoAlpha: 0, y: 0 });
    
    gsap.to("#banner-2-img", {
      scale: 1.4,
      x: '-40%',
      y: '-15%',
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        // Bounce animation with GSAP
        gsap.fromTo("#card-5", 
          {
            autoAlpha: 0,
            y: 30
          },
          {
            autoAlpha: 1,
            y: 0,
            duration: 0.5,
            ease: "power2.out"
          }
        );
      }
    });
  }
  
  function moveImageToStep6() {
    if (lastImageStep === 6) return;
    lastImageStep = 6;
    
    // Kill any ongoing animations and hide all cards
    gsap.killTweensOf(["#card-1", "#card-2", "#card-3", "#card-4", "#card-5"]);
    gsap.to("#card-1, #card-2, #card-3, #card-4, #card-5", { autoAlpha: 0, y: 0, duration: 0.4 });
    
    gsap.to("#banner-2-img", {
      x: 0,
      y: 0,
      scale: 1,
      duration: 1.5,
      ease: "power2.inOut"
    });
  }
  
  function resetAnimation() {
    currentStep = 0;
    lastImageStep = 0;
    console.log('Banner 2 - Reset animation');
    gsap.killTweensOf(["#card-1", "#card-2", "#card-3", "#card-4", "#card-5"]);
    gsap.to("#card-1, #card-2, #card-3, #card-4, #card-5", { autoAlpha: 0, y: 0, duration: 0.1 });
    gsap.to("#banner-2-img", {
      scale: 1,
      x: 0,
      y: 0,
      xPercent: -50, 
      yPercent: -50,
      duration: 0.6,
      ease: "power2.inOut",
      overwrite: true
    });
  }
  
  function resetToOriginal() {
    currentStep = 0;
    lastImageStep = 0;
    console.log('Banner 2 - Reset to original state');
    
    gsap.killTweensOf(["#card-1", "#card-2", "#card-3", "#card-4", "#card-5"]);
    gsap.to("#card-1, #card-2, #card-3, #card-4, #card-5", { autoAlpha: 0, y: 0, duration: 0.3 });
    gsap.to("#banner-2-img", {
      scale: 1,
      x: 0,
      y: 0,
      xPercent: -50,
      yPercent: -50,
      duration: 1,
      ease: "power2.inOut"
    });
  }
  
  // ScrollTrigger to pin and detect scroll progress
  ScrollTrigger.create({
    trigger: "#banner-2",
    start: "top top",
    end: "+=800%",
    pin: true,
    anticipatePin: 1,
    onUpdate: (self) => {
      const progress = self.progress * 100; // 0-100
      
      // Move image based on progress - cards will show after image movement completes
      if (progress < 3) {
        resetAnimation();
      } else if (progress >= 3 && progress < 18) {
        moveImageToStep1();
      } else if (progress >= 20 && progress < 36) {
        moveImageToStep2();
      } else if (progress >= 38 && progress < 54) {
        moveImageToStep3();
      } else if (progress >= 56 && progress < 72) {
        moveImageToStep4();
      } else if (progress >= 74 && progress < 90) {
        moveImageToStep5();
      } else if (progress >= 92) {
        moveImageToStep6();
      }
    },
    onLeaveBack: () => {
      resetToOriginal();
    },
    // markers: true // debug usage
  });
}
