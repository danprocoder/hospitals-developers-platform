import * as React from 'react'

const changeActiveMenu = (menuListId: string, currentItem: string) => {
  console.log(menuListId, currentItem)
  const links = document.getElementById(menuListId).querySelectorAll('a')

  links.forEach((anchor) => {
    const href = anchor.getAttribute('href').substr(1)
    if (href === currentItem) {
      anchor.classList.add('active')
    } else {
      anchor.classList.remove('active')
    }
  })
}

type PropTypes = {
  children: React.ReactNode,
  menuListId: string,
  spyOn: any[]
}
export default (props: PropTypes) => {
  let currentItem: string

  interface Position { id: string, yOffset: number }
  let items: Position[] = []

  React.useEffect(() => {
    for (let id of props.spyOn) {
      const el: HTMLElement = document.querySelector(`#${id}`)
      const yOffset: number = el.offsetTop

      items.push({ id, yOffset })
    }
    items.sort((a: Position, b: Position) => b.yOffset - a.yOffset)

    function onScroll () {
      for (let i of items) {
        if (i.yOffset <= window.scrollY + 110) {
          if (currentItem !== i.id) {
            currentItem = i.id

            changeActiveMenu(props.menuListId, currentItem)
          }
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div>
      {props.children}
    </div>
  )
}
