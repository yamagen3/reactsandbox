import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CodeEditor from '../CodeEditor'

describe('CodeEditor', () => {
  it('コードを表示できる', () => {
    const code = 'function App() { return <div>Hello</div> }'
    render(<CodeEditor code={code} onChange={() => {}} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveValue(code)
  })

  it('コードの変更が親コンポーネントに伝わる', async () => {
    const handleChange = vi.fn()
    const user = userEvent.setup()

    render(<CodeEditor code="" onChange={handleChange} />)

    const textarea = screen.getByRole('textbox')
    await user.type(textarea, 'test')

    expect(handleChange).toHaveBeenCalled()
  })

  it('Tabキーで2スペースが挿入される', () => {
    const handleChange = vi.fn()
    const initialCode = 'function'

    render(<CodeEditor code={initialCode} onChange={handleChange} />)

    const textarea = screen.getByRole('textbox')

    // カーソル位置を末尾に設定
    textarea.setSelectionRange(initialCode.length, initialCode.length)

    // Tabキーを押す
    fireEvent.keyDown(textarea, { key: 'Tab', code: 'Tab' })

    // onChangeが2スペースを含むコードで呼ばれたことを確認
    expect(handleChange).toHaveBeenCalledWith('function  ')
  })

  it('プレースホルダーが表示される', () => {
    render(<CodeEditor code="" onChange={() => {}} />)

    const textarea = screen.getByPlaceholderText(/ここにReactのコードを書いてください/)
    expect(textarea).toBeInTheDocument()
  })

  it('テキストエリアのspellCheckが無効になっている', () => {
    render(<CodeEditor code="" onChange={() => {}} />)

    const textarea = screen.getByRole('textbox')
    expect(textarea).toHaveAttribute('spellcheck', 'false')
  })
})
