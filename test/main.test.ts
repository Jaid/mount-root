import {expect, test} from 'bun:test'

const {default: mountRoot} = await import('#src/main.tsx')

test('should run', () => {
  const result = mountRoot()
  expect(result).toBe('mount-root') // TODO Test actual functionality
})
