const listaCursos = document.querySelector('#lista-cursos');
const tabla = document.querySelector('#lista-carrito tbody')

let carrito = [];

function getCurso(e){
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const item = {}
        item.id = e.target.getAttribute('data-id');
        const padre = e.target.parentElement;
        item.name = padre.querySelector('h4').innerText;
        item.price = padre.querySelector('p span').innerText;
        item.image = padre.parentElement.querySelector('img').src;
        item.cantity = 1;
        addItem(item);
        //llenar la tabla 
        showTable();
    }
}


    function addItem(item){
        //verifica si el ofe
        if(carrito.some(itemCarrito => item.id === itemCarrito.id)){
            carrito.forEach(itemCarrito=> {
             if (itemCarrito.id == item.id) {
                 itemCarrito.cantity ++
             }else {
                     return itemCarrito;
                 }
             })
         } else{
             carrito.push(item);
         }
    }
    function showTable(){
        tabla.innerHTML = '';//limpiar tabla
        carrito.forEach(item =>{
            tabla.appendChild(createRow(item))
        })
    }
    function createRow(item){
        const row =  document.createElement('tr');
        let rowHtml = '';
        rowHtml += `<td> <img src= "${ item.image}"></td> `;
        rowHtml += `<td> ${ item.name} </td> `;
        rowHtml += `<td> ${ item.price} </td> `;
        rowHtml += `<td> ${ item.cantity} </td> `;
        const button = document.createElement('button'); 
        button.setAttribute('data-id', item.id);
        button.classList.add('btn');
        button.innerHTML = 'X';
        const td = document.createElement('td');
        td.appendChild(button);

        row.innerHTML =rowHtml;
        row.appendChild(td); 
        return row;
    }

    function btnDelItem(e){
        if(e.target.classList.contains('btn')){
            const id = e.target.getAttribute('data-id');
            //Eliminar del carrito
            carrito = carrito.filter(itemCarrito => itemCarrito.id !== id);
            showTable();
        }
    }
        

listaCursos.addEventListener('click', getCurso)
tabla.addEventListener('click',btnDelItem)