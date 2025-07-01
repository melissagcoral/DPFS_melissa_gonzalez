document.addEventListener('DOMContentLoaded', () => {
    // Función para abrir el modal
    function abrirModal(nombre, descripcion) {
        document.getElementById('modalTitulo').innerText = nombre;
        document.getElementById('modalDescripcion').innerText = descripcion;
        document.getElementById('modal').style.display = "block";
        //const modal = document.getElementById('modal');
        //modal.classList.add('visible');
    }

    // Cerrar modal al hacer click en la X
    document.getElementById('cerrarModal').onclick = function () {
        document.getElementById('modal').style.display = "none";
        //const modal = document.getElementById('modal');
        //modal.classList.remove('visible');
        //document.getElementById('modal').classList.remove('visible');
    }

    // Cerrar modal si tocan fuera del contenido
    window.onclick = function (event) {
        const modal = document.getElementById('modal');
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Escuchamos clicks en los botones "Ver más"
    const botones = document.querySelectorAll('.btn-vermas');
    botones.forEach((boton) => {
        boton.addEventListener('click', () => {
            const productoCard = boton.parentElement;
            const nombre = productoCard.querySelector('.producto-nombre').innerText;
            const descripcion = productoCard.querySelector('.producto-descripcion').innerText;
            abrirModal(nombre, descripcion);
        });
    });
});