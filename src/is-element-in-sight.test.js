/* eslint-env jest */
const { isElementInSight } = require('./element-in-sight')

const htmlData = `<html>
  <body style="padding: 0; margin: 0;">
    <header id="header" style="height: 50px; background: green;" data-offsetTop="0" data-innerheight="500">
      <a href='/'>Element In Sign</a>
    </header>
    <div class="heroHeader" style="height: calc(100vh - 50px); background: grey;" data-offsetTop="50" data-innerheight="500"></div>
    <div class="ADS" style="height: 120px; background: orange;" data-offsetTop="500" data-innerheight="500"></div>
    <div class="helloWorld" style="height: 150px; background: red;" data-offsetTop="620" data-innerheight="500">
      <span>Hello world!</span>
    </div>
    <footer id="footer" style="height: 70px; background: lightblue;" data-offsetTop="770" data-innerheight="500">
      <span>By <a href="https://github.com/mattias-lonn">mattias-lonn</a></span>
    </footer>
  </body>
</html>`

describe('isElementInSight', () => {
  const consoleSpy = jest
    .spyOn(console, 'error')
    .mockImplementation((err) => err)

  document.body.innerHTML = htmlData

  test('Return "Element class was not found" error', () => {
    isElementInSight({ testDocument: document, class: '.unkowndWorld' })
    expect(consoleSpy).toHaveBeenCalledWith('isElementInSight err: Element \'.unkowndWorld\' was not found.')
  })

  test('Return "Element ref was not found" error', () => {
    const helloWorldRef = null

    isElementInSight({ testDocument: document, ref: helloWorldRef })
    expect(consoleSpy).toHaveBeenCalledWith('isElementInSight err: Element using ref was not found.')
  })

  test('Returns false as the \'.helloWorld\' element is not in sight yet.', () => {
    expect(isElementInSight({ testDocument: document, y: 0, class: '.helloWorld', offset: 0 }))
      .toBeFalsy()
  })

  test('Returns true as the \'.helloWorld\' element is in sight.', () => {
    expect(isElementInSight({ testDocument: document, y: 128, class: '.helloWorld', offset: 0 }))
      .toBeTruthy()
  })

  test('Returns false as the \'.helloWorld\' element is not yet in sight because of offset.', () => {
    expect(isElementInSight({ testDocument: document, y: 128, class: '.helloWorld', offset: 20 }))
      .toBeFalsy()
  })

  test('Returns true as the \'#footer\' element is in sight.', () => {
    expect(isElementInSight({ testDocument: document, y: 283, id: 'footer', offset: 0 }))
      .toBeTruthy()
  })

  test('Returns false as the \'.helloWorld\' element is not yet in sight because of offset.', () => {
    expect(isElementInSight({ testDocument: document, y: 283, id: 'footer', offset: 20 }))
      .toBeFalsy()
  })

  test('Returns true after adding class \'inSight\'.', () => {
    document.getElementsByClassName('helloWorld')[0].classList = 'helloWorld inSight'
    isElementInSight({ testDocument: document, y: 128, class: '.helloWorld', offset: 0, add: 'inSight' })
    expect(document.getElementsByClassName('helloWorld')[0].classList.contains('inSight')).toBe(true)
  })

  test('Returns false after removing class \'inSight\'.', () => {
    document.getElementsByClassName('helloWorld')[0].classList = 'helloWorld inSight'
    isElementInSight({ testDocument: document, y: 10, class: '.helloWorld', offset: 0, add: 'inSight' })
    expect(document.getElementsByClassName('helloWorld')[0].classList.contains('inSight')).toBe(false)
  })
})
