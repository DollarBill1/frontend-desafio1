(function() {
    const urlBase = 'http://localhost:3400/produtos';
    
    (function start() {
        createTable();
    })();
    function createLine(obj) {
        const tr = document.createElement('tr');
        const editAndDel = 
        `<td>
            <a href="#editProductModal" data-id="${ obj.id }" class="edit" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Edit">&#xE254;</i></a>
            <a href="#deleteProductModal" data-id="${ obj.id }" class="delete" data-toggle="modal"><i class="material-icons" data-toggle="tooltip" title="Delete">&#xE872;</i></a>
        </td>`;
        
        for(let prop in obj) {
            let td = document.createElement('td');
            if(prop !== 'dataCadastro') {
                td.textContent = obj[prop];
            } else {
                td.setAttribute('data-timestamp', obj[prop]);
                td.textContent = (new Date(obj[prop])).toLocaleDateString();
            }
            tr.appendChild(td);
        }
        tr.innerHTML += editAndDel;

        var lastCell = tr.lastElementChild;
        var btnEdit = lastCell.firstElementChild;
        var btnDel = lastCell.lastElementChild;

        btnEdit.addEventListener('click', sendDataForformEdit);
        btnDel.addEventListener('click', sendDataForformDel);
        return tr;
    }

    function createHeadTable(obj) {
        var thead = document.createElement('thead');
        var tr = document.createElement('tr');

        for(let prop in obj) {
            let th = document.createElement('th');
            th.textContent = prop;
            tr.appendChild(th);
        }
        thead.appendChild(tr);
        return thead;
    }

    function createTable() {

        var table = document.createElement('table');
        var docFrag = document.createDocumentFragment();
        var tbody = document.createElement('tbody');

        table.setAttribute('class', 'table table-striped table-hover');
        // requisitando do servidor
        axios.get(urlBase)
        .then((response) => {
            response.data.forEach(objProd => {
                tbody.appendChild(createLine(new Produto(objProd)));
            });
            table.appendChild(createHeadTable(new Produto(response.data[0])));
            table.appendChild(tbody);
            docFrag.appendChild(table);
            injectTable(docFrag);
        })
        .catch(function (error) {
            console.error(error);
        });
    }
})();