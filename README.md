# Atividade Prática - eTopocart

Sou o Thiago Santos e esse é meu projeto para o teste prático.

✉️: thiago.sullivan.dev@gmail.com <br>
🔗: https://thiagosullivanportfolio.vercel.app/ <br>
ℹ️: https://www.linkedin.com/in/thiagosullivan/
____

### Preview
https://github.com/user-attachments/assets/0d5c57c8-c175-45af-8d2c-2377ff2d2456

## Backend

### 1. Clone o repositório:
```bash
git clone https://github.com/thiagosullivan/etopocart-atividade.git
```
### 2. Vá para a pasta
```bash
cd .\backend\
```
### 3. Rode o ambiente virtual
_Linux/Mac_
```bash
python -m venv venv
source venv/bin/activate
```
_Windows_
```bash
python -m venv venv
venv\Scripts\activate
```
### 4. Instale as dependências
```bash
pip install -r requirements.txt
```
### 5. Execute a aplicação
```bash
uvicorn main:app --reload
```
*O backend precisa estar rodando o tempo inteiro durante o uso do projeto.*

#### Testes de endpoint
Após o projeto estar rodando é possível acessar a página http://localhost:8000/docs para realizar testes nos endpoints.
___

## Frontend

### 1. Abra outro terminal e navegue para a pasta do frontend:
```bash
cd .\frontend\
```
### 2. Instale as dependências
```bash
npm i
```

### 3. Rode o projeto frontend
```bash
npm run dev
```
___

#### Observações
⚠️ É necessário ter o Python 3 instalado. <br>
⚠️ É necessário ter o Node instalado. <br>

O backend por padrão está rodando na porta 8000 (http://localhost:8000/) <br>
O frontend por padrão está rodando na porta 5173 (http://localhost:5173/) <br>
Caso ocorra qualquer problema devido ao CORS, ele pode ser resolvido entrando no arquivo main.py e alterarando o allow_origins para para permitir qualquer tipo de conexão:

```
allow_origins=["*"],
```
Se por acaso o backend estiver rodando em outra porta que não seja a 8000, pode ser resolvido entrando no arquivo vite.config.js e alterar o 'target' para a porta na qual seu backend está ativo:
```
proxy: {
    '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
    },
},
```
___
### Tecnologias

#### Backend
- FastAPI: Usado para criar APIs REST e possui uma documentação nativa com Swagger acessando o /docs.
- Pydantic: Utilizado para validação de dados, definir schema e converter types.
- Uvicorn: Servidor web com hotreaload para que as alterações automaticamente reflitam no browser.

#### Frontend
- Vite: Optei por utilizar o Vite devido à natureza do projeto não exigir SSR e SEO.
- Tailwind CSS: O framework mais utilizado para estilização hoje em dia e pela rapidez que traz no desenvolvimento.
- Shadcn: Utilizado para agilizar a criação de componentes mais complexos. No projeto foi utilizado no sidebar, tooltips, formulários e popups.
- React Hook Form: Gerenciou os formulários de adição e edição de informações das marcações no mapa.
- Leaflet: Foi o mapa interativo escolhido para o projeto pela simplificade na implementação e intuitividade no uso.
- Sonner: Ferramenta utilizada para acionar os toasters sempre que o formulário era enviado, com mensagem de sucesso ou falha.
- Lucide React Icons: Todos os ícones do projeto foram utilizados através do Lucide.
- ContextAPI: Foi usado na aplicação para que ele pudesse distribuir as funções de forma mais precisa para os componentes evitando o prop drilling.

#### Considerações
- As chamadas foram feitas através do 'services/api.js', e as funções com esses endpoints são chamadas dentro de um context (LocationContext) que gerencia tudo relacionado às localizações dentro da aplicação.
- Foi criado um hook customizado (useLocation) para que cada uma dos métodos (GET, POST, PUT e DELETE) pudesse ser chamado de forma individual dentro de um componente que teria alguma ação específica.
- Optei por não utilizar variáveis de ambiente por não estar expondo nenhuma key sensível de forma pública, por ser um projeto de teste e evitar qualquer tipo de problemas de conexão para quem for testar o código.
