# element-in-sight

> element-in-sight uses preact/react hook to detect scroll event changes and checking if the wanted element(s) is in sight and appending a class to the element if desired.

### Install
```sh
npm i git+https://github.com/mattias-lonn/element-in-sight.git
```

### Usage
```js
isElementInSight({ y, key, id, ref, class, skipEl, offset, repeatedly, addParentOffset, add, skipCb, cb })
```
```js
useScrollPosition(effect, dependencies, wait)
```

### Preact / React integration
```js
// Preact integration.
import { isElementInSight, useScrollPosition } from 'element-in-sight/preact'

// React integration.
import { isElementInSight, useScrollPosition } from 'element-in-sight/react'
```

## Example

**Add inSight class to element**

```js
import { isElementInSight, useScrollPosition } from 'element-in-sight/**(preact/react)**'

useScrollPosition(({ position }) => {
  const p = {
    y: position.y, // Current scroll position.
    add: 'inSight' // Adds class 'inSight' when in sight.
  }

  // Can be done with either element id, class or ref,
  isElementInSight({ ...p, id: `#helloWorld` })
  isElementInSight({ ...p, class: `.helloWorld` })
  isElementInSight({ ...p, ref: helloWorlRef })

  // Nested classes/ids.
  isElementInSight({ ...p, class: `.helloWorld .inner #first` })

  // By setting repeatedly as false the class will only be added once.
  isElementInSight({ ...p, repeatedly: false })

  // To get the element position and the parent, set addParentOffset to true.
  isElementInSight({ ...p, addParentOffset: true })

  // By setting skipEl to true the element will be skipped.
  isElementInSight({ ...p, skipEl: true})
}, [], 50) // [dependencies], wait timeout.
```

**Call another function when in sight and skip the element on done**

```js
import { isElementInSight, useScrollPosition } from 'element-in-sight/**(preact/react)**'
import { useState } from 'preact/hooks' // react

const [seenAlert, setSeenAlert] = useState(false)

useScrollPosition(({ position }) => {
  const p = { y: position.y, add: 'inSight' }
  isElementInSight({
    y: position.y,
    skipEl: seenAlert,
    class: `.scheduleDemo`,
    offset: 120,
    skipCb: seenAlert,
    cb: () => {
      setSeenAlert(true)
      alert('Dont miss out!')
    }
  })
}, [inSight], 50)
```

**Bonus: Hide header on scroll**
```js
import { useScrollPosition } from 'element-in-sight/**(preact/react)**'
import { useState } from 'preact/hooks' // react

const [hideHeader, setHideHeader] = useState(false)

useScrollPosition(({ position }) => {
  const headerShouldBeHidden = position.y > 250
  if (headerShouldBeHidden !== hideHeader) {
    setHideHeader(headerShouldBeHidden)
  }
}, [hideHeader], null, 100) // Debounce with 100ms.

return (
  <header class={hideHeader && 'hide'}>
    <a href='/'>Element In Sign</a>
  </header>
)
```
