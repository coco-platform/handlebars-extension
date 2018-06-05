/**
 * @description - handlebars inline expression
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @typedef {object} InlineResource
 *
 * @property {string} type - stylesheet, script only
 * @property {string} content
 */

// package
const {
  SafeString,
  Utils: { escapeExpression },
} = require('handlebars');

/**
 * @param {InlineResource} resource
 */
function inline(resource) {
  const state = { result: '' };
  const { type, content } = resource;

  switch (type) {
    case 'stylesheet':
      state.result = `<style type="text/css">\n${escapeExpression(
        content
      )}\n</style>`;
      break;
    case 'script':
      state.result = `<script type="application/javascript">\n${escapeExpression(
        content
      )}\n</script>`;
      break;
    default:
      state.result = '';
  }

  return state.result ? new SafeString(state.result) : '';
}

module.exports = inline;
