const { listDiff } = require('./listDiff');
const { TYPE_MAP } = require("./util");
const { INSERT, DELETE, PROPS, TEXT, REORDER } = TYPE_MAP;


class Diff {
  constructor(oldTree, newTree) {
    this.nodeIndex = 0;
    this.patchs = {};
    this.propPatchs = [];
    this.oldTree = oldTree;
    this.newTree = newTree;
    this.oldNode = oldTree;
    this.newNode = newTree;
  }

  dfs() {
    this.patchs[this.nodeIndex] = [];
    if (this.tagNameDiff()) {
      if (this.propsDiff()) {
        this.childrenDiff();
      }
      else {
        // props不同
        this.addPropsPatch();
      }
    }
    else {
      // tagName不同
      this.addReplacePatch();
    }
  }

  diff() {
    this.dfs();
  }

  childrenDiff() {
    listDiff(this.oldNode.children, this.newNode.children);
  }

  tagNameDiff() {
    return this.oldNode.tagName === this.newNode.tagName;
  }

  propsDiff() {
    for (let key in this.oldNode.props) {
      let oldProp = this.oldNode.props[key];
      if (this.newNode.props[key] !== oldProp) {
        // 情况一：新节点更改了属性值
        // 情况二：新节点没有该属性， 值为undefined, 后续删除值为undefined的attr
        this.propPatchs.push({
          key: this.newNode.props[key]
        });
      }
    }

    for (let key in this.newNode.props) {
      if (this.oldNode.props[key] === undefined) {
        // 新增属性
        this.propPatchs.push({
          key: this.newNode.props[key]
        });
      }
    }

    return this.propPatchs.length.length === 0;
  }

  addPropsPatch() {
    this.patchs[this.nodeIndex].push({
      type: PROPS,
      propsPatch: this.propPatchs
    });
    this.propPatchs = [];
  }

  addReplacePatch() {
    const deleteOldNodePatch = {
      type: DELETE
    };
    const insertNewNodePatch = {
      type: INSERT,
      node: this.newNode,
    };
    this.patchs[this.nodeIndex].push(deleteOldNodePatch);
    this.patchs[this.nodeIndex].push(insertNewNodePatch);
  }
}

class Patchs {
  constructor() {
    
  }
}