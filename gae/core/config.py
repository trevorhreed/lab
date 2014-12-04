import json

DEV = True

INDEX_CONTEXT = {
  'test': 'Hey World!',
  'libJs': '/lib-debug.js',
  'libCss': '/lib.css',
  'appJs': '/lab-debug.js',
  'appCss': '/lab.css',
  'settings': json.dumps({
    'version': '0.0.0'
  })
}