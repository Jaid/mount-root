import type {SecondParameter} from 'more-types'
import type {ComponentType, PropsWithChildren} from 'react'
import type {Arrayable} from 'type-fest'

import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'

type Options = {
  id?: string
  rootOptions?: SecondParameter<typeof createRoot>
  strict?: boolean
  type?: string
  wrapper?: Arrayable<ComponentType<PropsWithChildren>>
}

const mountRoot = async (Component: ComponentType, options?: Options) => {
  const type = options?.type || 'div'
  let app = <Component/>
  const wrappers = Array.isArray(options?.wrapper) ? options.wrapper : [options?.wrapper]
  if (options?.strict) {
    wrappers.push(StrictMode)
  }
  for (const Wrapper of wrappers) {
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
