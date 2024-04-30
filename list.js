const push = (thisNode, firstNode, data) => {
    if(thisNode.next) {
        thisNode.next.push(data);
        return;
    }
    firstNode.length++;
    const newNode = {
        next: null,
        data,
        get: (number) => {
            if(!number) return newNode.data;
            if (newNode.next) {
                return newNode.next.get(number-1);
            } else {
                return null;
            }
        },
        push: push
    }
    newNode.push = newNode.push.bind(null, newNode, firstNode);
    thisNode.next = newNode;
}


const createList = () => {
    const node = {
        next: null,
        length: 0,
        get: (number) => {
            if(node.next) {
                return node.next.get(number);
            }
            else {
                return null;
            }
        },
        push,
    };
    node.push = node.push.bind(null, node, node);
    return node;
}

export {createList}
