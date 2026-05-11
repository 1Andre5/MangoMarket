console.log("MangoMarket cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
    marcarPaginaActiva();
    prepararFormularioContacto();
    prepararFormulariosCuenta();
    actualizarEstadoCuenta();
    prepararCheckout();
    prepararCarrusel();
});

function marcarPaginaActiva(){
    const paginaActual = document.body.dataset.page;

    if(!paginaActual){
        return;
    }

    document.querySelectorAll("[data-nav]").forEach(enlace => {
        if(enlace.dataset.nav === paginaActual){
            enlace.classList.add("activo");
        }
    });
}

function prepararFormularioContacto(){
    const formulario = document.querySelector(".formulario-contacto");

    if(!formulario){
        return;
    }

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        alert("Gracias por escribirnos. Te contactaremos pronto.");
        formulario.reset();
    });
}

function prepararFormulariosCuenta(){
    const formularios = document.querySelectorAll(".formulario-cuenta");

    if(formularios.length === 0){
        return;
    }

    formularios.forEach(formulario => {
        formulario.addEventListener("submit", evento => {
            evento.preventDefault();

            const datos = new FormData(formulario);
            const nombre = datos.get("nombre") || "Cliente MangoMarket";
            const correo = datos.get("correo");

            localStorage.setItem("mangoMarketCuenta", JSON.stringify({
                nombre: nombre,
                correo: correo
            }));

            actualizarEstadoCuenta();
            alert(formulario.dataset.tipo === "registro" ? "Cuenta creada correctamente." : "Sesion iniciada correctamente.");
            formulario.reset();
        });
    });
}

function actualizarEstadoCuenta(){
    const estado = document.getElementById("estado-cuenta");

    if(!estado){
        return;
    }

    const cuenta = JSON.parse(localStorage.getItem("mangoMarketCuenta"));

    if(!cuenta){
        estado.innerHTML = `
            <h2>Cuenta</h2>
            <p>Ingresa o registrate para comprar mas rapido.</p>
        `;
        return;
    }

    estado.innerHTML = `
        <h2>Hola, ${cuenta.nombre}</h2>
        <p>Sesion activa con ${cuenta.correo}. Tus datos quedan listos para futuros pedidos.</p>
        <button type="button" onclick="cerrarSesionCuenta()">Cerrar sesion</button>
    `;
}

function cerrarSesionCuenta(){
    localStorage.removeItem("mangoMarketCuenta");
    actualizarEstadoCuenta();
}

function prepararCheckout(){
    const formulario = document.getElementById("formulario-checkout");
    const tipoComprobante = document.getElementById("tipo-comprobante");

    if(!formulario){
        return;
    }

    precargarDatosCuenta();
    mostrarResumenCheckout();
    alternarDatosComprobante();

    tipoComprobante.addEventListener("change", alternarDatosComprobante);

    formulario.addEventListener("submit", evento => {
        evento.preventDefault();
        procesarCompra(formulario);
    });
}

