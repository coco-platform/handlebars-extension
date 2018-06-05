/**
 * @description - handlebars extensions
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
const path = require('path');
const fs = require('fs');
const hbs = require('handlebars');
// internal
const { inline, link } = require('../');
// scope
const options = { encoding: 'utf8' };

describe('@coco-platform/handlebars-extension', () => {
  beforeAll(() => {
    hbs.registerHelper('inline', inline);
    hbs.registerHelper('link', link);
  });

  it('should support inline expression', () => {
    const demo = path.resolve(__dirname, '__fixture__', 'inline.hbs');
    const template = fs.readFileSync(demo, options);
    const context = {
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
        {},
      ],
    };
    const result = hbs.compile(template)(context);

    expect(result).toMatchSnapshot();
  });

  it('should support link expression', () => {
    const demo = path.resolve(__dirname, '__fixture__', 'link.hbs');
    const template = fs.readFileSync(demo, options);
    const context = {
      resources: [
        'https://static.zhihu.com/heifetz/main.app.c994694b7b8c848b345c.css',
        {
          href:
            'https://static.zhihu.com/heifetz/main.app.c994694b7b8c848b345c.css',
        },
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
        {},
      ],
    };
    const result = hbs.compile(template)(context);

    expect(result).toMatchSnapshot();
  });

  it('should return empty with un-supported resource', () => {
    expect(inline(200)).toEqual('');
    expect(link(200)).toEqual('');
  });
});
