/**
 * @description - handlebars extensions
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { readFileSync } from 'fs';
import * as hbs from 'handlebars';
import { resolve } from 'path';
// internal
import { inline, link } from '../src';
// scope
const options = { encoding: 'utf8' };

describe('@coco-platform/handlebars-extension', () => {
  beforeAll(() => {
    hbs.registerHelper('inline', inline);
    hbs.registerHelper('link', link);
  });

  it('should support inline expression', () => {
    const demo = resolve(__dirname, '__fixture__', 'inline.hbs');
    const template = readFileSync(demo, options);
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
    const demo = resolve(__dirname, '__fixture__', 'link.hbs');
    const template = readFileSync(demo, options);
    const context = {
      resources: [
        {
          href: 'https://static.zhihu.com/heifetz/main.css',
        },
        {
          rel: 'dns-prefetch',
          href: `//static.zhimg.com`,
          async: true,
        },
        {
          src: 'https://static.zhihu.com/heifetz/main.js',
          defer: true,
          crossorigin: 'anoymous',
        },
        {},
      ],
    };
    const result = hbs.compile(template)(context);

    expect(result).toMatchSnapshot();
  });
});
