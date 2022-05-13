const dataPopups = document.querySelectorAll('[data-popup]')
const dataSidebars = document.querySelectorAll('[data-sidebar]')
const dataTabs = document.querySelectorAll('[data-tab]')
const popups = document.querySelectorAll('.popup')
const sidebars = document.querySelectorAll('.sidebar')
const filers = document.querySelectorAll('.item-form-filter')
const cartCounter = document.querySelector('.counter-item-product')
const body = document.body

const lockBody = () => {
  const offsetPadding = window.innerWidth - body.offsetWidth

  body.style.paddingRight = `${offsetPadding}px`
  body.classList.add('_lock-body')
}

const unlockBody = () => {
  setTimeout(() => {
    body.removeAttribute('style')
    body.classList.remove('_lock-body')
  }, 200)
}

if (filers.length > 0) {
  const toggleFilter = (currentFilter) => {
    currentFilter.classList.toggle('_hide-filter')
  }

  filers.forEach((filter) => {
    const bodyFilter = filter.querySelector('.body-item-form-filter')
    const headItemFilter = filter.querySelector('.head-item-form-filter')
    const bodyHeightFilter = bodyFilter.offsetHeight

    filter.style = `--body-height-filter: ${bodyHeightFilter}px;`

    if (!filter.classList.contains('item-form-filter--price')) {
      filter.classList.add('_hide-filter')
    }

    headItemFilter.addEventListener('click', toggleFilter.bind(null, filter))
  })
}

if (dataPopups.length > 0) {
  const openPopup = (event) => {
    const attrValue = event.currentTarget.getAttribute('data-popup')
    const currentPoup = document.getElementById(attrValue)

    currentPoup.classList.add('_active-popup')

    lockBody()
  }

  dataPopups.forEach((dataPopup) => {
    dataPopup.addEventListener('click', openPopup)
  })
}

if (dataSidebars.length > 0) {
  const openSidebar = (event) => {
    const attrValue = event.currentTarget.getAttribute('data-sidebar')
    const currentSidebar = document.getElementById(attrValue)

    currentSidebar.classList.add('_active-sidebar')

    lockBody()
  }

  dataSidebars.forEach((dataSidebar) => {
    dataSidebar.addEventListener('click', openSidebar)
  })
}

if (sidebars.length > 0) {
  const closeSidebar = (currentSidebar, customSelects, event) => {
    currentSidebar.classList.remove('_active-sidebar')

    unlockBody()

    closeCustomSelects(event, customSelects)
  }

  const closeCustomSelects = (event, customSelects) => {
    if (!event.target.closest('.custom-select-input')) {
      if (customSelects.length > 0) {
        customSelects.forEach((select) => {
          if (select.classList.contains('_active-select')) {
            select.classList.remove('_active-select')
          }
        })
      }
    }
  }

  const handleInnerClick = (customSelects, event) => {
    event.stopPropagation()

    closeCustomSelects(event, customSelects)
  }

  sidebars.forEach((sidebar) => {
    const sidebarInner = sidebar.querySelector('.sidebar__inner')
    const sidebarClose = sidebar.querySelector('.head-sidebar__close')
    const customSelects = sidebarInner.querySelectorAll('.custom-select-input')

    sidebar.addEventListener(
      'click',
      closeSidebar.bind(null, sidebar, customSelects)
    )
    sidebarInner.addEventListener(
      'click',
      handleInnerClick.bind(null, customSelects)
    )
    sidebarClose.addEventListener(
      'click',
      closeSidebar.bind(null, sidebar, customSelects)
    )
  })
}

