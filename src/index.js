const { isWithinView } = require('./within-view')

exports.isWithinView = (props) => isWithinView(props)

exports.useScrollPosition = () => {
  console.error('useScrollPosition uses hooks, please specify which integration you\'re using. See https://github.com/mattias-lonn/within-view/blob/master/README.md#preact--react-integration')
}
