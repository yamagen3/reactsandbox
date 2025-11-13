import { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import './Sandbox.css'

const defaultCode = `function App() {
  const [count, setCount] = useState(0);

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>Hello React Sandbox!</h1>
      <p>カウント: {count}</p>
      <button onClick={() => setCount(count + 1)}>
        増やす
      </button>
      <button onClick={() => setCount(count - 1)}>
        減らす
      </button>
      <button onClick={() => setCount(0)}>
        リセット
      </button>
    </div>
  );
}`;

function Sandbox() {
  const [code, setCode] = useState(defaultCode)
  const [error, setError] = useState(null)

  return (
    <div className="sandbox">
      <div className="sandbox-container">
        <div className="editor-panel">
          <div className="panel-header">
            <h2>コードエディタ</h2>
            <button
              className="reset-button"
              onClick={() => setCode(defaultCode)}
              title="デフォルトコードに戻す"
            >
              リセット
            </button>
          </div>
          <CodeEditor code={code} onChange={setCode} />
        </div>
        <div className="preview-panel">
          <div className="panel-header">
            <h2>プレビュー</h2>
          </div>
          <Preview code={code} onError={setError} />
          {error && (
            <div className="error-display">
              <strong>エラー:</strong>
              <pre>{error}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default Sandbox
