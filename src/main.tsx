import type {SecondParameter} from 'more-types'
import type {ComponentType, PropsWithChildren} from 'react'
import type {Arrayable} from 'type-fest'

import {createRoot} from 'react-dom/client'

type Options = {
  id?: string
  rootOptions?: SecondParameter<typeof createRoot>
  type?: string
  wrapper?: Arrayable<ComponentType<PropsWithChildren>>
}

const mountRoot = (Component: ComponentType, options?: Options) => {
  const type = options?.type || 'div'
  let app = <Component/>
  const wrappers = Array.isArray(options?.wrapper) ? options.wrapper : [options?.wrapper]
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
}

export default mountRoot
