

const uniqueId = () => '_' + Math.random().toString(36).substr(2, 9);

let svgNodes = [];
let nodes = null;
const mouseHover = function () {
    document.querySelector(`[data-ref=${this.dataset.to}]`).classList.toggle('hovered-item');
    this.classList.toggle('hovered-text');
};
const createItem = (node, parent) => {
    let li = document.createElement('li');
    li.setAttribute('data-to', node.dataset.ref);
    li.innerText = `${node.tagName}  ${node.id ? "#" + node.id : ""}${node.classList.length ? '.' + [...node.classList].join('.') : ''}`;
    li.onmouseover = function () {
        document.querySelector(`[data-ref=${this.dataset.to}]`).classList.toggle('hovered-item');
    };
    li.onmouseout = li.onmouseover;

    node.onmouseover = function () {
        document.querySelector(`[data-to=${this.dataset.ref}]`).classList.toggle('hovered-text');
    };
    parent.onmouseout = node.onmouseover;

    nodes.appendChild(li);
}

const mountThree = (_nodes) => {
    _nodes.forEach((node) => {
        if (node.tagName !== 'sodipodi:namedview') {
            console.log(node)
            try {
                node.setAttribute('data-ref', uniqueId());
            } catch(e) {
                node.innerText("problem")
                console.log(node);
                console.log(e);
            }
            createItem(node, _nodes);
            if (node.childNodes.length) {
                let newUlFromLi = document.createElement('ul');
                mountThree(node.childNodes, newUlFromLi);
                nodes.appendChild(newUlFromLi);
            }

        }
    });
}

const listNodes = () => {

    svgNodes = [...document.querySelectorAll('main svg > *:not(defs):not(metadata)')];
    nodes = document.querySelector('#nodes');
    nodes.innerHTML = null;

    mountThree(svgNodes, nodes)
    svgNodes.forEach((node) => {
        if (node.tagName !== 'sodipodi:namedview') {
            node.setAttribute('data-ref', uniqueId());
            createItem(node, nodes);
        }

    });

}
const view = (svg) => {
    document.querySelector('main').innerHTML = svg;
    setTimeout(listNodes, 300);
}
export default {
    view
}