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

  dots.forEach(dot => {
    dot.addEventListener('click', function () {
      const step = parseInt(this.getAttribute('data-step'));
      const banner = document.getElementById('banner-1');

      let scrollPosition;
      
      if (step === 0) {
        // Step 0: Top of the page
        scrollPosition = 0;
      } else {
        // Steps 1-3: Animation steps
        // Calculate scroll position based on step
        const totalScroll = banner.offsetHeight * 5 * 1.1; // end: "+=500%"
        scrollPosition = banner.offsetTop + (totalScroll * (step - 1) * 0.25); // 3 steps = 33% each
      }

      // Update active dot
      dots.forEach(d => d.classList.remove('active'));
      this.classList.add('active');

      // Animate scroll to position
      gsap.to("html, body", {
        scrollTop: scrollPosition,
        duration: 1,
        ease: "power2.inOut"
      });
    });
  });
}

function animationFirst() {
  const dots = document.querySelectorAll('#banner-1-dots .dot');
  
  // initial setup
  const t1 = gsap.timeline({
    id: 'banner-1-trigger',
    scrollTrigger: {
      trigger: "#banner-1",
      start: "20px",
      end: "+=500%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      onUpdate: (self) => {
        // Update dots based on progress
        const progress = self.getVelocity === undefined ? self.progress : self.progress;
        let activeIndex = 0;

        if (progress >= 0 && progress < 0.25) {
          activeIndex = 0; // Dot 1
        } else if (progress >= 0.25 && progress < 0.5) {
          activeIndex = 1; // Dot 2
        } else if (progress >= 0.5 && progress < 0.75) {
          activeIndex = 2; // Dot 3
        } else if (progress >= 0.75) {
          activeIndex = 3; // Dot 4
        }

        // Update dots
        dots.forEach((dot, index) => {
          if (index === activeIndex) {
            dot.classList.add('active');
          } else {
            dot.classList.remove('active');
          }
        });
      }
      // markers: true // debug usage
    }
  })
  gsap.set("#banner-1-img", { xPercent: -50, yPercent: -50 })

  // start step1
  t1.fromTo("#banner-1-img",
    {
      scale: 1,
      x: 0,
      y: 0,
    },
    {
      scale: 1.4,
      x: '35%',
      y: '38%',
      duration: 3,
    })
  // Image animation complete, now show card
  t1.fromTo("#card-1-1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power3.inOut" }, "+=0")
  // end step1

  // pre step2
  t1.to({}, { duration: 3 })
  
  // start step2 
  t1.fromTo("#card-1-1", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.inOut" })
  t1.to("#banner-1-img", {
    scale: 1.4,
    x: '-53%',
    y: '0%',
    duration: 3
  })
  t1.fromTo("#card-1-2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.inOut" })
  // end step2

  // pre step3
  t1.to({}, { duration: 3 })

  // start step3
  t1.fromTo("#card-1-2", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.inOut" })
  t1.to("#banner-1-img", {
    scale: 1.4,
    x: '-50%',
    y: '50%',
    duration: 3
  })
  t1.fromTo("#card-1-3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.inOut" })
  // end step3

  // pre end
  t1.to({}, { duration: 3 })
  t1.fromTo("#card-1-3", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.inOut" })
  
  // end
  t1.to("#banner-1-img", {
    x: 0,
    y: 0,
    scale: 1,
    duration: 3
  }, "+=1")
}

