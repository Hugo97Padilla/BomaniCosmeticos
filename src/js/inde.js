document.querySelector('.fas').addEventListener('click', () => {
    document.querySelector('.Shoppin-cart').classList.toggle('show');
});


const shoppinCart = document.getElementById('shoppin-cart');
const lstProductos = document.getElementById('cont-card');
const listaProductos = document.querySelector('#list-Cart tbody');
const limpiarc = document.getElementById('limpiar');




cargarDatos();
function cargarDatos() {
    lstProductos.addEventListener('click', agregarCart);
    shoppinCart.addEventListener('click', eliminarp);
    limpiarc.addEventListener('click', cleancart);
    document.addEventListener('DOMContentLoaded', leerLocal);
}




function agregarCart(e) {
    e.preventDefault();
    if (e.target.classList.contains('add-cart')) {
        const producto = e.target.parentElement;
        leerDatos(producto);
    }
}

function leerDatos(p) {
    const infoP = {
        imagen: p.querySelector('img').src,
        nombre: p.querySelector('h4').textContent,
        precio: p.querySelector('p').textContent,
        id: p.querySelector('a').getAttribute('data-id')
    }
    mostrarDatos(infoP);
}


function mostrarDatos(p) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td> <img src="${p.imagen}" width=255></td>
        <td>${p.nombre}</td>
        <td>${p.precio}</td>
        <td>
          <a href="#" class="eliminarP" data-id="${p.id}"> X </a>
        </td>
    `;
    listaProductos.appendChild(row);
    gurdarlocalmente(p);
}


function eliminarp(e) {
    e.preventDefault();
    let pId;
    let p;
    if (e.target.classList.contains('eliminarP')) {
        e.target.parentElement.parentElement.remove();
        p = e.target.parentElement.parentElement;
        pId = p.querySelector('a').getAttribute('data-id');
    }
    eliminarpLocal(pId);
}





function cleancart() {
    while (listaProductos.firstChild) {
        listaProductos.removeChild(listaProductos.firstChild);

    }
    limpiarLS();
    return false;
}


function gurdarlocalmente(p) {
    let productos;
    productos = obtenrProductosLocalStorage();
    productos.push(p);
    localStorage.setItem('productos', JSON.stringify(productos));
}

function obtenrProductosLocalStorage() {
    let pLS

    if (localStorage.getItem('productos') == null) {
        pLS = [];
    } else {
        pLS = JSON.parse(localStorage.getItem('productos'));
    }

    return pLS;
}


function leerLocal() {
    let pLS;
    pLS = obtenrProductosLocalStorage();
    pLS.forEach(function (p) {
        const row = document.createElement('tr');
        row.innerHTML = `
        <td> <img src="${p.imagen}" width=225></td>
        <td>${p.nombre}</td>
        <td>${p.precio}</td>
        <td>
          <a href="#" class="eliminarP" data-id="${p.id}"> X </a>
        </td>
    `;
        listaProductos.appendChild(row);
    });
    console.log(pLS);
}




function eliminarpLocal(p) {
    let pLS;
    pLS = obtenrProductosLocalStorage();
    pLS.forEach(function (LSp, index) {
        if (LSp.id === p) {
            pLS.splice(index, 1);
        }
    });
    console.log(pLS);
    localStorage.setItem('productos', JSON.stringify(pLS));

}


function limpiarLS() {
    localStorage.clear();
}





