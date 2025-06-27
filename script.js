// Seleciona todos os botões das abas que possuem a classe 'tab-btn'
const tabBtns = document.querySelectorAll('.tab-btn');

// Seleciona todos os conteúdos das abas que possuem a classe 'tab-content'
const tabContents = document.querySelectorAll('.tab-content');

// Para cada botão de aba, adiciona um evento de clique
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Pega o valor do atributo 'data-tab' do botão clicado, que indica qual aba mostrar
        const tabId = btn.getAttribute('data-tab');
        
        // Remove a classe 'active' de todos os botões, para desativar a aba atual
        tabBtns.forEach(btn => btn.classList.remove('active'));
        
        // Remove a classe 'active' de todos os conteúdos, para esconder todas as abas
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Adiciona a classe 'active' ao botão clicado para marcar como aba ativa
        btn.classList.add('active');
        
        // Mostra o conteúdo da aba correspondente ao botão clicado, adicionando 'active'
        document.getElementById(tabId).classList.add('active');
    });
});

// Seleciona a div onde as partículas serão criadas
const particlesContainer = document.getElementById('particles');

// Função que cria partículas animadas na tela
function createParticles() {
    // Loop para criar 50 partículas
    for (let i = 0; i < 50; i++) {
        // Cria um novo elemento div para a partícula
        const particle = document.createElement('div');
        
        // Adiciona a classe 'particle' para aplicar o estilo CSS
        particle.classList.add('particle');
        
        // Define uma posição horizontal aleatória em porcentagem da largura da tela
        const posX = Math.random() * 100;
        
        // Define uma posição vertical aleatória começando abaixo da tela (100% + 0 a 100%)
        const posY = Math.random() * 100 + 100;
        
        // Define um tamanho aleatório entre 1 e 4 pixels para a partícula
        const size = Math.random() * 3 + 1;
        
        // Define a duração da animação, tempo que a partícula vai "flutuar"
        const duration = Math.random() * 10 + 10;
        
        // Define um atraso para começar a animação, para que elas não comecem todas juntas
        const delay = Math.random() * 5;
        
        // Aplica as propriedades CSS definidas acima para posicionar e animar a partícula
        particle.style.left = `${posX}%`;
        particle.style.top = `${posY}%`;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.animationDuration = `${duration}s`;
        particle.style.animationDelay = `${delay}s`;
        
        // Adiciona a partícula criada dentro da div de partículas no HTML
        particlesContainer.appendChild(particle);
    }
}

// Chama a função para criar as partículas quando a página carregar
createParticles();

// Busca a lista de usuários cadastrados no localStorage, ou cria uma lista vazia se não existir
const users = JSON.parse(localStorage.getItem('techvision_users')) || [];

// Seleciona elementos para exibir saudação e botão de logout
const userGreeting = document.getElementById('userGreeting');
const usernameDisplay = document.getElementById('usernameDisplay');
const logoutBtn = document.getElementById('logoutBtn');

// Verifica se tem algum usuário salvo como "logado" no localStorage
const currentUser = JSON.parse(localStorage.getItem('techvision_currentUser'));

// Se houver usuário logado, mostra a saudação com o nome dele
if (currentUser) {
    showUserGreeting(currentUser.username);
}

// Função para mostrar a saudação do usuário logado
function showUserGreeting(username) {
    usernameDisplay.textContent = `Bem-vindo, ${username}!`; // Mostra o nome
    userGreeting.style.display = 'block'; // Exibe a div da saudação
}

// Evento para o formulário de registro (criar conta)
document.getElementById('registerForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que a página recarregue ao enviar o formulário
    
    // Pega os valores digitados nos campos do formulário
    const username = document.getElementById('reg-username').value;
    const email = document.getElementById('reg-email').value;
    const password = document.getElementById('reg-password').value;
    const confirm = document.getElementById('reg-confirm').value;
    
    // Verifica se as senhas digitadas são iguais
    if (password !== confirm) {
        alert('As senhas não coincidem!');
        return; // Sai da função sem continuar
    }
    
    // Verifica se já existe usuário com o mesmo nome
    if (users.some(user => user.username === username)) {
        alert('Nome de usuário já existe!');
        return;
    }
    
    // Verifica se o e-mail já está cadastrado
    if (users.some(user => user.email === email)) {
        alert('E-mail já cadastrado!');
        return;
    }
    
    // Se passou nas verificações, adiciona novo usuário na lista
    users.push({ username, email, password });
    
    // Salva a lista atualizada no localStorage (memória do navegador)
    localStorage.setItem('techvision_users', JSON.stringify(users));
    
    // Mostra mensagem de sucesso
    alert('Conta criada com sucesso! Agora você pode fazer login.');
    
    // Troca para a aba de login automaticamente
    document.querySelector('[data-tab="login"]').click();
    
    // Limpa o formulário para não ficar os dados preenchidos
    this.reset();
});