function animationSecond() {
  const t2 = gsap.timeline({
    id: 'banner-2-trigger',
    scrollTrigger: {
      trigger: "#banner-2",
      start: "20px",
      end: "+=900%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      // markers: true // debug usage
    }
  })
  gsap.set("#banner-2-img", { xPercent: -50, yPercent: -50 })
  // step 1
  t2.fromTo("#banner-2-img",
    {
      scale: 1,
      x: 0,
      y: 0,
    },
    {
      scale: 1.2,
      x: '430px',
      y: '340px',
      duration: 3,
      onEnter: () => t2.scrollTrigger.spacer.style.backgroundColor = "#edd7c3"
    })
  t2.fromTo("#card-1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power3.inOut" }, "+=0")
  // end step1

  // pre step2
  t2.to({}, { duration: 3 })

 // start step2 
  t2.fromTo("#card-1", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.inOut" })
  t2.to("#banner-2-img", {
    scale: 1.2,
    x: '760px',
    y: '-230px',
    duration: 3
  })
  t2.fromTo("#card-2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.inOut" })
  // end step2

  // pre step3
  t2.to({}, { duration: 3 })

  // start step3
  t2.fromTo("#card-2", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.inOut" })
  t2.to("#banner-2-img", {
    scale: 1.2,
    x: '-3%',
    y: '-5%',
    duration: 3
  })
  t2.fromTo("#card-3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.inOut" })
  // end step3
  // pre step4
  t2.to({}, { duration: 3 })
  // start step4
  t2.fromTo("#card-3", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.inOut" })
  t2.to("#banner-2-img", {
    scale: 1.2,
    x: '-23%',
    y: '25%',
    duration: 3
  })
  t2.fromTo("#card-4", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.inOut" })
  // pre step5
  t2.to({}, { duration: 3 })
  // start step5
  t2.fromTo("#card-4", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.inOut" })
  t2.to("#banner-2-img", {
    scale: 1.2,
    x: '-23%',
    y: '-35%',
    duration: 3
  })
  t2.fromTo("#card-5", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.inOut" })
  t2.to({}, { duration: 3 })
  t2.fromTo("#card-5", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.inOut" })
  t2.to({}, { duration: 2 })

  t2.to("#banner-2-img", {
    x: 0,
    y: 0,
    scale: 1,
    duration: 3
  }, "+=1")

  // t2.to("#banner-2-img", {
  //   scale: 1.4,
  //   x: 500,
  //   y: 820,
  //   duration: 3,
  //   onEnter: () => t2.scrollTrigger.spacer.style.backgroundColor = "#edd7c3"
  // }, "+=1.5")
  // t2.to("#card-1", { autoAlpha: 1, duration: 2.2, ease: "power1.out" }, "+=0.4")
  // t2.to("#card-1", { autoAlpha: 0, duration: 1.8, ease: "power1.in" }, "+=0.8")
  // // step 2
  // t2.to("#banner-2-img", {
  //   scale: 1.4,
  //   x: 700,
  //   y: 200,
  //   duration: 4,
  // }, "+=1.2")
  // t2.to("#card-2", { autoAlpha: 1, duration: 2.2, ease: "power1.out" }, "+=0.4")
  // t2.to("#card-2", { autoAlpha: 0, duration: 1.8, ease: "power1.in" }, "+=0.8")
  // // step 3
  // t2.to("#banner-2-img", {
  //   scale: 1.4,
  //   x: -200,
  //   y: 380,
  //   duration: 4,
  // }, "+=1.2")
  // t2.to("#card-3", { autoAlpha: 1, duration: 2.2, ease: "power1.out" }, "+=0.4")
  // t2.to("#card-3", { autoAlpha: 0, duration: 1.8, ease: "power1.in" }, "+=0.8")
  // // step 4
  // t2.to("#banner-2-img", {
  //   scale: 1.4,
  //   x: -450,
  //   y: 950,
  //   duration: 4,
  // }, "+=1.2")
  // t2.to("#card-4", { autoAlpha: 1, duration: 2.2, ease: "power1.out" }, "+=0.4")
  // t2.to("#card-4", { autoAlpha: 0, duration: 1.8, ease: "power1.in" }, "+=0.8")
  // // step 5
  // t2.to("#banner-2-img", {
  //   scale: 1.4,
  //   x: -300,
  //   y: 0,
  //   duration: 4,
  // }, "+=1.2")
  // t2.to("#card-5", { autoAlpha: 1, duration: 2.2, ease: "power1.out" }, "+=0.4")
  // t2.to("#card-5", { autoAlpha: 0, duration: 1.8, ease: "power1.in" }, "+=0.8")
  // // end
  // t2.to("#banner-2-img", {
  //   x: 0,
  //   y: 0,
  //   scale: 1,
  //   duration: 3
  // }, "+=1")
}
