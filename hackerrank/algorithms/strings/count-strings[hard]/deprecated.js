function doTree2ArrayDf (arr, node) {
    if (node.tree2ArrayVisited) {
        return
    }
    node.tree2ArrayVisited = true
    const keys = Object.keys(node.next)
    for (let i = 0; i !== keys.length; i++) {
        const key = keys[i]
        const nextNode = node.next[key]
        arr[node.index][nextNode.index] = key
        doTree2ArrayDf(arr, nextNode)
    }
}