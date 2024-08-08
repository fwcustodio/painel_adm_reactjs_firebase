# Painel ADM - ReactJS e Firebase

# Requisitos

- Node 20
- Conta de faturamento Google com cartao de crédito cadastrado. (Necessário para usar a versão Blaze do Firebase - Por utilizazão). As functions não funcionam sem este plano Ativo. Não gera custo inicialmente

# Funcionalidades do Painel


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
