/**
 * @description - handlebars link expression
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/**
 * @typedef {object} LinkNode
 *
 * @property {string} [href]
 * @property {string} [rel]
 */

/**
 * @typedef {object} ScriptNode
 *
 * @property {string} [src]
 * @property {boolean} [async]
 * @property {boolean} [defer]
 * @property {boolean} [crossorigin]
 */

// package
import { SafeString } from 'handlebars';
import { LinkNode, ResourceType, ScriptNode } from './constant';
import { render } from './render';

/**
 * @param {LinkNode|ScriptNode} resource
 *
 * @return {SafeString|string}
 */
export function link(resource?: ScriptNode | LinkNode): SafeString | string {
  const scriptRegExp = /\.js$/;
  const stylesheetRegExp = /\.css$/;

  switch (true) {
    case scriptRegExp.test((resource as ScriptNode).src):
      return render(ResourceType.script, resource);
    case stylesheetRegExp.test((resource as LinkNode).href):
    case Boolean((resource as LinkNode).rel): // prefetch, preload
      return render(ResourceType.stylesheet, resource);
    default:
      return '';
  }
}
