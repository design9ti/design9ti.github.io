document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger, Observer, ScrollSmoother);
  animationFirst()
})


function animationFirst() {
  // initial setup
  const t1 = gsap.timeline({
    scrollTrigger: {
      trigger: "#banner-1",
      start: "20px",
      end: "+=500%",
      pin: true,
      scrub: 1,
      anticipatePin: 1,
      markers: true // debug usage
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
    x: '300px',
    y: '330px',
    duration: 3,
  })
  // end step1

  // pre step2
  t1.fromTo("#card-1-1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.out" })
  t1.to({}, { duration: 3 })

  // start step2 
  t1.fromTo("#card-1-1", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.out" })
  t1.to("#banner-1-img", {
    scale: 1.4,
    x: '-10%',
    y: '0%',
    duration: 3
  })
  // end step2

  // pre step3
  t1.fromTo("#card-1-2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.out" })
  t1.to({}, { duration: 3 })

  // start step3
  t1.fromTo("#card-1-2", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.out" })
  t1.to("#banner-1-img", {
    scale: 1.4,
    x: '-20%',
    y: '50%',
    duration: 3
  })
  // end step3

  // pre end
  t1.fromTo("#card-1-3", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.out" })
  t1.to({}, { duration: 3 })

  // end
  t1.fromTo("#card-1-3", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.out" })
  t1.to("#banner-1-img", {
    x: 0,
    y: 0,
    scale: 1,
    duration: 3
  }, "+=1")
}
