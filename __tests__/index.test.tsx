import { render, screen } from '@testing-library/react'
import Home from '../src/pages/index'

describe('Main page render', () => {
  it('renders a title', () => {
    render(<Home />)

    const heading = screen.getByText('Find the closest country')

    expect(heading).toBeInTheDocument()
  })
})
