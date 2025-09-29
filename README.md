# Atividade Prática - eTopocart

Sou o Thiago Santos e esse é meu projeto para o teste prático.

✉️: thiago.sullivan.dev@gmail.com <br>
🔗: https://thiagosullivanportfolio.vercel.app/ <br>
ℹ️: https://www.linkedin.com/in/thiagosullivan/

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
#### Testes de endpoint
Após o projeto estar rodando é possível acessar a página http://localhost:8000/docs para realizar testes nos endpoints.

⚠️ É necessário ter o Python 3 instalado.
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

#### ⚠️ Observações
O backend por padrão está rodando no http://localhost:8000/ <br>
O frontend por padrão está rodando no http://localhost:5173/ <br>
Caso ocorra qualquer problema devido ao CORS pode ser resolvido entrando no arquivo main.py e alterar o allow_origins para:
```
allow_origins=["*"],
```
Se necessário por acaso o backend estiver rodando em outra porta que não seja a 8000, pode ser resolvido entrando no arquivo vite.config.js
E alterar o 'target'
```
proxy: {
    '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
    },
},
```
