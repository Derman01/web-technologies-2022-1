const data = [{
    id: 'k1',
    title: 'Каталог Товаров',
    node: true,
    parent: null
},{
    id: 'k2',
    title: 'Мойки',
    node: true,
    parent: 'k1'
},{
    id: 'k3',
    title: 'Handmade',
    node: true,
    parent: 'k2'
},{
    id: 'k4',
    title: 'Фильтры',
    node: true,
    parent: 'k1'
},{
    id: 'k5',
    title: 'Ulgran',
    node: true,
    parent: 'k2'
},{
    id: 'k6',
    title: 'Vigro Mramor',
    node: false,
    parent: 'k2'
},{
    id: 'k7',
    title: 'Vigro Class',
    node: false,
    parent: 'k2'
},{
    id: 'k8',
    title: 'Smth',
    node: false,
    parent: 'k5'
},{
    id: 'k9',
    title: 'Smth',
    node: false,
    parent: 'k5'
},{
    id: 'k10',
    title: 'Smth',
    node: false,
    parent: 'k3'
},{
    id: 'k11',
    title: 'Smth',
    node: false,
    parent: 'k3'
},{
    id: 'k12',
    title: 'Ulgan',
    node: true,
    parent: 'k4'
},{
    id: 'k13',
    title: 'Smth',
    node: false,
    parent: 'k12'
},{
    id: 'k14',
    title: 'Smth',
    node: false,
    parent: 'k12'
},{
    id: 'k15',
    title: 'Vigro Mramor',
    node: false,
    parent: 'k4'
}]

/**
 * Иерархический список  на основе массива данных
 */
class Tree {
    constructor (data) {
        const main = data[this.searchTopIndex(data)];
        this.parent = null;
        this.title = main.title;
        this.id = main.id;

        this.findNodes(this, data)
    }

    findNodes(branch, data) {
        branch.nodes = []
        const remaining = []
        data.forEach(item => {
            if (item.parent === branch.id){
                branch.nodes.push(item);
            } else {
                remaining.push(item)
            }
        })
        branch.nodes.forEach(item => {
            this.findNodes(item, remaining);
        })
    }

    searchTopIndex(data) {
        for(let i = 0; i < data.length; i++) {
            if (data[i].parent === null) {
                return i;
            }
        }
    }
}

/**
 * Формуироуем Ноду, и вставляеям в Переданный элемент DOM
 * @param {HTMLElement} DOMElement 
 * @param {Tree} data иерархический список
 */
function createDOM(DOMElement, data) {
    const createBranch = (data) => {
        const isParent = !!data.nodes.length
        const titleCode = `<div class="folder-title icon-folder ${isParent ? 'folder-parent': ''}">${data.title}</div>`
        let code = ""
        if (isParent) {
            code += `${titleCode}
                <div class="folder-children">`

            data.nodes.forEach(item => {
                code += createBranch(item);
            });

            code += '</div>';
            
        } else {
            code += titleCode
        }
        return code;
    }

    const html = '<div class="folder-children visible">' + createBranch(data) + '</div>';
    DOMElement.innerHTML = html;
}

const tree = new Tree(data);
createDOM(document.getElementById('main'), tree);

// После создания DOM вещаем события на нажатия, открыть/закрыть папку
const parents = [...document.querySelectorAll('.folder-parent')];
parents.forEach((e) => {
    e.addEventListener('click', () => {
        e.classList.toggle('close')
        e.nextElementSibling.classList.toggle('visible');
    })
    console.log(e);
})

