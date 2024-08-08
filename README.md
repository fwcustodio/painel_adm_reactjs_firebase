# ADM Panel - ReactJS and Firebase

# Requirements

- Node 20
- Google billing account with registered credit card. (Required to use the Blaze version of Firebase - Per use). Functions do not work without this active plan. Does not generate initial cost

# Panel Features

- Users
- Routes
- Blog Posts
- Blog Categories
- Blog Authors
- Completed Projects
- Github Projects (Integration with Github, just configure with the Github Access Tokin in Settings)
- Service Providers
- Reports

# Steps to run:

- Create a Firebase project, enabling Firebase Hosting
- Enable and create a Firestore database. When creating, define the Access Rules as test.
- Enable and create the Realtime Database. Get and save the access link, something like:
```sh
https://admin-panel---teste-default-rtdb.firebaseio.com
```
- Enable Firebase Authentication, and login by email and password
- In project settings->General Create a new Web application and get the firebaseConfig JSON to put in the React application
- Put the firebaseConfig in the file:
```sh
src/config/firebase/index.js
```
- Add the databaseURL, which is the Realtime Database link, put it in firebaseConfig and in serviceAccountKey.json
- In project settings->Service Accounts Generate a new serviceAccount private key to put in the application functions
- Download the JSON and put it in:
```sh
functions/serviceAccountKey.json
```
- Change the name of the ProjectID in the files in the repository root: .firebaserc and firebase.json
- Configure the Firebase CLI to deploy the functions and web application on Firebase Hosting

- With the project and Firebase CLI all configured, install the node packages for the application and for the Firebase functions
- Run NPM Install or yarn in the root of the application and in the /functions folder

- Generate the first build, with the bat:
```sh
run_build.bat
```
- Once completed, do the first deploy with the Firebase CLI, which will upload the application to the Hosting and the functions, with the bat:
```sh
run_deploy.bat
```
- After the first deploy is completed, the application is 100% operational, to be used on the Hosting and locally

- Open the application running locally, with the bat:
```sh
run_start.bat
```
- Open the application and do the first Login
- Enter any email and password. It will be the Master email of the application.

PORTUGUES

# Painel ADM - ReactJS e Firebase

# Requisitos

- Node 20
- Conta de faturamento Google com cartao de crédito cadastrado. (Necessário para usar a versão Blaze do Firebase - Por utilizazão). As functions não funcionam sem este plano Ativo. Não gera custo inicialmente

# Funcionalidades do Painel

- Usuários
- Rotas
- Blog Posts
- Blog Categorias
- Blog Autores
- Projetos Concluidos
- Projetos Github( Integração com o Github, basta configurar com o Tokin de Acesso Github em Configurações)
- Prestadores de Serviços
- Relatórios

# Passos para rodar:

- Criar projeto Firebase, habilitando o Firebase Hosting
- Habilitar e criar banco Firestore. Ao criar, definir as Rules de acesso como de teste.
- Habilitar e criar o Realtime Database. Pegar e guardar o link de acesso, algo como:
```sh
 https://painel-adm---teste-default-rtdb.firebaseio.com
```
- Habilitar o Firebase Autentication, e o login por email e senha
- Em configurações do projeto->Geral Criar um novo aplicativo Web e pegar o JSON firebaseConfig para colocar na aplicação React
- Colocar o firebaseConfig no arquivo:
```sh
src/config/firebase/index.js
```
- Adicionar o databaseURL, que é o link do Realtime Database, colocar no firebaseConfig e no serviceAccountKey.json
- Em configurações do projeto->Contas de serviço Gerar uma nova chave privada serviceAccount para colocar nas functions da aplicação
- Fazer o download do JSON e colocar em:
```sh
functions/serviceAccountKey.json
```
- Alterar o nome do ProjetoID nos arquivos na raiz do repositorio: .firebaserc e firebase.json
- Configurar o firebase CLI para fazer deploy das functions e aplicação Web no Firebase Hosting

- Com o projeto e o Firebase CLI todo configurado, instalar os pacotes node, para a aplicação e para as function firebase
- Rodar NPM Install ou yarn na raiz da aplicação e na pasta /functions

- Gerar a primeira build, com o bat: 
```sh
run_build.bat
```  
- Após concluido, fazer o primeiro deploy com o Firebase CLI, que vai subir a aplicação para o Hosting e as functions, com o bat:
```sh
 run_deploy.bat
```  
- Apos concluido o primeiro deploy, a aplicação esta 100% operacional, para ser usada no Hosting e localmente

- Abrir a aplicação rodando localmente, com o bat:
```sh
run_start.bat
```   
- Abrir a aplicação e fazer o primeiro Login
- Colocar qualquer email e senha. Será o email Master da aplicação.
