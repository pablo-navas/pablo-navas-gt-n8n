document.getElementById('justificationForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evitamos que la página se recargue automáticamente

    const statusMessage = document.getElementById('statusMessage');
    const submitButton = document.querySelector('button[type="submit"]');
    
    // Cambiamos el estado visual del botón y del mensaje para dar feedback al usuario
    submitButton.innerText = 'Enviando...';
    submitButton.disabled = true;
    statusMessage.style.color = '#00d4ff';
    statusMessage.innerText = 'Procesando tu solicitud...';

    // === REEMPLAZA ESTA URL CON LA QUE TE DIO TU NODO WEBHOOK EN N8N ===
    const webhookUrl = 'https://dooper.app.n8n.cloud/webhook-test/justificaciones'; 

    // FormData empaqueta automáticamente los textos (incluido el textarea) y el archivo binario
    const formData = new FormData(this);

    // Enviamos el paquete de datos al Webhook de n8n mediante POST
    fetch(webhookUrl, {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (response.ok) {
            statusMessage.style.color = '#00ff88';
            statusMessage.innerText = '¡Justificación enviada con éxito!';
            this.reset(); // Limpiamos los campos del formulario tras el éxito
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        statusMessage.style.color = '#ff3366';
        statusMessage.innerText = 'Hubo un error al enviar. Intenta de nuevo.';
    })
    .finally(() => {
        // Restauramos el botón a su estado original pase lo que pase
        submitButton.innerText = 'Enviar Justificación';
        submitButton.disabled = false;
    });
});