if (popups.length > 0) {
  const getSelectHeadByCurrentSelect = (select) => {
    const selectHead = select.querySelector('.custom-select-input__head')
    const selectHeadTitle = selectHead.querySelector(
      '.custom-select-input__title'
    )

    return { selectHead, selectHeadTitle }
  }
  const closeCustomSelects = (event, customSelects) => {
    if (!event.target.closest('.custom-select-input')) {
      if (customSelects.length > 0) {
        customSelects.forEach((select) => {
          if (select.classList.contains('_active-select')) {
            select.classList.remove('_active-select')
          }
        })
      }
    }
  }

  const toggleCustomSelect = (event) => {
    const currentSelect = event.currentTarget.parentElement

    currentSelect.classList.toggle('_active-select')
  }

  const closeCustomSelect = (select) => {
    select.classList.remove('_active-select')
  }

  const handleClickSelectOption = (selectInput, selectHeadTitle, event) => {
    const optionValue = event.currentTarget.innerText
    const currentSelect = selectInput.parentElement

    selectHeadTitle.innerText = optionValue
    selectInput.value = optionValue

    closeCustomSelect(currentSelect)
  }

  const closePopup = (currentPopup, customSelects, event) => {
    currentPopup.classList.remove('_active-popup')

    unlockBody()

    closeCustomSelects(event, customSelects)
  }

  const handleInnerClick = (customSelects, event) => {
    event.stopPropagation()

    closeCustomSelects(event, customSelects)
  }

  const clearInputsByItems = (items) => {
    items.forEach((item) => {
      item.querySelector('input').value = ''
    })
  }

  const uncheckedInputsByItems = (items) => {
    items.forEach((item) => {
      item.querySelector('input').checked = false
    })
  }

  const getPopupItemsInput = (popup) => {
    const registerItems = popup.querySelectorAll(
      '.inputs-form-popup__item._register'
    )

    const loginItems = popup.querySelectorAll('.inputs-form-popup__item._login')

    const agreementsItems = popup.querySelectorAll(
      '.form-popup-agreements__item'
    )

    return { registerItems, loginItems, agreementsItems }
  }

  const getPopupChangeBtn = (popup) => {
    const btnToLogin = popup.querySelector(
      '.form-popup-controls__link._register'
    )
    const btnToRegister = popup.querySelector(
      '.form-popup-controls__link._login'
    )

    return { btnToLogin, btnToRegister }
  }

  const changeToLoginPopup = (currentPopup, registerItems, agreementsItems) => {
    currentPopup.classList.remove('_popup-register')
    currentPopup.classList.add('_popup-login')

    clearInputsByItems(registerItems)
    uncheckedInputsByItems(agreementsItems)
  }

  const changeToRegisterPopup = (currentPopup, loginItems) => {
    currentPopup.classList.remove('_popup-login')
    currentPopup.classList.add('_popup-register')

    clearInputsByItems(loginItems)
  }

  popups.forEach((popup) => {
    const popupInner = popup.querySelector('.popup__inner')
    const popupClose = popup.querySelector('.popup-close')
    const customSelects = popupInner.querySelectorAll('.custom-select-input')

    popup.addEventListener('click', closePopup.bind(null, popup, customSelects))
    popupInner.addEventListener(
      'click',
      handleInnerClick.bind(null, customSelects)
    )
    popupClose.addEventListener(
      'click',
      closePopup.bind(null, popup, customSelects)
    )

    if (popup.classList.contains('popup--authorization')) {
      const { btnToLogin, btnToRegister } = getPopupChangeBtn(popup)
      const { registerItems, loginItems, agreementsItems } =
        getPopupItemsInput(popup)

      btnToLogin.addEventListener(
        'click',
        changeToLoginPopup.bind(null, popup, registerItems, agreementsItems)
      )

      btnToRegister.addEventListener(
        'click',
        changeToRegisterPopup.bind(null, popup, loginItems)
      )
    }

    if (customSelects.length > 0) {
      customSelects.forEach((select) => {
        const { selectHead, selectHeadTitle } =
          getSelectHeadByCurrentSelect(select)
        const selectInput = select.querySelector('input')
        const selectOptions = select.querySelectorAll(
          '.custom-select-input__item'
        )

        selectHead.addEventListener('click', toggleCustomSelect)

        if (selectOptions.length > 0) {
          selectOptions.forEach((selectOption) => {
            selectOption.addEventListener(
              'click',
              handleClickSelectOption.bind(null, selectInput, selectHeadTitle)
            )
          })
        }
      })
    }
  })
}

if (cartCounter) {
  const cartCounterInput = cartCounter.querySelector('input')

  const handleCartCounterClick = (event) => {
    const btnPlus = event.target.closest('.counter-item-product__btn--plus')
    const btnMinus = event.target.closest('.counter-item-product__btn--minus')

    if (btnPlus) {
      cartCounterInput.value = ++cartCounterInput.value
    }

    if (btnMinus) {
      if (cartCounterInput.value > 1) {
        cartCounterInput.value = --cartCounterInput.value
      }
    }
  }

  const handleInputChange = (event) => {
    const valueWithoutLetters = cartCounterInput.value.replace(/[^\d]/g, '')

    cartCounterInput.value = valueWithoutLetters
  }

  cartCounterInput.addEventListener('input', handleInputChange)
  cartCounter.addEventListener('click', handleCartCounterClick)
}

if (dataTabs.length > 0) {
  const bodyTabs = document.querySelectorAll(
    '.body-description-page-product__item'
  )

  if (bodyTabs.length > 0) {
    bodyTabs.forEach((bodyTab) => {
      bodyTab.classList.remove('_hide-tab')

      const heightBodyTab = bodyTab.offsetHeight

      bodyTab.style = `--height-body-tab: ${heightBodyTab}px`

      if (!bodyTab.classList.contains('_default-tab')) {
        bodyTab.classList.add('_hide-tab')
      }
    })
  }

  const handleDataTabClick = (event) => {
    if (!event.currentTarget.classList.contains('_active-tab')) {
      dataTabs.forEach((dataTab) => dataTab.classList.remove('_active-tab'))

      event.currentTarget.classList.add('_active-tab')

      if (bodyTabs.length > 0) {
        bodyTabs.forEach((bodyTab) => bodyTab.classList.add('_hide-tab'))
      }

      const attrTab = event.currentTarget.getAttribute('data-tab')
      const activeTab = document.getElementById(attrTab)

      activeTab.classList.remove('_hide-tab')
    }
  }

  dataTabs.forEach((dataTab) => {
    dataTab.addEventListener('click', handleDataTabClick)
  })
}
