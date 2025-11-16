// ==========================================
// Zustand 実装例
// ==========================================
// 特徴: シンプルで直感的、Hookベース、ボイラープレートが少ない

// --- ストアの定義 ---
// zustandではcreateを使ってストアを作成
// set関数で状態を更新、getで現在の状態を取得可能

import { create } from 'zustand';

const useSurveyStore = create((set, get) => ({
  // 状態
  category: '',
  formData: {},

  // カテゴリごとの質問定義（状態として保持）
  questions: {
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
  },

  // アクション
  setCategory: (category) => set({ category, formData: {} }),

  updateFormData: (id, value) => set((state) => ({
    formData: { ...state.formData, [id]: value }
  })),

  resetForm: () => set({ category: '', formData: {} }),

  // 現在のカテゴリの質問を取得するセレクター
  getCurrentQuestions: () => {
    const state = get();
    return state.category ? state.questions[state.category] : null;
  }
}));

// --- コンポーネント ---
function App() {
  // 必要な状態とアクションだけを取得（自動的に再レンダリング最適化）
  const category = useSurveyStore((state) => state.category);
  const formData = useSurveyStore((state) => state.formData);
  const questions = useSurveyStore((state) => state.questions);
  const setCategory = useSurveyStore((state) => state.setCategory);
  const updateFormData = useSurveyStore((state) => state.updateFormData);

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
    title: {
      color: '#333', textAlign: 'center', marginBottom: '10px',
      fontSize: '24px'
    },
    subtitle: {
      color: '#e91e63', textAlign: 'center', marginBottom: '20px',
      fontSize: '14px', fontWeight: 'bold'
    },
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
      width: '100%', padding: '12px', backgroundColor: '#e91e63',
      color: 'white', border: 'none', borderRadius: '5px',
      fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
    },
    categorySection: {
      backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
      marginTop: '20px', border: '2px solid #e91e63'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📋 動的アンケートフォーム</h1>
      <div style={styles.subtitle}>🐻 Zustand実装版</div>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>興味のあるカテゴリを選択してください:</label>
          <select
            style={styles.select}
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="">-- 選択してください --</option>
            <option value="programming">プログラミング</option>
            <option value="design">デザイン</option>
            <option value="business">ビジネス</option>
          </select>
        </div>

        {category && questions[category] && (
          <div style={styles.categorySection}>
            <h2 style={{ color: '#e91e63', marginBottom: '20px' }}>
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
                    onChange={(e) => updateFormData(q.id, e.target.value)}
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
                    onChange={(e) => updateFormData(q.id, e.target.value)}
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
}
