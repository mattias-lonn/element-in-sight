const { isElementInSight } = require('./element-in-sight')

exports.isElementInSight = (props) => isElementInSight(props)

exports.useScrollPosition = () => {
  console.error('useScrollPosition uses hooks, please specify which integration you\'re using. See https://github.com/mattias-lonn/element-in-sight/blob/master/README.md#preact--react-integration')
}
