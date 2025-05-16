const form = document.getElementById('forms');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        nome: form.nome.value,
        email: form.email.value
        }
    fetch('http://localhost:3000/usuarios', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
        .then(response => response.status)
        .then(status => {
            if (status === 201) {
                alert('Usuário cadastrado com sucesso');
            } else {
                alert('Erro ao cadastrar usuário');
            }
        });
});