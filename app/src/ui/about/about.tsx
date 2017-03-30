import * as React from 'react'

import { Row } from '../lib/row'
import { Button } from '../lib/button'
import { ButtonGroup } from '../lib/button-group'
import { Dialog, DialogContent, DialogFooter } from '../dialog'
import { Octicon, OcticonSymbol } from '../octicons'
import { LinkButton } from '../lib/link-button'

interface IAboutProps {
  /**
   * Event triggered when the dialog is dismissed by the user in the
   * ways described in the Dialog component's dismissable prop.
   */
  readonly onDismissed: () => void

  /**
   * The name of the currently installed (and running) application
   */
  readonly applicationName: string

  /**
   * The currently installed (and running) version of the app.
   */
  readonly applicationVersion: string
}

const releaseNotesUri = 'https://desktop.github.com/release-notes/tng/'

/**
 * A dialog that presents information about the
 * running application such as name and version.
 */
export class About extends React.Component<IAboutProps, void> {

  private closeButton: Button | null = null

  private onCloseButtonRef = (button: Button | null) => {
    this.closeButton = button
  }

  public componentDidMount() {
    // A modal dialog autofocuses the first element that can receive
    // focus (and our dialog even uses the autofocus attribute on its
    // fieldset). In our case that's the release notes link button and
    // we don't want that to have focus so we'll move it over to the
    // close button instead.
    if (this.closeButton) {
      this.closeButton.focus()
    }
  }

  public render() {

    const name = this.props.applicationName
    const version = this.props.applicationVersion
    const releaseNotesLink = <LinkButton uri={releaseNotesUri}>release notes</LinkButton>

    return (
      <Dialog
        id='about'
        onSubmit={this.props.onDismissed}
        onDismissed={this.props.onDismissed}>
        <DialogContent>
          <Row className='logo'>
            <Octicon symbol={OcticonSymbol.markGithub} />
          </Row>
          <h2>{name}</h2>
          <p>
            Version {version} ({releaseNotesLink})
          </p>
        </DialogContent>

        <DialogFooter>
          <ButtonGroup>
            <Button type='submit' ref={this.onCloseButtonRef}>Close</Button>
          </ButtonGroup>
        </DialogFooter>
      </Dialog>
    )
  }
}