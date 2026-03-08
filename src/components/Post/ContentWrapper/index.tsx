import { ReactNode, Children } from 'react'
import ReactMarkdown from 'react-markdown'
import {
  PostBlockQuote,
  PostCode,
  PostH1,
  PostH2,
  PostH3,
  PostH4,
  PostH5,
  PostH6,
  PostHR,
  PostImage,
  PostLink,
  PostOL,
  PostParagraph,
  PostPre,
  PostUL,
  Tag,
} from './styles'
import rehypeHighlight from 'rehype-highlight'
import 'highlight.js/styles/androidstudio.css'
import remarkGfm from 'remark-gfm'

interface ContentWrapperProps {
  children: ReactNode
}

export function ContentWrapper({ children }: ContentWrapperProps) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[[rehypeHighlight, { detect: true }]]}
      components={{
        img: ({ src, alt }) => {
          if (!src || typeof src !== 'string') return null

          return <PostImage src={src} alt={alt ?? ''} />
        },

        a: ({ href, children }) => (
          <PostLink href={href} target="_blank" rel="noopener noreferrer">
            {children}
          </PostLink>
        ),

        pre: ({ children }) => <PostPre>{children}</PostPre>,

        code: ({ className, children, ...props }) => (
          <PostCode className={className} {...props}>
            {children}
          </PostCode>
        ),

        ul: ({ children }) => <PostUL>{children}</PostUL>,

        ol: ({ children }) => <PostOL>{children}</PostOL>,

        hr: () => <PostHR />,

        h1: ({ children }) => <PostH1>{children}</PostH1>,
        h2: ({ children }) => <PostH2>{children}</PostH2>,
        h3: ({ children }) => <PostH3>{children}</PostH3>,
        h4: ({ children }) => <PostH4>{children}</PostH4>,
        h5: ({ children }) => <PostH5>{children}</PostH5>,
        h6: ({ children }) => <PostH6>{children}</PostH6>,

        blockquote: ({ children }) => (
          <PostBlockQuote>{children}</PostBlockQuote>
        ),

        p: ({ children }) => {
          const processChildren = (kids: ReactNode): ReactNode => {
            return Children.map(kids, (child) => {
              if (typeof child !== 'string') return child

              return child.split(/(\s+)/).map((part, i) => {
                if (/^#\w+/.test(part)) {
                  const tag = part.slice(1)
                  return (
                    <Tag key={i} href={`/?tag=${tag}`}>
                      {part}
                    </Tag>
                  )
                }
                return part
              })
            })
          }

          return <PostParagraph>{processChildren(children)}</PostParagraph>
        },
      }}
    >
      {children?.toString()}
    </ReactMarkdown>
  )
}
