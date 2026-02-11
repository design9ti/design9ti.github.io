document.addEventListener('DOMContentLoaded', function () {
  gsap.registerPlugin(ScrollTrigger, Observer, ScrollSmoother);

  animationFirst()
  animationSecond()

})


function animationFirst() {
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
  // step 1 - animate for 3s
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
  t1.fromTo("#card-1-1", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.out" })
  t1.to({}, { duration: 3 })

  // step 2 - animate for 3s
  t1.fromTo("#card-1-1", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.out" })
  t1.to("#banner-1-img", {
    scale: 1.4,
    x: '-10%',
    y: '0%',
    duration: 3
  })
  t1.fromTo("#card-1-2", { autoAlpha: 0 }, { autoAlpha: 1, duration: 2, ease: "power1.out" })
  t1.to({}, { duration: 3 })

  // step 3 - animate for 3s
  t1.fromTo("#card-1-2", { autoAlpha: 1 }, { autoAlpha: 0, duration: 1, ease: "power1.out" })
  t1.to("#banner-1-img", {
    scale: 1.4,
    x: '-20%',
    y: '50%',
    duration: 3
  })
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

function animationSecond() {
  const t2 = gsap.timeline({
    defaults: { ease: "none" },
    scrollTrigger: {
      trigger: "#banner-2",
      start: "top top",
      end: "+=1000%",
      pin: true,
      scrub: 1.5,
      anticipatePin: 1,
      markers: true // debug usage
    }
  })
  // step 1
  t2.to("#banner-2-img", {
    scale: 1.4,
    x: 500,
    y: 820,
    duration: 3,
    onEnter: () => t2.scrollTrigger.spacer.style.backgroundColor = "#edd7c3"
  }, "+=1.5")
  t2.to("#card-1", { autoAlpha: 1, duration: 2.2, ease: "power1.out" }, "+=0.4")
  t2.to("#card-1", { autoAlpha: 0, duration: 1.8, ease: "power1.in" }, "+=0.8")
  // step 2
  t2.to("#banner-2-img", {
    scale: 1.4,
    x: 700,
    y: 200,
    duration: 4,
  }, "+=1.2")
  t2.to("#card-2", { autoAlpha: 1, duration: 2.2, ease: "power1.out" }, "+=0.4")
  t2.to("#card-2", { autoAlpha: 0, duration: 1.8, ease: "power1.in" }, "+=0.8")
  // step 3
  t2.to("#banner-2-img", {
    scale: 1.4,
    x: -200,
    y: 380,
    duration: 4,
  }, "+=1.2")
  t2.to("#card-3", { autoAlpha: 1, duration: 2.2, ease: "power1.out" }, "+=0.4")
  t2.to("#card-3", { autoAlpha: 0, duration: 1.8, ease: "power1.in" }, "+=0.8")
  // step 4
  t2.to("#banner-2-img", {
    scale: 1.4,
    x: -450,
    y: 950,
    duration: 4,
  }, "+=1.2")
  t2.to("#card-4", { autoAlpha: 1, duration: 2.2, ease: "power1.out" }, "+=0.4")
  t2.to("#card-4", { autoAlpha: 0, duration: 1.8, ease: "power1.in" }, "+=0.8")
  // step 5
  t2.to("#banner-2-img", {
    scale: 1.4,
    x: -300,
    y: 0,
    duration: 4,
  }, "+=1.2")
  t2.to("#card-5", { autoAlpha: 1, duration: 2.2, ease: "power1.out" }, "+=0.4")
  t2.to("#card-5", { autoAlpha: 0, duration: 1.8, ease: "power1.in" }, "+=0.8")
  // end
  t2.to("#banner-2-img", {
    x: 0,
    y: 0,
    scale: 1,
    duration: 3
  }, "+=1")
}
