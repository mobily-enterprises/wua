import { html, css } from 'lit-element'
import { PageElement } from './base/PageElement.js'
import { warning } from './styles/icons.js'
import { shadow2 } from './styles/shared-styles'

class Element extends PageElement {
  static get pagePath () { return '/page-load-error' }
  static get styles () {
    return [
      ...super.styles,
      css`
        :host {
          animation: fadeIn 0.3s ease-in;
          text-align: center;
        }

        div#warningIcon {
          margin: auto;
          height: 64px;
          width: 64px;
          border-radius: 50%;
          box-shadow: ${shadow2};
          padding: 10px;
          background: white;
        }

        div#warningIcon svg {
          height: 64px;
          width: 64px;
          fill: orangered;
        }
      `
    ]
  }

  constructor () {
    super()
    this.pageTitle = 'Loading error'
  }

  render () {
    return html`
      ${super.render()}
      <section>
        <h2>Loading error</h2>
        <div id="warningIcon">
          ${warning}
        </div>
        <p>
          The page you are trying to view couldn't load.
          <button @click="${this._reloadApp}" value="reload"> Reload </button>
        </p>
      </section>
    `
  }

  _reloadApp (e) {
    location.reload()
  }
}

window.customElements.define('<%=vars.elPrefix%>-page-load-error', Element)