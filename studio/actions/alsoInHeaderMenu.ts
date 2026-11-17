import type {DocumentActionComponent} from 'sanity'

/**
 * Lists an action in the document's header "⋯" menu as well as the footer, where Sanity puts every
 * action but the main one behind a small "⋯" button that's easy to miss.
 */
export function alsoInHeaderMenu(Action: DocumentActionComponent): DocumentActionComponent {
  const Wrapped: DocumentActionComponent = (props) => {
    const description = Action(props)
    return description && {...description, group: ['default', 'paneActions']}
  }
  Wrapped.action = Action.action
  Wrapped.displayName = `AlsoInHeaderMenu(${Action.displayName ?? Action.name})`
  return Wrapped
}
