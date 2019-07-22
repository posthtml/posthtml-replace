'use strict'

const test = require('ava')
const plugin = require('..')
const {readFileSync} = require('fs')
const path = require('path')
const posthtml = require('posthtml')
const fixtures = path.join(__dirname, 'fixtures')

test('basic', (t) => {
  return compare(t, 'basic')
})

function compare (t, name) {
  const html = readFileSync(path.join(fixtures, `${name}.html`), 'utf8').trim()
  const expected = readFileSync(path.join(fixtures, `${name}.expected.html`), 'utf8').trim()

  return posthtml([plugin([
    {
      match: {
        tag: 'link'
      },
      attrs: {
        href: {
          from: '/assets/css/',
          to: './assets/css/'
        }
      }
    },
    {
      match: {
        tag: 'script'
      },
      attrs: {
        src: {
          from: '/assets/js/',
          to: './assets/js/'
        }
      }
    },
    {
      match: {
        tag: 'img'
      },
      attrs: {
        src: {
          from: '/assets/images/',
          to: './assets/images/'
        }
      }
    }
  ])])
    .process(html)
    .then((res) => {
      console.log(html)
      t.truthy(res.html === expected)
    })
}
