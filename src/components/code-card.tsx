import * as React from 'react'
import styled from 'styled-components'
import '../../public/scss/components/code-card.scss'

interface CodeCardTemplate {
  tabMenus: any[],
  children: React.ReactNode
}

export default class CodeCard extends React.Component {

  props: CodeCardTemplate

  containerRef = React.createRef<HTMLDivElement>()

  state: any = {
    activeTabIndex: null
  }

  componentDidMount () {
    const { tabMenus } = this.props

    this.changeTab(tabMenus[0].id)
  }

  componentDidUpdate () {
    const { activeTabIndex } = this.state

    console.log(activeTabIndex, 'called')
  }

  changeTab (tabId: string): void {
    const container = this.containerRef.current
    for (let item of container.querySelectorAll('.tab-content')) {
      item.classList.remove('active')
    }

    const selected = container.querySelector(`.tab-content#${tabId}`)
    if (selected) selected.classList.add('active')
  }

  tabMenuClickListener (event: MouseEvent, tabId: string) {
    event.preventDefault()

    this.changeTab(tabId)
  }

  render (): JSX.Element {
    const { tabMenus, children } = this.props

    return (
      <div
        className='code-card'
        ref={this.containerRef}
      >
        <CodeCardTabMenuContainer className='tab-menu-container'>
          <ul>
            {tabMenus.map(menu => (
              <li key={menu.id}>
                <a
                  href='#'
                  onClick={(event: any) => this.tabMenuClickListener(event, menu.id)}
                >
                  {menu.text}
                </a>
              </li>
            ))}
          </ul>
        </CodeCardTabMenuContainer>
        <CodeCardBody>
          {children}
        </CodeCardBody>
      </div>
    )
  }
}

interface CodeCardTabContentProps {
  children: React.ReactNode,
  id: string
}
export function CodeCardTabContent (props: CodeCardTabContentProps) {
  return (
    <CodeCardTab id={props.id} className='tab-content'>{props.children}</CodeCardTab>
  )
}

const CodeCardBody = styled.div`
  background: #2A2A2A;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding-bottom: 10px;
  color: #ffffff;
  font-family: 'Fira Code';
  font-size: 13px;
`

const CodeCardTabMenuContainer = styled.div`
  background: #595959;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`

const CodeCardTab = styled.div`
  width: 100%;
  display: none;
`