// Evento para o formulário de login
document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault(); // Evita recarregar a página
    
    // Pega os dados digitados no formulário de login
    const username = document.getElementById('login-username').value;
    const password = document.getElementById('login-password').value;
    
    // Procura um usuário que tenha o mesmo nome e senha digitados
    const user = users.find(u => u.username === username && u.password === password);
    
    // Se não encontrar, mostra alerta de erro
    if (!user) {
        alert('Usuário ou senha incorretos!');
        return;
    }
    
    // Salva o usuário atual no localStorage para lembrar que está logado
    localStorage.setItem('techvision_currentUser', JSON.stringify(user));
    
    // Mostra a saudação com o nome do usuário
    showUserGreeting(user.username);
    
    // Mensagem de sucesso
    alert('Login realizado com sucesso!');
    
    // Troca automaticamente para a aba da galeria
    document.querySelector('[data-tab="gallery"]').click();
    
    // Limpa o formulário
    this.reset();
});

// Evento do botão sair (logout)
logoutBtn.addEventListener('click', function() {
    // Remove o usuário atual do localStorage, "deslogando" ele
    localStorage.removeItem('techvision_currentUser');
    
    // Esconde a saudação
    userGreeting.style.display = 'none';
    
    // Mostra uma mensagem informando que saiu da conta
    alert('Você saiu da sua conta.');
});

// Evento para impedir que a galeria seja acessada sem login
document.querySelector('[data-tab="gallery"]').addEventListener('click', function() {
    // Se não houver usuário logado
    if (!localStorage.getItem('techvision_currentUser')) {
        alert('Por favor, faça login para acessar a galeria.');
        
        // Muda para a aba de login
        document.querySelector('[data-tab="login"]').click();
        
        // Impede que continue abrindo a aba da galeria
        return false;
    }
});

// Seleciona elementos para upload de imagem
const uploadArea = document.getElementById('uploadArea');
const imageUpload = document.getElementById('imageUpload');
const uploadBtn = document.getElementById('uploadBtn');
const galleryDisplay = document.getElementById('galleryDisplay');
const imageCaption = document.getElementById('imageCaption');

// Quando clicar na área de upload, abre o seletor de arquivos
uploadArea.addEventListener('click', () => {
    imageUpload.click();
});

// Quando um arquivo for selecionado, atualiza o texto para mostrar o nome do arquivo
imageUpload.addEventListener('change', function(e) {
    if (this.files && this.files[0]) {
        const fileName = this.files[0].name;
        uploadArea.querySelector('p').textContent = `Arquivo selecionado: ${fileName}`;
    }
});

// Quando clicar no botão de enviar imagem
uploadBtn.addEventListener('click', function() {
    // Verifica se alguma imagem foi selecionada
    if (!imageUpload.files || !imageUpload.files[0]) {
        alert('Por favor, selecione uma imagem primeiro.');
        return;
    }

    // Pega o arquivo e a legenda digitada
    const file = imageUpload.files[0];
    const caption = imageCaption.value || 'Sem legenda';
    
    // Cria um leitor de arquivos para ler o conteúdo da imagem
    const reader = new FileReader();
    
    // Quando a leitura terminar
    reader.onload = function(e) {
        // Cria um card para mostrar a imagem e a legenda na galeria
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card neon-border-thin';
        
        // Cria o elemento <img> com a imagem carregada
        const img = document.createElement('img');
        img.src = e.target.result;
        img.alt = caption;
        
        // Cria um elemento para mostrar a legenda
        const captionElement = document.createElement('div');
        captionElement.className = 'image-caption';
        captionElement.textContent = caption;
        
        // Adiciona a imagem e a legenda dentro do card
        imageCard.appendChild(img);
        imageCard.appendChild(captionElement);
        
        // Adiciona o card no começo da galeria (prepend = antes dos outros)
        galleryDisplay.prepend(imageCard);
        
        // Limpa os campos do formulário para o próximo upload
        imageUpload.value = '';
        imageCaption.value = '';
        uploadArea.querySelector('p').textContent = 'Arraste e solte sua imagem aqui ou clique para selecionar';
        
        // Aplica um efeito visual de aparição suave
        imageCard.style.opacity = '0';
        setTimeout(() => {
            imageCard.style.transition = 'opacity 0.5s ease';
            imageCard.style.opacity = '1';
        }, 10);
    };
    
    // Começa a ler o arquivo como uma URL que o navegador entende para mostrar a imagem
    reader.readAsDataURL(file);
});

// Quando o usuário arrasta o mouse com arquivo sobre a área de upload
uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault(); // Impede o comportamento padrão do navegador
    uploadArea.classList.add('neon-glow'); // Adiciona efeito visual para indicar que pode soltar
});

// Quando o usuário tira o arquivo da área de upload sem soltar
uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('neon-glow'); // Remove o efeito visual
});

// Quando o usuário solta o arquivo na área de upload
uploadArea.addEventListener('drop', (e) => {
    e.preventDefault(); // Impede o comportamento padrão
    
    uploadArea.classList.remove('neon-glow'); // Remove o efeito visual
    
    // Verifica se soltou algum arquivo
    if (e.dataTransfer.files.length) {
        // Coloca o arquivo selecionado no input invisível para subir depois
        imageUpload.files = e.dataTransfer.files;
        
        // Atualiza o texto para mostrar o nome do arquivo selecionado
        const fileName = e.dataTransfer.files[0].name;
        uploadArea.querySelector('p').textContent = `Arquivo selecionado: ${fileName}`;
    }
});
