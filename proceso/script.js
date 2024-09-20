document.addEventListener('DOMContentLoaded', function() {
    let elementCounter = 0; // Contador para llevar el número de elementos agregados (ventanas o balcones)

    // Función para agregar un nuevo elemento (ventana o balcón) al formulario
    function addElement() {
        elementCounter++; // Incrementa el contador cada vez que se añade un nuevo elemento
        const elementType = document.getElementById('element-type').value; // Obtiene el tipo de elemento (ventana o balcón)
        const elementsGroup = document.getElementById('elements-group'); // Selecciona el contenedor donde se agregarán los nuevos elementos
        const newElementItem = document.createElement('div'); // Crea un nuevo div para el elemento
        newElementItem.classList.add('element-item'); // Añade una clase CSS para aplicar estilos
        newElementItem.dataset.type = elementType; // Guarda el tipo de elemento (ventana o balcón) como un atributo de datos
        newElementItem.innerHTML = `
            <div class="element-header">
                <label>${elementType.charAt(0).toUpperCase() + elementType.slice(1)} ${elementCounter} - Altura (m):</label>
                <button type="button" class="remove-element" style="float:right;">&times;</button>
            </div>
            <input type="text" class="form-control element-height" placeholder="Ingrese la altura" required>
            <label>Ancho (m):</label>
            <input type="text" class="form-control element-width" placeholder="Ingrese el ancho" required>
        `; // Plantilla para crear los campos de altura, ancho y el botón de eliminar en forma de ícono "×"

        elementsGroup.appendChild(newElementItem); // Añade el nuevo elemento al grupo de elementos en el formulario

        // Evento para eliminar el elemento cuando se hace clic en el botón "Eliminar"
        newElementItem.querySelector('.remove-element').addEventListener('click', function() {
            newElementItem.remove(); // Elimina el div correspondiente al elemento
        });

        // Añadir restricción para que solo se ingresen números en los campos de "Altura" y "Ancho"
        newElementItem.querySelectorAll('.element-height, .element-width').forEach(function(inputField) {
            inputField.addEventListener('input', function() {
                // Remover cualquier carácter que no sea un número o un punto decimal
                this.value = this.value.replace(/[^0-9.]/g, '');
            });
        });
    }

    // Evento que se dispara al hacer clic en el botón "Agregar Elemento"
    document.getElementById('add-element').addEventListener('click', addElement);

    // Evento para manejar el cálculo cuando el usuario envía el formulario
    document.getElementById('calculator-form').addEventListener('submit', function(event) {
        event.preventDefault(); // Previene el envío del formulario y la recarga de la página

        // Obtener el valor seleccionado del tipo de malla y la dirección
        var meshType = document.getElementById('mesh-type').value;
        var address = document.getElementById('address').value;

        // Inicializar variables para el área total y detalles del resultado
        let resultDetails = '';

        // Recorre todos los elementos (ventanas o balcones) que se han añadido
        document.querySelectorAll('.element-item').forEach(function(elementItem, index) {
            var height = parseFloat(elementItem.querySelector('.element-height').value); // Obtiene la altura
            var width = parseFloat(elementItem.querySelector('.element-width').value); // Obtiene el ancho
            if (!isNaN(height) && !isNaN(width)) { // Verifica que ambos valores sean números válidos
                var area = height * width; // Calcula el área del elemento
                resultDetails += `Elemento ${index + 1} (${elementItem.dataset.type}): ${area.toFixed(2)} m² (Altura: ${height.toFixed(2)} m, Ancho: ${width.toFixed(2)} m)\n`; // Detalles de cada elemento
            }
        });

        // Generar el mensaje de WhatsApp
        var whatsappMessage = `Tipo de malla: ${meshType}\nDirección: ${address}\nDetalles de elementos:\n${resultDetails}`;
        var whatsappUrl = `https://wa.me/3168862154?text=${encodeURIComponent(whatsappMessage)}`;

        // Redirigir al enlace de WhatsApp con el mensaje
        window.open(whatsappUrl, '_blank');

        // Limpiar los campos del formulario después del envío
        document.getElementById('calculator-form').reset(); // Restablece el formulario a su estado original
        document.getElementById('elements-group').innerHTML = ''; // Elimina todos los elementos añadidos
        elementCounter = 0; // Reinicia el contador de elementos
    });

    // Función para detectar si estamos en un dispositivo móvil o tablet
    function isMobileOrTablet() {
        return window.innerWidth <= 1024;
    }

    if (isMobileOrTablet()) {
        // Selecciona todos los productos
        const productItems = document.querySelectorAll('.product-item');

        // Añade un event listener para cada producto
        productItems.forEach(function(item) {
            item.addEventListener('click', function() {
                // Alternar la visibilidad de la descripción al hacer clic
                const description = item.querySelector('.product-description');
                if (description.style.transform === 'translateY(0%)') {
                    description.style.transform = 'translateY(100%)'; // Ocultar descripción
                } else {
                    description.style.transform = 'translateY(0%)'; // Mostrar descripción
                }
            });
        });
    }

    // Manejar la visibilidad de la descripción en productos (para todos los dispositivos)
    const productItems = document.querySelectorAll('.product-item');
    productItems.forEach(function(item) {
        let timeout; // Variable para manejar el timeout de cada producto

        item.addEventListener('click', function() {
            const description = item.querySelector('.product-description');
            description.classList.add('show-description');

            // Limpiar timeout anterior si existe
            clearTimeout(timeout);
        });
    });

    // Funcionalidad para abrir/cerrar el submenú de "Productos" en el navbar
    const dropdown = document.querySelector('.dropdown');
    const dropbtn = dropdown.querySelector('.dropbtn');

    // Función para abrir/cerrar el submenú
    function toggleSubMenu(event) {
        event.preventDefault(); // Prevenir el comportamiento predeterminado del enlace
        const submenu = dropdown.querySelector('.dropdown-content');
        submenu.style.display = submenu.style.display === 'block' ? 'none' : 'block';
    }

    // Añadir el evento de clic al botón "Productos"
    dropbtn.addEventListener('click', toggleSubMenu);

    // Cerrar el submenú si se hace clic fuera de él o en un enlace dentro del submenú
    document.addEventListener('click', function(event) {
        const submenu = dropdown.querySelector('.dropdown-content');
        // Si el clic no es dentro del dropdown o en el botón "Productos"
        if (!dropdown.contains(event.target) && submenu.style.display === 'block') {
            submenu.style.display = 'none'; // Ocultar el submenú
        }
    });

    // Cerrar el submenú cuando se hace clic en cualquier enlace dentro del submenú
    const submenuLinks = document.querySelectorAll('.dropdown-content a');
    submenuLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            const submenu = dropdown.querySelector('.dropdown-content');
            submenu.style.display = 'none'; // Ocultar el submenú
        });
    });

    // Prevenir el cierre del submenú cuando se hace clic dentro de él
    const submenu = dropdown.querySelector('.dropdown-content');
    submenu.addEventListener('click', function(event) {
        event.stopPropagation(); // Evitar que el menú se cierre si se hace clic dentro
    });
});
