/**
 * @description - render AST into string
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
import { SafeString } from 'handlebars';
import { isString, ResourceType, ScriptNode } from './constant';

export function render(type: ResourceType, resource: ScriptNode): SafeString {
  const tag =
    type === ResourceType.script
      ? '<script type="application/javascript"></script>'
      : '<link type="text/css">';
  const props = Reflect.ownKeys(resource)
    .map((key) => [key, Reflect.get(resource, key)])
    .reduce(
      (acc, [key, value]) =>
        isString(value) ? `${acc} ${key}="${value}"` : `${acc} ${key}`,
      ''
    );
  const node = tag.replace('>', `${props}>`);

  return new SafeString(node);
}
