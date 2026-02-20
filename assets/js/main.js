function getLocale() {
  const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '')
  const firstSegment = pathSegments[0]
  return firstSegment || 'zh'
}

function renderHeader() {
  const body = document.querySelector('body')
  body.insertAdjacentHTML('afterbegin', `
    <nav class="sticky top-0">
      <div class="flex justify-between nav-inner absolute w-full px-2.5">
        <a class="inline-flex" href="/">
          <img class="w-[380px]" src="/assets/images/icon/home-logo.svg" style="margin-left:20px;" />
        </a>
        <div class="flex items-start justify-center menu gap-[15px]">
          <a
            onclick="renderBackdropMenu()"
            class="menu_trigger homepage"
          ><img class="menu" src="/assets/images/icon/menu_trigger.svg" /></a>
        </div>
      </div>
    </nav>
  `)
}

function renderOtherHeader() {
  const locale = getLocale()
  const menuItems = [
    { title: 'Introduction', url: 'introduction.html' },
    {
      title: '5 Construction Process', url: '',
      children: [
        { title: '1. Preliminary Design', url: '1_preliminary_design.html' },
        { title: '2. Detailed Design', url: '2_detailed_design.html' },
        { title: '3. Tendering', url: '3_tendering.html' },
        { title: '4. Construction', url: '4_construction.html' },
        { title: '5. Operation & Maintenance', url: '5_operation_maintenance.html' },
      ]
    },
    { title: 'BIM', url: 'bim.html' },
    { title: 'Case Study', url: 'introduction.html' },
    { title: 'Checklist', url: 'introduction.html' },
  ]

  const body = document.querySelector('body')
  body.insertAdjacentHTML('afterbegin', `
    <nav class="" id="in-page-navnav">
      <div class="flex justify-between nav-other-inner w-full px-7.5 h-[100px] items-center">
        <a class="inline-flex" href="/">
          <img class="w-[240px]" src="/assets/images/icon/home-logo.svg"/>
        </a>
        <div class="flex items-center justify-center menu gap-[30px] h-full">
          <div class="menu-wrapper h-full">
            ${menuItems.map(i => {
              if (i.children && i.children.length > 0) {
                return `
                  <div class="h-full flex items-center relative group">
                    <span class="item cursor-pointer">${i.title}</span>
                    <div class="absolute hidden group-hover:block bg-white shadow-lg rounded-md top-full left-0 z-50">
                      ${i.children.map(child => `
                        <a class="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap" href="/${locale}/${child.url}">${child.title}</a>
                      `).join('')}
                    </div>
                  </div>
                `;
              } else {
                return `
                  <div class="h-full flex items-center">
                    <a class="item" href="/${locale}/${i?.url}">${i.title}</a>
                  </div>
                `;
              }
            }).join('')}
          </div>
          <a
            onclick="renderBackdropMenu()"
            class="menu_trigger"
          ><img class="menu" src="/assets/images/icon/menu_trigger.svg" /></a>
          ${renderSizeAndLang()}
        </div>
      </div>
    </nav>
  `)
}

function changeFontSize(size) {
  const root = document.documentElement
  const sizeMap = {
    1: '0.8rem',
    2: '1rem',
    3: '1.2rem'
  }
  root.style.fontSize = sizeMap[size]
  localStorage.setItem('fontSizePreference', size)
  updateFontSizeButtons(size)
}

function changeLanguage(newLocale) {
  const pathSegments = window.location.pathname.split('/').filter(segment => segment !== '')
  const currentLocale = getLocale()
  
  // If already on this language, do nothing
  if (currentLocale === newLocale) return
  
  let newPath
  
  // If current page is in language-specific folder, replace the locale
  if (pathSegments[0] === currentLocale && (currentLocale === 'en' || currentLocale === 'sc' || currentLocale === 'zh')) {
    newPath = '/' + newLocale + '/' + pathSegments.slice(1).join('/')
  } else {
    // If on homepage or root
    newPath = '/' + newLocale + (pathSegments.length > 0 ? '/' + pathSegments.join('/') : '/')
  }
  
  window.location.href = newPath
}

function updateLanguageButtons(currentLocale) {
  document.querySelectorAll('.lang-switcher > div').forEach((div, index) => {
    const langCodes = ['zh', 'sc', 'en']
    if (langCodes[index] === currentLocale) {
      div.classList.add('active')
    } else {
      div.classList.remove('active')
    }
  })
}

function updateFontSizeButtons(activeSize) {
  document.querySelectorAll('.acc-font-size > div').forEach((div, index) => {
    const btnSize = index + 1
    if (btnSize === activeSize) {
      div.classList.add('active')
    } else {
      div.classList.remove('active')
    }
  })
}

