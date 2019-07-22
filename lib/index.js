'use strict'

module.exports = function (params = [], opts = {}) {
  if (params.length === 0) {
    throw new Error('{params} is required and must be [] type.')
  }
  opts = Object.assign({}, opts)
  return function posthtmlReplace (tree) {
    params.forEach(function (param) {
      let match = param.match
      let attrs = param.attrs
      tree.match(match, (node) => {
        if (typeof attrs !== 'undefined' && Object.keys(attrs).length > 0) {
          Object.keys(attrs).forEach(function (name) {
            let attr = attrs[name]
            if (typeof attr === 'function') {
              node.attrs[name] = attr(node.attrs[name], node)
            } else if (typeof attr === 'function') {
              node.attrs[name] = node.attrs[name].replace(attr.from, attr.to)
            } else {
            }
          })
        }
        return node
      })
    })
    return tree
  }
}
