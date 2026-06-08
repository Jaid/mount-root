import type {SecondParameter} from 'more-types'
import type {ComponentType, ReactElement, ReactNode} from 'react'
import type {Arrayable} from 'type-fest'

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

type Target = ComponentType | ReactElement

type PropsWithChildren = {
  children: ReactNode
}

type Options = {
  id?: string
  rootOptions?: SecondParameter<typeof createRoot>
  strict?: boolean
  type?: string
  wrapper?: Arrayable<ComponentType<PropsWithChildren>>
}

const ensureElement = (Input: Target) => {
  return typeof Input === 'function' ? <Input /> : Input
}
const mountRoot = (Component: Target, options?: Options) => {
  const type = options?.type || 'div'
  let app = ensureElement(Component)
  const wrappers = Array.isArray(options?.wrapper) ? options.wrapper : [options?.wrapper]
  if (options?.strict) {
    wrappers.unshift(StrictMode)
  }
  for (const Wrapper of wrappers.toReversed()) {
    if (!Wrapper) {
      continue
    }
    app = <Wrapper>{app}</Wrapper>
  }
  let rootNode: HTMLElement | null | undefined
  const id = options?.id
  if (id) {
    rootNode = document.getElementById(id)
  } else {
    rootNode = document.body.querySelector(`:scope>${type}`)
  }
  if (!rootNode) {
    rootNode = document.createElement(type)
    if (id) {
      rootNode.id = id
    }
    document.body.append(rootNode)
  }
  const root = createRoot(rootNode, options?.rootOptions)
  root.render(app)
  return root
}

export default mountRoot
