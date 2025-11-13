import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Sandbox from '../Sandbox'

// Previewコンポーネントをモック
vi.mock('../Preview', () => ({
  default: ({ code, onError }) => (
    <div data-testid="preview">
      <div data-testid="preview-code">{code}</div>
      <button onClick={() => onError('Test error')}>Trigger Error</button>
    </div>
  ),
}))

// CodeEditorコンポーネントをモック
vi.mock('../CodeEditor', () => ({
  default: ({ code, onChange }) => (
    <textarea
      data-testid="code-editor"
      value={code}
      onChange={(e) => onChange(e.target.value)}
    />
  ),
}))

describe('Sandbox', () => {
  it('デフォルトコードが表示される', () => {
    render(<Sandbox />)

    const editor = screen.getByTestId('code-editor')
    expect(editor.value).toContain('Hello React Sandbox!')
  })

  it('CodeEditorとPreviewが表示される', () => {
    render(<Sandbox />)

    expect(screen.getByTestId('code-editor')).toBeInTheDocument()
    expect(screen.getByTestId('preview')).toBeInTheDocument()
  })

  it('リセットボタンが表示される', () => {
    render(<Sandbox />)

    const resetButton = screen.getByRole('button', { name: /リセット/i })
    expect(resetButton).toBeInTheDocument()
  })

  it('リセットボタンでコードがデフォルトに戻る', async () => {
    const user = userEvent.setup()
    render(<Sandbox />)

    const editor = screen.getByTestId('code-editor')
    const resetButton = screen.getByRole('button', { name: /リセット/i })

    // コードを変更
    await user.clear(editor)
    await user.type(editor, 'new code')
    expect(editor.value).toBe('new code')

    // リセット
    await user.click(resetButton)
    expect(editor.value).toContain('Hello React Sandbox!')
  })

  it('エラーが発生したときにエラーメッセージが表示される', async () => {
    const user = userEvent.setup()
    render(<Sandbox />)

    // エラーをトリガー
    const triggerButton = screen.getByText('Trigger Error')
    await user.click(triggerButton)

    await waitFor(() => {
      expect(screen.getByText(/エラー:/i)).toBeInTheDocument()
      expect(screen.getByText('Test error')).toBeInTheDocument()
    })
  })

  it('コードの変更がPreviewに反映される', async () => {
    const user = userEvent.setup()
    render(<Sandbox />)

    const editor = screen.getByTestId('code-editor')
    const preview = screen.getByTestId('preview-code')

    // デフォルトコードが表示されている
    expect(preview.textContent).toContain('Hello React Sandbox!')

    // コードを変更
    await user.clear(editor)
    await user.type(editor, 'Updated Code')

    await waitFor(() => {
      expect(preview.textContent).toBe('Updated Code')
    })
  })

  it('パネルヘッダーが表示される', () => {
    render(<Sandbox />)

    expect(screen.getByText('コードエディタ')).toBeInTheDocument()
    expect(screen.getByText('プレビュー')).toBeInTheDocument()
  })
})
