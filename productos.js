const productos = [
    {
        nombre: "Mango Kent",
        precio: 10,
        imagen: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Pulpa jugosa, sabor dulce y textura firme.",
        etiqueta: "Mas pedido"
    },
    {
        nombre: "Mango Edward",
        precio: 15,
        imagen: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Aroma intenso y equilibrio entre dulzor y frescura.",
        etiqueta: "Aromatico"
    },
    {
        nombre: "Mango Ataulfo",
        precio: 18,
        imagen: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Pequeno, cremoso y muy dulce.",
        etiqueta: "Cremoso"
    },
    {
        nombre: "Mango Haden",
        precio: 12,
        imagen: "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Color intenso, pulpa aromatica y sabor tropical.",
        etiqueta: "Tropical"
    },
    {
        nombre: "Mango Tommy Atkins",
        precio: 11,
        imagen: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Firme, resistente y perfecto para jugos o postres.",
        etiqueta: "Jugos"
    },
    {
        nombre: "Mango Keitt",
        precio: 14,
        imagen: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Grande, suave y con dulzor delicado.",
        etiqueta: "Grande"
    },
    {
        nombre: "Mango Criollo",
        precio: 9,
        imagen: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Sabor tradicional, jugoso y de cosecha local.",
        etiqueta: "Local"
    },
    {
        nombre: "Mango Organico",
        precio: 20,
        imagen: "https://images.unsplash.com/photo-1605027990121-cbae9e0642df?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Cultivado con practicas responsables y seleccion premium.",
        etiqueta: "Premium"
    },
    {
        nombre: "Mango Bocado",
        precio: 8,
        imagen: "https://images.unsplash.com/photo-1519096845289-95806ee03a1a?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Pequeno, jugoso y perfecto para loncheras.",
        etiqueta: "Practico"
    },
    {
        nombre: "Mango Palmer",
        precio: 13,
        imagen: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Fruta alargada, pulpa firme y dulzor equilibrado para mesa o cortes.",
        etiqueta: "Nuevo"
    },
    {
        nombre: "Mango Seleccion Molino",
        precio: 17,
        imagen: "https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Lote elegido por color, aroma y punto de maduracion uniforme.",
        etiqueta: "Origen"
    },
    {
        nombre: "Pack Mixto Motupe",
        precio: 32,
        unidad: "pack de 3 kg",
        imagen: "https://images.unsplash.com/photo-1553279768-865429fa0078?q=80&w=1200&auto=format&fit=crop",
        descripcion: "Combinacion de variedades para probar diferentes texturas y niveles de dulzor.",
        etiqueta: "Nuevo"
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
        const unidad = producto.unidad || "por kilo";

        card.classList.add("card");
        card.innerHTML = `
            <div class="card-media">
                <img src="${producto.imagen}" alt="${producto.nombre}">
                <span>${producto.etiqueta || "Fresco"}</span>
            </div>
            <div class="card-contenido">
                <h3>${producto.nombre}</h3>
                <p>${producto.descripcion}</p>
                <p class="precio">S/ ${producto.precio} ${unidad}</p>
                <button type="button" onclick="agregarCarrito('${producto.nombre}', ${producto.precio})">
                    Agregar al carrito
                </button>
            </div>
        `;

        contenedor.appendChild(card);
    });
}
