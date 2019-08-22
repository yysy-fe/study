const { INSERT, DELETE, PROPS, TEXT, REORDER } = TYPE_MAP;

class ListDiff {
  constructor(newList, oldList) {
    this.newList = newList;
    this.oldList = oldList;
    this.lastIndex = 0; //初始为0
  }

  getResult() {
    let result = [];
    this.newList.forEach((node, newIndex) => {
      // oldIndex: 旧列表中的位置； newIndex：新列表中的位置
      let oldIndex = this.hasNode(this.oldList, node);
      if (oldIndex === void 0) {
        // 新节点，直接插入
        result.push({
          type: INSERT,
          node,
        });
        this.lastIndex++;
      }
      else {
        // 旧list中存在
        if (newIndex <= oldIndex) {
          // node在新列表中位置 小于等于 在旧列表中的位置时 -> 保持不动；因为旧列表前面的元素之后会移动到后方或者删除
          ``
        }
        else {
          // node在新列表中位置 大于 在旧列表中的位置时 -> 移动； 旧列表中from oldIndex to lastIndex后面； 
        }
      }
    })
  }

  /**
   * 
   */
  hasNode(list, item) {
    let index = void 0;
    for (let i = 0, len = list.length; i < len; i++) {
      if (list[i].props.key === item.props.key && list[i].props.key !== void 0) {
        index = i;
        break;
      }
    }
    return index;
  }
}

export const listDiff = (newList, oldList) => {
  let differ = new ListDiff(newList, oldList);
  differ.getResult();
}