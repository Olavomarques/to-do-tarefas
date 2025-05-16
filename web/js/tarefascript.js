const form = document.getElementById('forms');
form.addEventListener('submit', (event) => {
    event.preventDefault();
    const corpo = {
        descricao: form.descricao.value,
        setor: form.setor.value,
        usuarioId: Number(form.usuario.value),
        prioridade: form.prioridade.value,
        status: form.status.value
    };
    fetch('http://localhost:3000/tarefas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(corpo)
    })
    .then(response => response.status)
    .then(status => {
        if (status === 201) {
            alert('Tarefa cadastrada com sucesso');
        } else {
            alert('Erro ao cadastrar tarefa');
        }
    });
});