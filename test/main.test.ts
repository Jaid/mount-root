import {expect, test} from 'bun:test'

const {default: mountRoot} = await import('#src/main.ts')

test('should run', () => {
  const result = mountRoot()
  expect(result).toBe('mount-root') // TODO Test actual functionality
})
