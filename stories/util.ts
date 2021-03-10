import { Wrapper } from '@vue/test-utils'

export type CheckType = {
  [key: string]: Boolean | String | Number
}

export type BooleanObj = {
  [key: string]: Boolean
}

export type CheckObjType = {
  [key: string]: BooleanObj
}

export type CheckEventType = {
  [key: string]: CheckObjType
}

function checkProps (wrapper: Wrapper<any>, props: CheckType) {
  const keys = Object.keys(props)
  const count = keys.length
  for (let i = 0; i < count; i++) {
    const key = keys[i]
    expect(wrapper.props()[key]).toBe(props[key])
  }
}

function checkSlots (wrapper: Wrapper<any>, slots: CheckType) {
  const keys = Object.keys(slots)
  const count = keys.length
  for (let i = 0; i < count; i++) {
    const key = keys[i]
    expect(wrapper.find(key).text().trim()).toBe(slots[key])
  }
}

function checkElms (wrapper: Wrapper<any>, elms: CheckType) {
  const keys = Object.keys(elms)
  const count = keys.length
  for (let i = 0; i < count; i++) {
    const key = keys[i]
    expect(wrapper.contains(key)).toBe(elms[key])
  }
}

function checkClass (wrapper: Wrapper<any>, classes: CheckObjType) {
  const keys = Object.keys(classes)
  const count = keys.length
  for (let i = 0; i < count; i++) {
    const key = keys[i]
    const subObj = classes[key]
    const subKeys = Object.keys(subObj)
    const elmClass = wrapper.find(key).classes()
    for (let j = 0; j < subKeys.length; j++) {
      const subKey = subKeys[j]
      const subValue = subObj[subKey]
      if (subValue === true) {
        expect(elmClass).toContain(subKey)
      } else {
        expect(elmClass).not.toContain(subKey)
      }
    }
  }
}

function checkEvent (wrapper: Wrapper<any>, events: CheckEventType) {
  const keys = Object.keys(events)
  const count = keys.length
  for (let i = 0; i < count; i++) {
    // button
    const key = keys[i]
    const elm = wrapper.find(key)
    const subObj = events[key]
    const subKeys = Object.keys(subObj)

    for (let j = 0; j < subKeys.length; j++) {
      // events
      const subKey = subKeys[j]
      const emitEvents = subObj[subKey]
      const emitEventsKeys = Object.keys(emitEvents)

      elm.trigger(subKey)

      for (let k = 0; k < emitEventsKeys.length; k++) {
        const name = emitEventsKeys[k]
        const isCall = emitEvents[name]
        const emit = expect(wrapper.emitted(name))
        if (isCall) {
          emit.toHaveLength(1)
        } else {
          emit.toBe(undefined)
        }
      }
    }
  }
}

function checkAll (wrapper: Wrapper<any>, elms: CheckType, props: CheckType, slots: CheckType, classes: CheckObjType, events: CheckEventType) {
  it('element test', () => {
    checkElms(wrapper, elms)
  })
  it('props test', () => {
    checkProps(wrapper, props)
  })
  it('slot test', () => {
    checkSlots(wrapper, slots)
  })
  it('class test', () => {
    checkClass(wrapper, classes)
  })
  it('event test', () => {
    checkEvent(wrapper, events)
  })
}

export const CheckFunc = {
  checkAll,
  checkEvent,
  checkClass,
  checkElms,
  checkSlots,
  checkProps
}

let cssFile: string = ''

export function changeMode (mode: Boolean): Boolean {
  const nameFile: string = mode ? 'theme_dark.css' : 'theme.css'
  if (cssFile !== nameFile) {
    cssFile = nameFile
    let isChangeCss = false
    for (let i:number = 0; i < document.styleSheets.length; i++) {
      const theme = document.styleSheets[i] as CSSStyleSheet
      if ((<HTMLElement>theme.ownerNode).id === cssFile) {
        theme.disabled = false
        isChangeCss = true
      } else if ((<CSSStyleRule>theme.cssRules[0]).selectorText === ':root') {
        theme.disabled = true
      }
    }
    if (isChangeCss === false) {
      import(`../../public/css/${cssFile}`).then(instance => {
        const count: number = document.styleSheets.length - 1
        const theme = document.styleSheets[count] as CSSStyleSheet
        (<HTMLElement>(theme.ownerNode)).id = cssFile
      })
    }
  }
  return mode
}
