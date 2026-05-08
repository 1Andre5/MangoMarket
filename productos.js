const productos = [
    {
        nombre: "Mango Kent",
        precio: 10,
        imagen: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Pulpa jugosa, sabor dulce y textura firme."
    },
    {
        nombre: "Mango Edward",
        precio: 15,
        imagen: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Aroma intenso y equilibrio entre dulzor y frescura."
    },
    {
        nombre: "Mango Ataulfo",
        precio: 18,
        imagen: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Pequeno, cremoso y muy dulce."
    }
];

document.addEventListener("DOMContentLoaded", mostrarProductos);

function mostrarProductos(){
    const contenedor = document.getElementById("lista-productos");

    if(!contenedor){
        return;
    }

    contenedor.innerHTML = "";

    productos.forEach(producto => {
        const card = document.createElement("article");

        card.classList.add("card");
        card.innerHTML = `
            <img src="${producto.imagen}" alt="${producto.nombre}">
            <div class="card-contenido">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">S/ ${producto.precio} por kilo</p>
                <button type="button" onclick="agregarCarrito('${producto.nombre}', ${producto.precio})">
                    Agregar al carrito
                </button>
            </div>
        `;

        contenedor.appendChild(card);
    });
}
