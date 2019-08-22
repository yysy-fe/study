const { oldTreeMock, newTreeMock } = require("./mockASTTree");
const Element = require("./element");
const { diff } = require("./diff")

const cc = (...arr) => {console.log.call(undefined, arr)};

const AST2VirtualDom = (node) => {
  let children = [];
  if (Array.isArray(node.children) && node.children.length > 0) {
    node.children.forEach((v, i) => {
      if (typeof v === 'string') {
        children.push(v);
      } else if (typeof v === 'object') {
        children.push(AST2VirtualDom(v))
      }
    });
  }
  return new Element(node.tagName, node.props, children)
}

let oldTree = AST2VirtualDom(oldTreeMock);
let newTree = AST2VirtualDom(newTreeMock);


const patchs = diff(oldTree, newTree);
console.log('patchs', patchs);

