//非同期処理
export function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

//ファイル名前が被らないように
export function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 2);
}

//チャット欄のコメント返信用(ノードの親、子を取得)
export function createDataTree(dataset) {
  let hashtable = Object.create(null);
  dataset.forEach((a) => (hashtable[a.id] = { ...a, childNodes: [] }));
  let dataTree = [];
  dataset.forEach((a) => {
    if (a.parentId) hashtable[a.parentId].childNodes.push(hashtable[a.id]);
    else dataTree.push(hashtable[a.id]);
  });
  return dataTree;
}
