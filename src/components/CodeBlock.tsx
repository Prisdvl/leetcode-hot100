import React, { useMemo } from 'react'

const KEYWORDS = new Set([
  'function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while',
  'new', 'break', 'continue', 'class', 'extends', 'import', 'from', 'export',
  'default', 'void', 'typeof', 'instanceof', 'in', 'of', 'this', 'true',
  'false', 'null', 'undefined', 'async', 'await', 'try', 'catch', 'throw',
  'switch', 'case', 'do',
])

const TOKEN_RE =
  /(\/\/[^\n]*)|('[^'\\]*(?:\\.[^'\\]*)*'|"[^"\\]*(?:\\.[^"\\]*)*")|\b(\d+(?:\.\d+)?)\b|([A-Za-z_$][A-Za-z0-9_$]*)|(\s+)|(.)/g

export const CodeBlock: React.FC<{ code: string }> = ({ code }) => {
  const lines = useMemo(() => {
    const rendered: React.ReactNode[] = []
    let key = 0
    let match: RegExpExecArray | null
    TOKEN_RE.lastIndex = 0
    while ((match = TOKEN_RE.exec(code)) !== null) {
      const [whole, comment, str, num, word, space, punct] = match
      if (comment) {
        rendered.push(<span key={key++} className="tok-com">{comment}</span>)
      } else if (str) {
        rendered.push(<span key={key++} className="tok-str">{str}</span>)
      } else if (num) {
        rendered.push(<span key={key++} className="tok-num">{num}</span>)
      } else if (word) {
        const cls = KEYWORDS.has(word)
          ? 'tok-kw'
          : /^[A-Z]/.test(word)
            ? 'tok-type'
            : 'tok-fn-hint'
        // function-call-ish words: if followed by '(' we treat as fn; here just default
        rendered.push(<span key={key++} className={cls}>{word}</span>)
      } else if (space) {
        rendered.push(<span key={key++}>{space}</span>)
      } else if (punct) {
        rendered.push(<span key={key++} className="tok-punc">{punct}</span>)
      } else {
        rendered.push(<span key={key++}>{whole}</span>)
      }
    }
    return rendered
  }, [code])

  return (
    <pre className="code-block rounded-lg p-4 overflow-x-auto text-xs md:text-sm">
      <code>{lines}</code>
    </pre>
  )
}
