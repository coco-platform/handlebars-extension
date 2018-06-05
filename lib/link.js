/**
 * @description - handlebars link expression
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
const _ = require('lodash');
const {
  SafeString,
  Utils: { escapeExpression },
} = require('handlebars');

/**
 * @typedef {object} LinkResource
 *
 * @property {string} [src]
 * @property {string} [href]
 * @property {string} [rel]
 * @property {boolean} [async]
 * @property {boolean} [defer]
 * @property {boolean} [crossorigin]
 */

function script(resource) {
  if (_.isString(resource)) {
    return new SafeString(
      `<script type="application/javascript" src="${escapeExpression(
        resource
      )}"></script>`
    );
  }

  if (_.isPlainObject(resource)) {
    const { src, async, defer, crossorigin } = resource;
    const addition = [
      async ? 'async' : '',
      defer ? 'defer' : '',
      crossorigin ? 'crossorigin="anonymous"' : '',
    ];
    const wrapper = {
      src: escapeExpression(src),
      addition: addition.filter((item) => item).join(' '),
    };

    return new SafeString(
      `<script type="application/javascript" src="${wrapper.src}" ${
        wrapper.addition
      }></script>`
    );
  }

  return '';
}

function styleSheet(stylesheet) {
  if (_.isString(stylesheet)) {
    return new SafeString(
      `<link rel="stylesheet" href="${escapeExpression(stylesheet)}">`
    );
  }

  if (_.isPlainObject(stylesheet)) {
    const { rel, href } = stylesheet;
    const wrapper = {
      rel: _.isString(rel) ? escapeExpression(rel) : 'stylesheet',
      href: escapeExpression(href),
    };

    return new SafeString(`<link rel="${wrapper.rel}" href="${wrapper.href}">`);
  }

  return '';
}

/**
 * @param {LinkResource} resource
 */
function link(resource) {
  const scriptRegExp = /\.js$/;
  const stylesheetRegExp = /\.css$/;
  const state = { result: '' };

  switch (true) {
    case scriptRegExp.test(resource):
    case scriptRegExp.test(resource.src):
      state.result = script(resource);
      break;
    case stylesheetRegExp.test(resource):
    case stylesheetRegExp.test(resource.href):
    case Boolean(resource.rel):
      state.result = styleSheet(resource);
      break;
    default:
      state.result = '';
  }

  return state.result ? new SafeString(state.result) : '';
}

module.exports = link;
