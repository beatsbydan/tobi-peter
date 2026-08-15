import { render } from '@testing-library/react'
import { describe, expect, test } from 'vitest'
import BulletPoint from './BulletPoint'

describe('BulletPoint', () => {
  test('renders a bullet element', () => {
    const { container } = render(<BulletPoint />)
    expect(container.querySelector('.bulletPoint')).toBeInTheDocument()
  })
})
