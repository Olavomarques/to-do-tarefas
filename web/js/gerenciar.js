function fetchTarefas() {
    fetch('http://localhost:3000/tarefas')
        .then(response => response.json())
        .then(tarefas => {
            const aFazer = document.getElementById('a-fazer');
            const fazendo = document.getElementById('fazendo');
            const pronto = document.getElementById('pronto');

            aFazer.innerHTML = '';
            fazendo.innerHTML = '';
            pronto.innerHTML = '';

            tarefas.forEach((tarefa) => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <h3>${tarefa.descricao}</h3>
                    <p><strong>Setor:</strong> ${tarefa.setor}</p>
                    <p><strong>Usuário:</strong> ${tarefa.usuarioId}</p>
                    <label><strong>Prioridade:</strong></label>
                    <select class="prioridade" data-id="${tarefa.id}">
                        <option value="BAIXA" ${tarefa.prioridade === 'BAIXA' ? 'selected' : ''}>Baixa</option>
                        <option value="MEDIA" ${tarefa.prioridade === 'MEDIA' ? 'selected' : ''}>Média</option>
                        <option value="ALTA" ${tarefa.prioridade === 'ALTA' ? 'selected' : ''}>Alta</option>
                    </select>
                    <label><strong>Status:</strong></label>
                    <select class="status" data-id="${tarefa.id}">
                        <option value="AFAZER" ${tarefa.status === 'AFAZER' ? 'selected' : ''}>A fazer</option>
                        <option value="FAZENDO" ${tarefa.status === 'FAZENDO' ? 'selected' : ''}>Fazendo</option>
                        <option value="PRONTO" ${tarefa.status === 'PRONTO' ? 'selected' : ''}>Pronto</option>
                    </select>
                    <button onclick="excluir(${tarefa.id})">Excluir</button>
                `;

                if (tarefa.status === 'AFAZER') {
                    aFazer.appendChild(card);
                } else if (tarefa.status === 'FAZENDO') {
                    fazendo.appendChild(card);
                } else if (tarefa.status === 'PRONTO') {
                    pronto.appendChild(card);
                }
            });

            document.querySelectorAll('.prioridade').forEach(select => {
                select.addEventListener('change', (e) => {
                    const id = e.target.dataset.id;
                    const novaPrioridade = e.target.value;
                    alterarPrioridade(id, novaPrioridade);
                });
            });

            document.querySelectorAll('.status').forEach(select => {
                select.addEventListener('change', (e) => {
                    const id = e.target.dataset.id;
                    const novoStatus = e.target.value;
                    alterarStatus(id, novoStatus);
                });
            });
        })
        .catch(() => alert('Erro ao carregar tarefas'));
}

function excluir(id) {
    fetch(`http://localhost:3000/tarefas/${id}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (response.status === 204) {
            alert('Tarefa excluída com sucesso');
            fetchTarefas();
        } else {
            alert('Erro ao excluir tarefa');
        }
    });
}

function alterarStatus(id, novoStatus) {
    fetch(`http://localhost:3000/tarefas/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: novoStatus })
    })
    .then(response => {
        if (response.status === 200) {
            alert('Status da tarefa alterado com sucesso');
            fetchTarefas();
        } else {
            alert('Erro ao alterar status da tarefa');
        }
    });
}

function alterarPrioridade(id, novaPrioridade) {
    fetch(`http://localhost:3000/tarefas/${id}/prioridade`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prioridade: novaPrioridade })
    })
    .then(response => {
        if (response.status === 200) {
            alert('Prioridade da tarefa alterada com sucesso');
            fetchTarefas();
        } else {
            alert('Erro ao alterar prioridade da tarefa');
        }
    });
}

fetchTarefas();