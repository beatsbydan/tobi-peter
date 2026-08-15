import { render, screen, waitForElementToBeRemoved } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import Dropdown from '../Dropdown'

const countries = ['Nigeria', 'Ghana', 'Kenya', 'South Africa', 'Spain']

describe('Dropdown', () => {
  test('typing filters the visible options', async () => {
    const user = userEvent.setup()
    render(<Dropdown list={countries} onClick={vi.fn()} />)

    await user.click(screen.getByRole('button'))
    await user.type(screen.getByRole('textbox', { name: /search options/i }), 'ni')

    expect(screen.getByRole('option', { name: 'Nigeria' })).toBeInTheDocument()
    expect(screen.queryByRole('option', { name: 'Ghana' })).not.toBeInTheDocument()
  })

  test('shows a no-matches message when nothing matches', async () => {
    const user = userEvent.setup()
    render(<Dropdown list={countries} onClick={vi.fn()} />)

    await user.click(screen.getByRole('button'))
    await user.type(screen.getByRole('textbox', { name: /search options/i }), 'zzz')

    expect(screen.getByText('No matches')).toBeInTheDocument()
  })

  test('selecting a filtered option calls onClick and closes the panel', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Dropdown list={countries} onClick={onClick} />)

    await user.click(screen.getByRole('button'))
    await user.type(screen.getByRole('textbox', { name: /search options/i }), 'gh')
    await user.click(screen.getByRole('option', { name: 'Ghana' }))

    expect(onClick).toHaveBeenCalledWith('Ghana')
    // AnimatePresence plays an exit transition before actually unmounting — wait for that.
    await waitForElementToBeRemoved(() => screen.queryByRole('listbox'))
  })

  test('Escape closes the dropdown', async () => {
    const user = userEvent.setup()
    render(<Dropdown list={countries} onClick={vi.fn()} />)

    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('listbox')).toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitForElementToBeRemoved(() => screen.queryByRole('listbox'))
  })

  test('Enter in the search box selects the first filtered match', async () => {
    const user = userEvent.setup()
    const onClick = vi.fn()
    render(<Dropdown list={countries} onClick={onClick} />)

    await user.click(screen.getByRole('button'))
    await user.type(screen.getByRole('textbox', { name: /search options/i }), 'south')
    await user.keyboard('{Enter}')

    expect(onClick).toHaveBeenCalledWith('South Africa')
  })

  test('re-opening after a search shows the full list again', async () => {
    const user = userEvent.setup()
    render(<Dropdown list={countries} onClick={vi.fn()} />)

    await user.click(screen.getByRole('button'))
    await user.type(screen.getByRole('textbox', { name: /search options/i }), 'gh')
    expect(screen.queryByRole('option', { name: 'Nigeria' })).not.toBeInTheDocument()

    await user.keyboard('{Escape}')
    await waitForElementToBeRemoved(() => screen.queryByRole('listbox'))

    await user.click(screen.getByRole('button'))
    expect(screen.getByRole('option', { name: 'Nigeria' })).toBeInTheDocument()
  })
})
