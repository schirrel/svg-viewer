

const uniqueId = () => '_' + Math.random().toString(36).substr(2, 9);
const body = document.body;
let svgNodes = [];
let nodes = null;
let liHover = function () {
    let toElement = document.querySelector(`[data-ref=${this.dataset.to}]`);
    toElement.classList.toggle('hovered-item');
    body.classList.toggle("hovering")
};
let nodeHover = function () {
    let refElement = document.querySelector(`[data-to=${this.dataset.ref}]`);
    refElement.classList.toggle('hovered-text');
};

const createItem = (node, parent) => {
    let li = document.createElement('li');
    if (!(node.dataset || node.getAttribute('ref'))) {
        console.log('error')
    }
    li.setAttribute('data-to', node.dataset.ref);
    li.innerText = `${node.tagName}  ${node.id ? "#" + node.id : ""}${node.classList.length ? '.' + [...node.classList].join('.') : ''}`;

    li.onmouseover = liHover;
    li.onmouseout = liHover;

    node.onmouseover = nodeHover;
    node.onmouseout = nodeHover;

    nodes.appendChild(li);
}

const mountThree = (_nodes, parent) => {
    _nodes.forEach((node) => {
        if (node.tagName !== 'sodipodi:namedview') {

            try {
                if (node.tagName != 'g') {
                    node.setAttribute('data-ref', uniqueId());
                    createItem(node, nodes);
                }

            } catch (e) {
            }
            if (node.childNodes.length) {
                let newUlFromLi = document.createElement('ul');
                mountThree(node.childNodes, newUlFromLi);
                parent.appendChild(newUlFromLi);
            }

        }
    });
}

const listNodes = () => {

    svgNodes = [...document.querySelectorAll('main svg > *:not(defs):not(metadata)')];
    nodes = document.querySelector('#nodes');
    nodes.innerHTML = null;

    mountThree(svgNodes, nodes)


}
const view = (svg) => {
    const regex = /<[g]*>\s*<\/[g]*>/gs;
    // The substituted value will be contained in the result variable
    const result = svg.replace(regex, "");

    document.querySelector('main').innerHTML = result;
    console.log('Substitution result: ', result);
    setTimeout(listNodes, 300);
}
export default {
    view
}