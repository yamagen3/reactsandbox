// ==========================================
// Redux Toolkit 実装例
// ==========================================
// 特徴: 標準化されたパターン、強力なDevTools、大規模アプリに最適

import { configureStore, createSlice } from '@reduxjs/toolkit';
import { Provider, useSelector, useDispatch } from 'react-redux';

// --- Sliceの定義 ---
// Redux Toolkitでは、状態、reducer、actionを1つのsliceにまとめる
// createSliceが自動的にaction creatorとreducerを生成

const surveySlice = createSlice({
  name: 'survey',
  initialState: {
    category: '',
    formData: {},
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
    }
  },
  reducers: {
    // Immerを使用しているので、直接stateを変更できる
    setCategory: (state, action) => {
      state.category = action.payload;
      state.formData = {}; // カテゴリ変更時にリセット
    },
    updateFormData: (state, action) => {
      const { id, value } = action.payload;
      state.formData[id] = value;
    },
    resetForm: (state) => {
      state.category = '';
      state.formData = {};
    }
  }
});

// アクションとreducerをエクスポート
const { setCategory, updateFormData, resetForm } = surveySlice.actions;

// セレクター（状態を取得する関数）
const selectCategory = (state) => state.survey.category;
const selectFormData = (state) => state.survey.formData;
const selectQuestions = (state) => state.survey.questions;
const selectCurrentQuestions = (state) => {
  const category = state.survey.category;
  return category ? state.survey.questions[category] : null;
};

// --- ストアの作成 ---
const store = configureStore({
  reducer: {
    survey: surveySlice.reducer
  }
});

// --- コンポーネント ---
function SurveyForm() {
  // useSelectorで状態を取得
  const category = useSelector(selectCategory);
  const formData = useSelector(selectFormData);
  const questions = useSelector(selectQuestions);
  const currentQuestions = useSelector(selectCurrentQuestions);

  // useDispatchでアクションをディスパッチ
  const dispatch = useDispatch();

  const handleCategoryChange = (newCategory) => {
    dispatch(setCategory(newCategory));
  };

  const handleInputChange = (id, value) => {
    dispatch(updateFormData({ id, value }));
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
      color: '#764abc', textAlign: 'center', marginBottom: '20px',
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
      width: '100%', padding: '12px', backgroundColor: '#764abc',
      color: 'white', border: 'none', borderRadius: '5px',
      fontSize: '16px', cursor: 'pointer', fontWeight: 'bold'
    },
    categorySection: {
      backgroundColor: '#fff', padding: '20px', borderRadius: '8px',
      marginTop: '20px', border: '2px solid #764abc'
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>📋 動的アンケートフォーム</h1>
      <div style={styles.subtitle}>🔄 Redux Toolkit実装版</div>

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
            <h2 style={{ color: '#764abc', marginBottom: '20px' }}>
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

// --- アプリのルート ---
// ReduxではProviderでストアを提供する必要がある
function App() {
  return (
    <Provider store={store}>
      <SurveyForm />
    </Provider>
  );
}
