let carrito = JSON.parse(localStorage.getItem("mangoMarketCarrito")) || [];

document.addEventListener("DOMContentLoaded", () => {
    actualizarCarrito();
    prepararBotonFinalizarCompra();
});

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

function eliminarProductoCarrito(indice){
    carrito.splice(indice, 1);
    guardarCarrito();
    actualizarCarrito();
}

function guardarCarrito(){
    localStorage.setItem("mangoMarketCarrito", JSON.stringify(carrito));
}

function prepararBotonFinalizarCompra(){
    const botonFinalizar = document.getElementById("boton-finalizar-compra");

    if(!botonFinalizar){
        return;
    }

    botonFinalizar.addEventListener("click", evento => {
        if(carrito.length === 0){
            evento.preventDefault();
            alert("Agrega al menos un producto antes de finalizar la compra.");
        }
    });
}

function actualizarCarrito(){
    const lista = document.getElementById("lista-carrito");
    const contador = document.getElementById("contador-carrito");
    const totalHTML = document.getElementById("total");
    const botonFinalizar = document.getElementById("boton-finalizar-compra");
    const total = carrito.reduce((suma, producto) => suma + producto.precio, 0);

    if(contador){
        contador.textContent = carrito.length;
    }

    if(totalHTML){
        totalHTML.textContent = total;
    }

    if(botonFinalizar){
        botonFinalizar.classList.toggle("deshabilitado", carrito.length === 0);
        botonFinalizar.setAttribute("aria-disabled", carrito.length === 0);
    }

    if(!lista){
        return;
    }

    lista.innerHTML = "";

    if(carrito.length === 0){
        lista.innerHTML = "<p class='carrito-vacio'>Tu carrito esta vacio.</p>";
        return;
    }

    carrito.forEach((producto, indice) => {
        const div = document.createElement("div");

        div.classList.add("item-carrito");
        div.innerHTML = `
            <div>
                <strong>${producto.nombre}</strong>
                <span>S/ ${producto.precio}</span>
            </div>
            <button class="btn-eliminar" type="button" onclick="eliminarProductoCarrito(${indice})">
                Eliminar
            </button>
        `;

        lista.appendChild(div);
    });
}
