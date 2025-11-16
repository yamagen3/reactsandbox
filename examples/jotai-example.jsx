// ==========================================
// Jotai 実装例
// ==========================================
// 特徴: アトミックな状態管理、Recoilライクなシンプルさ、ボトムアップアプローチ

import { atom, useAtom, useAtomValue, useSetAtom } from 'jotai';

// --- Atomの定義 ---
// jotaiでは小さな状態単位（atom）を定義
// atomは独立した状態の単位で、必要に応じて組み合わせる

// プリミティブなatom（読み書き可能）
const categoryAtom = atom('');
const formDataAtom = atom({});

// 読み取り専用atom（定数データ）
const questionsAtom = atom({
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
});

// 派生atom（他のatomから計算される）
const currentQuestionsAtom = atom((get) => {
  const category = get(categoryAtom);
  const questions = get(questionsAtom);
  return category ? questions[category] : null;
});

// 書き込み専用atom（アクション）
const setCategoryAtom = atom(
  null, // 読み取り時の値（nullで読み取り不可）
  (get, set, newCategory) => {
    set(categoryAtom, newCategory);
    set(formDataAtom, {}); // カテゴリ変更時にフォームをリセット
  }
);

const updateFormDataAtom = atom(
  null,
  (get, set, { id, value }) => {
    const currentData = get(formDataAtom);
    set(formDataAtom, { ...currentData, [id]: value });
  }
);

// --- コンポーネント ---
function App() {
  // useAtom: 読み書き両方
  const [category, setCategory] = useAtom(categoryAtom);
  const [formData, setFormData] = useAtom(formDataAtom);

  // useAtomValue: 読み取りのみ
  const questions = useAtomValue(questionsAtom);
  const currentQuestions = useAtomValue(currentQuestionsAtom);

  // useSetAtom: 書き込みのみ（再レンダリング最適化）
  const setCategoryAction = useSetAtom(setCategoryAtom);
  const updateFormData = useSetAtom(updateFormDataAtom);

  const handleCategoryChange = (newCategory) => {
    setCategoryAction(newCategory);
  };

  const handleInputChange = (id, value) => {
    updateFormData({ id, value });
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
    title: {
      color: '#333', textAlign: 'center', marginBottom: '10px',
      fontSize: '24px'
    },
    subtitle: {
      color: '#2196F3', textAlign: 'center', marginBottom: '20px',
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
      width: '100%', padding: '12px', backgroundColor: '#2196F3',
      color: 'white', border: 'none', borderRadius: '5px',
      fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
    },
    categorySection: {
      backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
      marginTop: '20px', border: '2px solid #2196F3'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📋 動的アンケートフォーム</h1>
      <div style={styles.subtitle}>⚛️ Jotai実装版</div>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label style={styles.label}>興味のあるカテゴリを選択してください:</label>
          <select
            style={styles.select}
            value={category}
            onChange={(e) => handleCategoryChange(e.target.value)}
          >
            <option value="">-- 選択してください --</option>
            <option value="programming">プログラミング</option>
            <option value="design">デザイン</option>
            <option value="business">ビジネス</option>
          </select>
        </div>

        {category && currentQuestions && (
          <div style={styles.categorySection}>
            <h2 style={{ color: '#2196F3', marginBottom: '20px' }}>
              {category === 'programming' && 'プログラミングに関する質問'}
              {category === 'design' && 'デザインに関する質問'}
              {category === 'business' && 'ビジネスに関する質問'}
            </h2>

            {currentQuestions.map(q => (
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
}
