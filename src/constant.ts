/**
 * @description - declare specific types
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

/* tslint:disable:max-classes-per-file */

export class Medium {
  public result: string[];
}

export enum ResourceType {
  stylesheet = 'stylesheet',
  script = 'script',
}

export class InlineResource {
  public type: ResourceType;
  public content: string;
}

export class ScriptNode {
  public type: string;
  public src?: string;
  public async?: string;
  public defer?: string;
  public crossorigin?: string;
}

export class LinkNode {
  public type: string;
  public href?: string;
  public rel?: string;
}

export function isString(value: any) {
  return typeof value === 'string';
}
