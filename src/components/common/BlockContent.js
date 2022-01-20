import BaseBlockContent from "@sanity/block-content-to-react"
import React from "react"
import { Link } from "gatsby"
const serializers = {
  types: {
    block(props) {
      switch (props.node.style) {
        case "h1":
          return <h1 className="text-center">{props.children}</h1>
        case "h2":
          return <h2 className="text-center">{props.children}</h2>
        case "h3":
          return <h3 className="text-center">{props.children}</h3>
        case "h4":
          return <h4 className="text-center">{props.children}</h4>
        case "blockquote":
          return <blockquote>{props.children}</blockquote>
        default:
          return <p>{props.children}</p>
      }
    },
  },
  marks: {
    internalLink: ({ mark, children }) => {
      const { slug = {} } = mark
      const href = `/${slug.current}`
      return <Link to={href}>{children}</Link>
    },
    link: ({ mark, children }) => {
      const { blank, href } = mark
      return blank ? (
        <a href={href} target="_blank" rel="noopener noreferrer" className="text-green underline underline-offset-2">
          {children}
        </a>
      ) : (
        <a href={href}>{children}</a>
      )
    },
  },
}
const BlockContent = ({ blocks }) => (
  <BaseBlockContent blocks={blocks} serializers={serializers} />
)
export default BlockContent