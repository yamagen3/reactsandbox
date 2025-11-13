import { useEffect, useRef, useState } from 'react'
import './Preview.css'

function Preview({ code, onError }) {
  const iframeRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const runCode = async () => {
      if (!code.trim()) {
        return
      }

      setIsLoading(true)
      onError(null)

      try {
        // Babelでコードをトランスパイル
        const transformedCode = window.Babel.transform(code, {
          presets: ['react'],
        }).code

        // iframeのコンテンツを生成
        const iframeContent = `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="UTF-8">
              <style>
                body {
                  margin: 0;
                  padding: 0;
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
                }
                * {
                  box-sizing: border-box;
                }
              </style>
              <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
              <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
            </head>
            <body>
              <div id="root"></div>
              <script>
                const { useState, useEffect, useRef, useMemo, useCallback, useContext, useReducer } = React;

                window.onerror = function(msg, url, line, col, error) {
                  window.parent.postMessage({
                    type: 'error',
                    error: error ? error.toString() : msg
                  }, '*');
                  return true;
                };

                try {
                  ${transformedCode}

                  const root = ReactDOM.createRoot(document.getElementById('root'));
                  root.render(React.createElement(App));

                  window.parent.postMessage({ type: 'success' }, '*');
                } catch (error) {
                  window.parent.postMessage({
                    type: 'error',
                    error: error.toString()
                  }, '*');
                }
              </script>
            </body>
          </html>
        `

        // iframeを更新
        const iframe = iframeRef.current
        if (iframe) {
          iframe.srcdoc = iframeContent
        }
      } catch (error) {
        onError(error.toString())
        setIsLoading(false)
      }
    }

    // メッセージリスナー
    const handleMessage = (event) => {
      if (event.data.type === 'error') {
        onError(event.data.error)
        setIsLoading(false)
      } else if (event.data.type === 'success') {
        setIsLoading(false)
      }
    }

    window.addEventListener('message', handleMessage)

    // Babelが読み込まれるまで待つ
    const checkBabel = setInterval(() => {
      if (window.Babel) {
        clearInterval(checkBabel)
        runCode()
      }
    }, 100)

    return () => {
      clearInterval(checkBabel)
      window.removeEventListener('message', handleMessage)
    }
  }, [code, onError])

  return (
    <div className="preview">
      {isLoading && (
        <div className="preview-loading">
          <div className="loading-spinner"></div>
          <p>読み込み中...</p>
        </div>
      )}
      <iframe
        ref={iframeRef}
        className="preview-iframe"
        title="Preview"
        sandbox="allow-scripts"
      />
    </div>
  )
}

export default Preview
