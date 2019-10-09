import * as React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import * as Prism from 'prismjs'
import Template from './template'
import ApiDocumentationSection from './api-documentation'
import IntroductionSection from './introduction'
import '../../../public/scss/pages/documentation/documentation.scss'

type DocumentationPagePropType = {
  location: any
}
export default class DocumentationPage extends React.Component {

  props: DocumentationPagePropType

  componentDidUpdate () {
    Prism.highlightAll()
  }

  render (): JSX.Element {
    return (
      <Template>
        <Switch>
          <Route key='doc-intro' exact path='/documentation/api-documentation' component={ApiDocumentationSection} />
          <Route key='doc-api' exact path='/documentation' component={IntroductionSection} />
        </Switch>
      </Template>
    )
  }
}
