import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from '../App'

// Sandboxコンポーネントをモック
vi.mock('../components/Sandbox', () => ({
  default: () => <div data-testid="sandbox">Sandbox Component</div>,
}))

describe('App', () => {
  it('ヘッダーが表示される', () => {
    render(<App />)

    const heading = screen.getByRole('heading', { name: /React Sandbox/i })
    expect(heading).toBeInTheDocument()
  })

  it('説明テキストが表示される', () => {
    render(<App />)

    const description = screen.getByText(/Reactを練習できる環境です/i)
    expect(description).toBeInTheDocument()
  })

  it('Sandboxコンポーネントが表示される', () => {
    render(<App />)

    const sandbox = screen.getByTestId('sandbox')
    expect(sandbox).toBeInTheDocument()
  })

  it('app classが適用されている', () => {
    const { container } = render(<App />)

    const appDiv = container.firstChild
    expect(appDiv).toHaveClass('app')
  })

  it('app-header classが適用されている', () => {
    const { container } = render(<App />)

    const header = container.querySelector('.app-header')
    expect(header).toBeInTheDocument()
  })
})
