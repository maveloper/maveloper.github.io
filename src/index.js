const regionPopover = document.getElementsByClassName('region-popover')[0]
const regionPopoverList = document.getElementsByClassName('region-popover-list')[0]

document.addEventListener('mousedown', ({ target }) => {
  if (!regionPopoverList.contains(target)) {
      regionPopover.classList.add('hidden')
  }
})

const toggleRegionPopover = () => {
  regionPopover.classList.toggle('hidden')
}

const updateRegionContents = region =>
  Array.from(
    document.querySelectorAll('[i18n]'),
    element =>
      element.textContent = i18n[region][element.getAttribute('i18n')]
  )

const handleActivePopoverItem = target =>
  Array.from(
    regionPopoverList.childNodes,
    element => (
      element.id !== target.id
        ? element.classList.remove('popover-active-item')
        : ''
    )
  )

const handleChangeRegion = ({ target }) => {
  target.classList.add('popover-active-item')

  handleActivePopoverItem(target)
  updateRegionContents(target.id)
  
  regionPopover.classList.add('hidden')
  localStorage.setItem('language', target.id)
}

if (!Object.entries(i18n).length) {
    region.style.display = 'none'
}

const hasAtLeastOneRegionToRender =
  Object
    .entries(i18n)
    .some(region => Object.keys(region[1]).length)
  

if (hasAtLeastOneRegionToRender) {
    Object.entries(i18n).map(region => {  
      const canRender = Object.keys(region[1]).length 
      
      if (canRender) {
          const li = document.createElement('li')

          li.textContent = region[1].regionLabel
          li.id = region[0]
          li.addEventListener('click', handleChangeRegion)
      
          regionPopoverList.append(li)
      }
    })
} else {
    document
      .getElementById('region')
      .style
      .display = 'none'
}

updateRegionContents(localStorage.getItem('language'))