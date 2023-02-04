import ReactMarkdownLib, { Options } from 'react-markdown'
import gfm from 'remark-gfm'
import markdownComponents from './styles'

const ReactMarkdown: React.FC<React.PropsWithChildren<Options>> = (props) => {
  return <ReactMarkdownLib remarkPlugins={[gfm]} components={markdownComponents} {...props} />
}

export default ReactMarkdown
