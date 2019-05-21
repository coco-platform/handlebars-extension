# @coco-platform/handlebars-extension

![Build Status](https://img.shields.io/travis/coco-platform/handlebars-extension/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/coco-platform/handlebars-extension/badge.svg?branch=master)](https://coveralls.io/github/coco-platform/handlebars-extension?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/coco-platform/handlebars-extension.svg)](https://greenkeeper.io/)
![Package Dependency](https://david-dm.org/coco-platform/handlebars-extension.svg?style=flat)
![Package DevDependency](https://david-dm.org/coco-platform/handlebars-extension/dev-status.svg?style=flat)

A specific handlebars extension collection within MVC.

## Usage

```javascript
const { inline, link } = require('@coco-platform/handlebars-extension');
const context = {
  resources: [
    'https://static.zhihu.com/heifetz/main.app.c994694b7b8c848b345c.css',
    {
      rel: 'dns-prefetch',
      href: `//static.zhimg.com`,
    },
    'https://static.zhihu.com/heifetz/main.app.c994694b7b8c848b345c.js',
    {
      src:
        'https://static.zhihu.com/heifetz/main.signflow.6af7025179e6b1979aca.js',
      crossorigin: true,
    },
  ],
  criticals: [
    {
      type: 'stylesheet',
      content:
        '.CloseIcon-icon-2xww{transition:opacity .3s ease-out}.CloseIcon-icon-2xww:hover{opacity:.8}',
    },
    {
      type: 'script',
      content: `(function($) {$(document).ready(() => {});})(jQuery);`,
    },
  ],
};

hbs.registerHelper('inline', inline);
hbs.registerHelper('link', link);
```

```handlebars
{{#each criticals as | critical |}}
  {{inline critical}}
{{/each}}

{{#each resources as | resource |}}
  {{link resource}}
{{/each}}
```

# Licence

MIT
