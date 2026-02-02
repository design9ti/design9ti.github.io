(function () {
  function buildModal() {
    const modal = document.createElement('div')
    modal.className = 'video-modal hidden'
    modal.innerHTML = `
			<div class="video-modal__content" role="dialog" aria-modal="true">
				<button class="video-modal__close" aria-label="Close">×</button>
				<iframe class="video-modal__iframe" src="" allow="autoplay fullscreen" allowfullscreen></iframe>
			</div>
		`
    document.body.appendChild(modal)
    return modal
  }

  const modal = buildModal()
  const iframe = modal.querySelector('.video-modal__iframe')
  const closeBtn = modal.querySelector('.video-modal__close')

  function openModal(videoId) {
    if (!videoId) return
    const src = `https://www.youtube.com/embed/${encodeURIComponent(videoId)}?autoplay=1&rel=0`
    iframe.src = src
    modal.classList.remove('hidden')
    document.body.style.overflow = 'hidden'
    // focus close button for accessibility
    closeBtn.focus()
  }

  function closeModal() {
    modal.classList.add('hidden')
    // stop video
    iframe.src = ''
    document.body.style.overflow = ''
  }

  // Close when clicking the backdrop (but not when clicking the content)
  modal.addEventListener('click', function (e) {
    if (e.target === modal) closeModal()
  })

  closeBtn.addEventListener('click', closeModal)

  // Close on ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) closeModal()
  })

  // Delegate clicks on elements with `.video-thumb` and `data-video-id`
  document.addEventListener('click', function (e) {
    const el = e.target.closest && e.target.closest('.video-thumb')
    if (!el) return
    const id = el.getAttribute('data-video-id')
    if (id) {
      openModal(id)
    }
  })

  // Expose helper on window for programmatic use
  window.openYouTubeModal = openModal
  window.closeYouTubeModal = closeModal
})()
