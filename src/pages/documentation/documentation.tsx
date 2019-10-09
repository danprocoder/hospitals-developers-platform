import * as React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import * as Prism from 'prismjs'
import Template from './template'
import ApiDocSpecificLocation from './api-doc-specific-location'
import ApiDocCertainRadius from './api-doc-certain-radius'
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
          <Route key='doc-api-specific-location' exact path='/documentation/api-doc/specific-location' component={ApiDocSpecificLocation} />
          <Route key='doc-api-nearby' exact path='/documentation/api-doc/nearby' component={ApiDocCertainRadius} />
          <Route key='doc-intro' exact path='/documentation' component={IntroductionSection} />
        </Switch>
      </Template>
    )
  }
}