function prepararCarrusel(){
    const carrusel = document.querySelector("[data-carousel]");

    if(!carrusel){
        return;
    }

    const slides = Array.from(carrusel.querySelectorAll(".carrusel-slide"));
    const puntos = Array.from(carrusel.querySelectorAll("[data-carousel-dot]"));
    const botonAnterior = carrusel.querySelector("[data-carousel-prev]");
    const botonSiguiente = carrusel.querySelector("[data-carousel-next]");
    const progreso = carrusel.querySelector(".carrusel-progreso span");
    let indiceActual = slides.findIndex(slide => slide.classList.contains("activo"));
    let intervalo;

    if(slides.length === 0){
        return;
    }

    if(indiceActual < 0){
        indiceActual = 0;
    }

    function mostrarSlide(indice){
        indiceActual = (indice + slides.length) % slides.length;

        slides.forEach((slide, posicion) => {
            const esActivo = posicion === indiceActual;
            const video = slide.querySelector("video");
            slide.classList.toggle("activo", esActivo);
            slide.setAttribute("aria-hidden", String(!esActivo));

            if(video){
                if(esActivo){
                    video.play().catch(() => {});
                }else{
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });

        puntos.forEach((punto, posicion) => {
            punto.classList.toggle("activo", posicion === indiceActual);
        });

        reiniciarProgreso();
    }

    function avanzar(){
        mostrarSlide(indiceActual + 1);
    }

    function reiniciarAutoavance(){
        clearInterval(intervalo);
        intervalo = setInterval(avanzar, 4800);
    }

    function reiniciarProgreso(){
        if(!progreso){
            return;
        }

        progreso.style.animation = "none";
        progreso.offsetHeight;
        progreso.style.animation = "";
    }

    if(botonAnterior){
        botonAnterior.addEventListener("click", () => {
            mostrarSlide(indiceActual - 1);
            reiniciarAutoavance();
        });
    }

    if(botonSiguiente){
        botonSiguiente.addEventListener("click", () => {
            avanzar();
            reiniciarAutoavance();
        });
    }

    puntos.forEach(punto => {
        punto.addEventListener("click", () => {
            mostrarSlide(Number(punto.dataset.carouselDot));
            reiniciarAutoavance();
        });
    });

    document.addEventListener("visibilitychange", () => {
        if(document.hidden){
            clearInterval(intervalo);
            return;
        }

        reiniciarAutoavance();
    });

    mostrarSlide(indiceActual);
    reiniciarAutoavance();
}

function obtenerCarritoGuardado(){
    return JSON.parse(localStorage.getItem("mangoMarketCarrito")) || [];
}

function mostrarResumenCheckout(){
    const resumen = document.getElementById("resumen-checkout");
    const totalHTML = document.getElementById("total-checkout");

    if(!resumen || !totalHTML){
        return;
    }

    const productosCompra = obtenerCarritoGuardado();
    const total = calcularTotal(productosCompra);

    totalHTML.textContent = total.toFixed(2);

    if(productosCompra.length === 0){
        resumen.innerHTML = "<p class='carrito-vacio'>Tu carrito esta vacio. Vuelve al catalogo para agregar productos.</p>";
        document.getElementById("formulario-checkout").classList.add("deshabilitado-formulario");
        return;
    }

    document.getElementById("formulario-checkout").classList.remove("deshabilitado-formulario");

    resumen.innerHTML = productosCompra.map(producto => `
        <div class="item-resumen">
            <strong>${producto.nombre}</strong>
            <span>S/ ${producto.precio.toFixed(2)}</span>
        </div>
    `).join("");
}

function alternarDatosComprobante(){
    const tipoComprobante = document.getElementById("tipo-comprobante");
    const datosBoleta = document.getElementById("datos-boleta");
    const datosFactura = document.getElementById("datos-factura");

    if(!tipoComprobante || !datosBoleta || !datosFactura){
        return;
    }

    const esFactura = tipoComprobante.value === "factura";

    datosBoleta.classList.toggle("oculto", esFactura);
    datosFactura.classList.toggle("oculto", !esFactura);
    actualizarRequeridos(datosBoleta, !esFactura);
    actualizarRequeridos(datosFactura, esFactura);
}

function actualizarRequeridos(contenedor, requerido){
    contenedor.querySelectorAll("input").forEach(input => {
        input.required = requerido;
    });
}

function precargarDatosCuenta(){
    const cuenta = JSON.parse(localStorage.getItem("mangoMarketCuenta"));

    if(!cuenta){
        return;
    }

    const nombreBoleta = document.getElementById("boleta-nombre");
    const correoCompra = document.getElementById("correo-compra");

    if(nombreBoleta){
        nombreBoleta.value = cuenta.nombre;
    }

    if(correoCompra){
        correoCompra.value = cuenta.correo;
    }
}

function procesarCompra(formulario){
    const productosCompra = obtenerCarritoGuardado();

    if(productosCompra.length === 0){
        alert("Tu carrito esta vacio.");
        return;
    }

    const datos = Object.fromEntries(new FormData(formulario));
    const comprobante = crearComprobante(datos, productosCompra);

    mostrarComprobante(comprobante);
    localStorage.setItem("mangoMarketCarrito", JSON.stringify([]));

    if(typeof carrito !== "undefined"){
        carrito = [];
    }

    if(typeof actualizarCarrito === "function"){
        actualizarCarrito();
    }

    mostrarResumenCheckout();
    formulario.reset();
    alternarDatosComprobante();
}

function crearComprobante(datos, productosCompra){
    const total = calcularTotal(productosCompra);
    const subtotal = total / 1.18;
    const igv = total - subtotal;
    const esFactura = datos.tipoComprobante === "factura";

    return {
        numero: "MM-" + Date.now(),
        fecha: new Date().toLocaleString("es-PE"),
        tipo: esFactura ? "Factura" : "Boleta",
        cliente: esFactura ? datos.razonSocial : datos.boletaNombre,
        documento: esFactura ? datos.ruc : datos.dni,
        correo: datos.correo,
        telefono: datos.telefono,
        direccion: datos.direccion + " - " + datos.distrito,
        metodoPago: datos.metodoPago,
        referenciaPago: ocultarReferenciaPago(datos.numeroPago),
        titularPago: datos.titularPago,
        productos: productosCompra,
        subtotal: subtotal,
        igv: igv,
        total: total
    };
}

function mostrarComprobante(comprobante){
    const contenedor = document.getElementById("comprobante-generado");

    if(!contenedor){
        return;
    }

    contenedor.classList.remove("oculto");
    contenedor.innerHTML = `
        <div class="comprobante-encabezado">
            <div>
                <p class="etiqueta-comprobante">${comprobante.tipo}</p>
                <h2>${comprobante.numero}</h2>
                <p>${comprobante.fecha}</p>
            </div>
            <button type="button" onclick="window.print()">Imprimir</button>
        </div>

        <div class="comprobante-datos">
            <p><strong>Cliente:</strong> ${comprobante.cliente}</p>
            <p><strong>Documento:</strong> ${comprobante.documento}</p>
            <p><strong>Correo:</strong> ${comprobante.correo}</p>
            <p><strong>Telefono:</strong> ${comprobante.telefono}</p>
            <p><strong>Entrega:</strong> ${comprobante.direccion}</p>
            <p><strong>Pago:</strong> ${comprobante.metodoPago}</p>
            <p><strong>Referencia:</strong> ${comprobante.referenciaPago}</p>
            <p><strong>Titular:</strong> ${comprobante.titularPago}</p>
        </div>

        <div class="comprobante-tabla">
            ${comprobante.productos.map(producto => `
                <div>
                    <span>${producto.nombre}</span>
                    <strong>S/ ${producto.precio.toFixed(2)}</strong>
                </div>
            `).join("")}
        </div>

        <div class="totales-comprobante">
            <p>Subtotal: S/ ${comprobante.subtotal.toFixed(2)}</p>
            <p>IGV 18%: S/ ${comprobante.igv.toFixed(2)}</p>
            <h3>Total pagado: S/ ${comprobante.total.toFixed(2)}</h3>
            <p>Comprobante generado para ${comprobante.correo}.</p>
        </div>
    `;

    contenedor.scrollIntoView({behavior: "smooth"});
}

function calcularTotal(productosCompra){
    return productosCompra.reduce((suma, producto) => suma + producto.precio, 0);
}

function ocultarReferenciaPago(referencia){
    if(!referencia || referencia.length <= 4){
        return referencia;
    }

    return "**** " + referencia.slice(-4);
}