function renderSizeAndLang() {
  return `
    <div class="acc-font-size flex justify-center gap-2">
      <div class="flex items-end" onclick="changeFontSize(1)"><span class="size1">A</span></div>
      <div class="flex items-end" onclick="changeFontSize(2)"><span class="size2">A</span></div>
      <div class="flex items-end" onclick="changeFontSize(3)"><span class="size3">A</span></div>
    </div>
    <div class="lang-switcher flex justify-center text-base">
      <div class="cursor-pointer" onclick="changeLanguage('zh')"><span class="font-bold">繁</span></div>
      <div class="cursor-pointer" onclick="changeLanguage('sc')"><span class="font-bold">简</span></div>
      <div class="cursor-pointer" onclick="changeLanguage('en')"><span class="font-bold">EN</span></div>
    </div>
    `
}

function renderBackdropMenu() {
  const currentLocale = getLocale()
  const menuItems = [
    { title: 'Introduction', url: 'introduction.html' },
    {
      title: '5 Construction Process', url: '',
      children: [
        { title: '1. Preliminary Design', url: '1_preliminary_design.html' },
        { title: '2. Detailed Design', url: '2_detailed_design.html' },
        { title: '3. Tendering', url: '3_tendering.html' },
        { title: '4. Construction', url: '4_construction.html' },
        { title: '5. Operation & Maintenance', url: '5_operation_maintenance.html' },
      ]
    },
    { title: 'BIM', url: 'bim.html' },
    { title: 'Case Study', url: 'introduction.html' },
    { title: 'Checklist', url: 'introduction.html' },
    { title: 'Gallery', url: 'introduction.html' },
  ]

  const menu = `
    <div class="backdrop-menu">
      ${menuItems.map((i, index) => {
        if (i.children && i.children.length > 0) {
          return `
            <div class="menu-item-wrapper">
              <div class="item expandable" onclick="toggleSubmenu(${index})">
                <span>${i.title}</span>
                <div class="img-wrap"><img src="/assets/images/icon/icon-plus.svg" /></div>
              </div>
              <div class="submenu hidden" id="submenu-${index}">
                ${i.children.map(child => `
                  <a class="item submenu-item" href="/${currentLocale}/${child.url}">
                    <span>${child.title}</span>
                  </a>
                `).join('')}
              </div>
            </div>
          `;
        } else {
          return `
            <a class="item" href="/${currentLocale}/${i.url}">
              <span>${i.title}</span>
              <div class="img-wrap"><img src="/assets/images/icon/icon-plus.svg" /></div>
            </a>
          `;
        }
      }).join('')}
      <div class="flex flex-col gap-7 mt-4">
        ${renderSizeAndLang()}
      </div>
    </div>
  `
  openBackdrop(menu, false, '#F6CAA0E6')
  const savedFontSize = localStorage.getItem('fontSizePreference') || 2
  changeFontSize(parseInt(savedFontSize))
  
  // Set active language button
  updateLanguageButtons(currentLocale)
}

function renderFooter() {
  const body = document.querySelector('body')
  body.insertAdjacentHTML('beforeend', `
    <footer class="flex justify-between mx-auto">
      <div class="footer-inner flex justify-between mx-auto">
        <div class="flex p-5 items-center">
          
          <img class="max-h-[30px]" src="/assets/images/icon/footer_2.svg" />
        </div>
        
      </div>
    </footer>
  `)
  // <img class="max-h-[56px] mr-5" src="/assets/images/icon/footer_1.svg" />
  // <div class="flex items-center text-[#EF4136]">©${new Date().getFullYear()} All Rights Reserved.</div>
}

function toggleSubmenu(index) {
  const submenu = document.getElementById(`submenu-${index}`)
  const expandable = submenu.previousElementSibling
  
  if (submenu.classList.contains('hidden')) {
    submenu.classList.remove('hidden')
    submenu.style.maxHeight = submenu.scrollHeight + 'px'
    expandable.classList.add('expanded')
  } else {
    submenu.style.maxHeight = '0'
    setTimeout(() => {
      submenu.classList.add('hidden')
      expandable.classList.remove('expanded')
    }, 300)
  }
}

function onDocumentLoaded() {
  const isHomePage = document.querySelector('body.homepage')
  if (isHomePage) {
    renderHeader()
    // renderOtherHeader()
  } else {
    renderOtherHeader()
  }
  renderFooter()
  
  // Restore font size preference
  const savedFontSize = localStorage.getItem('fontSizePreference') || 2
  changeFontSize(parseInt(savedFontSize))
  
  // Set active language button
  const currentLocale = getLocale()
  updateLanguageButtons(currentLocale)
}

document.addEventListener('DOMContentLoaded', onDocumentLoaded)
