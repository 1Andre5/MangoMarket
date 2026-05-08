console.log("MangoMarket cargado correctamente");

document.addEventListener("DOMContentLoaded", () => {
    marcarPaginaActiva();
    prepararFormularioContacto();
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
