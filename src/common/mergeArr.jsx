export default function mergeArr(arr1, arr2) {
  const mergedArr = [];
  let removedNum = 0;
  arr1.forEach((item1) => {
    let isMerged = false;
    arr2.forEach((item2) => {
      if (item1.label === item2.label) {
        // 合并两个对象
        const newItem = {
          label: item1.label,
          key: item1.key || item2.key,
          content: [],
        };
        const items = [...item1.content, ...item2.content];
        items.forEach((subItem) => {
          if (subItem.type !== "link") {
            newItem.content.push(subItem);
          } else {
            // 判断是否有相同的 link，并且 link 的末尾不是斜线
            let isSameLink = false;
            for (const contentItem of newItem.content) {
              if (
                contentItem.type === "link" &&
                contentItem.link.replace(/\/$/, "") === subItem.link.replace(/\/$/, "") &&
                contentItem.type === subItem.type
              ) {
                isSameLink = true;
                removedNum += 1;
                break;
              }
            }
            if (!isSameLink) {
              newItem.content.push(subItem);
            }
          }
        });
        mergedArr.push(newItem);
        isMerged = true;
      }
    });
    if (!isMerged) mergedArr.push(item1);
  });

  arr2.forEach((item) => {
    let isMerged = false;
    mergedArr.forEach((subItem) => {
      if (subItem.label === item.label) {
        isMerged = true;
      }
    });
    if (!isMerged) mergedArr.push(item);
  });

  mergedArr.forEach((item) => {
    if (item.content.length > 0) {
      const newContent = [];
      item.content.forEach((subItem) => {
        if (subItem.type !== "link") {
          newContent.push(subItem);
        } else {
          let isSameLink = false;
          for (let i = 0; i < newContent.length; i++) {
            if (
              newContent[i].type === "link" &&
              newContent[i].link === subItem.link &&
              newContent[i].type === subItem.type
            ) {
              isSameLink = true;
              removedNum += 1;
              newContent.splice(i, 1);
              break;
            }
          }
          if (!isSameLink) {
            newContent.push(subItem);
          }
        }
      });
      item.content = newContent;
    }
  });

  // 统计 arr1 中所有对象中 content 的对象个数
  const beforeMergeCount = arr1.reduce((count, obj) => {
    if (!obj.content) {
      return count;
    }
    return count + obj.content.length;
  }, 0);

  // 统计 arr1 中所有对象中 content 的对象个数
  const afterMergeCount = mergedArr.reduce((count, obj) => {
    if (!obj.content) {
      return count;
    }
    return count + obj.content.length;
  }, 0);

  // 计算新增合并的信息总数
  const addedCount = afterMergeCount - beforeMergeCount;

  return [mergedArr, addedCount, removedNum];
}