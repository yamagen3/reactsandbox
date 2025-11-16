import { useState, useEffect } from 'react'
import CodeEditor from './CodeEditor'
import Preview from './Preview'
import './Sandbox.css'

const defaultCode = `function App() {
  const [category, setCategory] = useState('');
  const [formData, setFormData] = useState({});

  // カテゴリごとの質問定義
  const questions = {
    programming: [
      { id: 'language', label: '好きなプログラミング言語', type: 'select',
        options: ['JavaScript', 'Python', 'Java', 'C++', 'Ruby'] },
      { id: 'experience', label: '経験年数', type: 'number' },
      { id: 'framework', label: '使用フレームワーク', type: 'text' }
    ],
    design: [
      { id: 'tool', label: '使用しているデザインツール', type: 'select',
        options: ['Figma', 'Adobe XD', 'Sketch', 'Photoshop', 'Illustrator'] },
      { id: 'specialty', label: '得意分野', type: 'text' },
      { id: 'portfolio', label: 'ポートフォリオURL', type: 'url' }
    ],
    business: [
      { id: 'industry', label: '業種', type: 'select',
        options: ['IT', '製造', '金融', '医療', 'サービス'] },
      { id: 'position', label: '役職', type: 'text' },
      { id: 'employees', label: '従業員数', type: 'number' }
    ]
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
    setFormData({});
  };

  const handleInputChange = (id, value) => {
    setFormData({ ...formData, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('送信内容:\\n' + JSON.stringify({ category, ...formData }, null, 2));
  };

  const styles = {
    container: {
      maxWidth: '600px', margin: '20px auto', padding: '30px',
      fontFamily: 'Arial, sans-serif', backgroundColor: '#f5f5f5',
      borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
    },
    title: { color: '#333', textAlign: 'center', marginBottom: '30px' },
    formGroup: { marginBottom: '20px' },
    label: { display: 'block', marginBottom: '8px', fontWeight: 'bold', color: '#555' },
    input: {
      width: '100%', padding: '10px', fontSize: '14px', borderRadius: '5px',
      border: '1px solid #ddd', boxSizing: 'border-box'
    },
    select: {
      width: '100%', padding: '10px', fontSize: '14px', borderRadius: '5px',
      border: '1px solid #ddd', boxSizing: 'border-box'
    },
    button: {
      width: '100%', padding: '12px', backgroundColor: '#4CAF50',
      color: 'white', border: 'none', borderRadius: '5px',
      fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
    },
    categorySection: {
      backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
      marginTop: '20px', border: '2px solid #4CAF50'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📋 動的アンケートフォーム</h1>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>興味のあるカテゴリを選択してください:</label>
          <select
            style={styles.select}
            value={category}
            onChange={handleCategoryChange}
          >
            <option value="">-- 選択してください --</option>
            <option value="programming">プログラミング</option>
            <option value="design">デザイン</option>
            <option value="business">ビジネス</option>
          </select>
        </div>

        {category && questions[category] && (
          <div style={styles.categorySection}>
            <h2 style={{ color: '#4CAF50', marginBottom: '20px' }}>
              {category === 'programming' && 'プログラミングに関する質問'}
              {category === 'design' && 'デザインに関する質問'}
              {category === 'business' && 'ビジネスに関する質問'}
            </h2>

            {questions[category].map(q => (
              <div key={q.id} style={styles.formGroup}>
                <label style={styles.label}>{q.label}:</label>
                {q.type === 'select' ? (
                  <select
                    style={styles.select}
                    value={formData[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                  >
                    <option value="">-- 選択してください --</option>
                    {q.options.map(opt => (
                      <option key={opt} value={opt}>{opt}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    style={styles.input}
                    type={q.type}
                    value={formData[q.id] || ''}
                    onChange={(e) => handleInputChange(q.id, e.target.value)}
                  />
                )}
              </div>
            ))}

            <button type="submit" style={styles.button}>送信</button>
          </div>
        )}
      </form>
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
