import { Prop, StartTagToken, EndTagToken, TextToken, BlankToken, Token } from './base';

class Node {
  name: string;
  type: string;
  props?: Prop[];
  selfClosed?: boolean;
  childrenNodes?: Node[];

  constructor(initProps) {
    const { name, type, props, selfClosed, childrenNodes } = initProps;
    this.name = name;
    this.type = type;
    props && (this.props = props);
    selfClosed && (this.selfClosed = selfClosed);
    childrenNodes && (this.childrenNodes = childrenNodes);
  }

  appendChild(node: Node = null): void {
    if (node && this.childrenNodes) {
      this.childrenNodes.push(node);
    } else if (!this.childrenNodes && node) {
      this.childrenNodes = [node];
    }
  }
}


class HTMLSyntaticalParser {
  tokens: [];
  stack: Node[];
  node: Node | null;

  constructor(tokens: []) {
    this.tokens = tokens;
    this.stack = [
      new Node({
        name: 'Document',
        type: 'document',
        childrenNodes: []
      })
    ];
    this.node = null;
  }

  

  parse() {
    console.log('this.tokens', this.tokens)
    this.tokens.forEach((v: Token, i) => {
      if (v instanceof StartTagToken) {
        const node = new Node(v);
        this.stack.unshift(node);
      } else if (v instanceof TextToken) {
        if (this.stack[0] instanceof TextToken) {
          this.stack[0].name = this.stack[0].name + v.name;
        }
        else {
          const node = new Node(v);
          this.stack.unshift(node);
        }
      } else if (v instanceof EndTagToken) {
        
      }
    });
  }
}

export {
  HTMLSyntaticalParser
}