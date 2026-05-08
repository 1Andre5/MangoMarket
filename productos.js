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
    },
    {
        nombre: "Mango Haden",
        precio: 12,
        imagen: "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Color intenso, pulpa aromatica y sabor tropical."
    },
    {
        nombre: "Mango Tommy Atkins",
        precio: 11,
        imagen: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Firme, resistente y perfecto para jugos o postres."
    },
    {
        nombre: "Mango Keitt",
        precio: 14,
        imagen: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Grande, suave y con dulzor delicado."
    },
    {
        nombre: "Mango Criollo",
        precio: 9,
        imagen: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Sabor tradicional, jugoso y de cosecha local."
    },
    {
        nombre: "Mango Organico",
        precio: 20,
        imagen: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Cultivado con practicas responsables y seleccion premium."
    },
    {
        nombre: "Mango Bocado",
        precio: 8,
        imagen: "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Pequeno, jugoso y perfecto para loncheras."
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
