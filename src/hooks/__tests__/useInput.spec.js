import { renderHook, act } from '@testing-library/react-hooks'
import { useInput } from '../useInput'

test('should update the value when onChange is called', () => {
  const { result } = renderHook(() => useInput())

  act(() => {
    result.current[1]({target: {value: 'hello'}})
  })

  expect(result.current[0]).toBe('hello')
})