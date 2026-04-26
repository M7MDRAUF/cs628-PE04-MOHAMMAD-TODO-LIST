import { createElement } from 'react'
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, test } from 'vitest'
import App from './App'

afterEach(() => {
  cleanup()
})

function addTask(taskTitle) {
  fireEvent.change(screen.getByLabelText(/todo description/i), {
    target: { value: taskTitle },
  })
  fireEvent.click(screen.getByRole('button', { name: /add task/i }))
}

describe('PE04 ToDo app', () => {
  test('shows the empty state before any tasks are added', () => {
    render(createElement(App))

    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
    expect(screen.getByText(/0 task\(s\)/i)).toBeInTheDocument()
  })

  test('adds a task after submitting the form', () => {
    render(createElement(App))

    addTask('Finish PE04 assignment')

    expect(screen.getByText('Finish PE04 assignment')).toBeInTheDocument()
    expect(screen.getByText(/1 task\(s\)/i)).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(/added task/i)
  })

  test('blocks empty submissions', () => {
    render(createElement(App))

    fireEvent.click(screen.getByRole('button', { name: /add task/i }))
    expect(screen.getByRole('status')).toHaveTextContent(/please enter a task description/i)
    expect(screen.getByText(/no tasks yet/i)).toBeInTheDocument()
  })

  test('deletes the targeted task from a multi-item list', () => {
    render(createElement(App))

    addTask('Finish PE04 assignment')
    addTask('Review the code')
    fireEvent.click(screen.getByRole('button', { name: /delete task review the code/i }))

    expect(screen.queryByText('Review the code')).not.toBeInTheDocument()
    expect(screen.getByText('Finish PE04 assignment')).toBeInTheDocument()
    expect(screen.getByText(/1 task\(s\)/i)).toBeInTheDocument()
    expect(screen.getByRole('status')).toHaveTextContent(/deleted task: review the code/i)
  })
})