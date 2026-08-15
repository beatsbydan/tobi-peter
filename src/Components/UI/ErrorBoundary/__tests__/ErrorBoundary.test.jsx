import { render, screen } from '@testing-library/react'
import { describe, expect, test, vi } from 'vitest'
import ErrorBoundary from '../ErrorBoundary'

const Bomb = () => {
  throw new Error('boom')
}

describe('ErrorBoundary', () => {
  test('renders children when nothing throws', () => {
    render(
      <ErrorBoundary>
        <p>All good</p>
      </ErrorBoundary>,
    )
    expect(screen.getByText('All good')).toBeInTheDocument()
  })

  test('renders a fallback instead of crashing when a child throws', () => {
    vi.spyOn(console, 'error').mockImplementation(() => {})
    render(
      <ErrorBoundary>
        <Bomb />
      </ErrorBoundary>,
    )
    expect(screen.getByText('SOMETHING WENT WRONG.')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'RELOAD' })).toBeInTheDocument()
    console.error.mockRestore()
  })
})
