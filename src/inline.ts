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
import { SafeString, Utils } from 'handlebars';
import { InlineResource, Medium, ResourceType } from './constant';
// scope
const { escapeExpression } = Utils;

/**
 * @param {InlineResource} resource
 *
 * @return {SafeString|string}
 */
export function inline(resource?: InlineResource): SafeString | string {
  const state: Medium = { result: [] };
  const { type, content } = resource;

  switch (type) {
    case ResourceType.stylesheet:
      state.result = [
        '<style type="text/css">',
        escapeExpression(content),
        '</style>',
      ];
      break;
    case ResourceType.script:
      state.result = [
        '<script type="application/javascript">',
        escapeExpression(content),
        '</script>',
      ];
      break;
  }

  return state.result.length ? new SafeString(state.result.join('\n')) : '';
}
