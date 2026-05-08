let carrito = JSON.parse(localStorage.getItem("mangoMarketCarrito")) || [];

document.addEventListener("DOMContentLoaded", actualizarCarrito);

function agregarCarrito(nombre, precio){
    carrito.push({
        nombre: nombre,
        precio: precio
    });

    guardarCarrito();
    actualizarCarrito();
    alert(nombre + " agregado al carrito");
}

function vaciarCarrito(){
    carrito = [];
    guardarCarrito();
    actualizarCarrito();
}

function guardarCarrito(){
    localStorage.setItem("mangoMarketCarrito", JSON.stringify(carrito));
}

function actualizarCarrito(){
    const lista = document.getElementById("lista-carrito");
    const contador = document.getElementById("contador-carrito");
    const totalHTML = document.getElementById("total");
    const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

    if(contador){
        contador.textContent = carrito.length;
    }

    if(totalHTML){
        totalHTML.textContent = total;
    }

    if(!lista){
        return;
    }

    lista.innerHTML = "";

    if(carrito.length === 0){
        lista.innerHTML = "<p class='carrito-vacio'>Tu carrito esta vacio.</p>";
        return;
    }

    carrito.forEach(producto => {
        const div = document.createElement("div");

        div.classList.add("item-carrito");
        div.innerHTML = `
            <strong>${producto.nombre}</strong>
            <span>S/ ${producto.precio}</span>
        `;

        lista.appendChild(div);
    });
}
