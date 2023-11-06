# Use a imagem base do Node.js 18
FROM node:18

# Definindo local de trabalho 
WORKDIR /usr/src/angular-simple-chat

# Copie o código-fonte para o servidor
COPY . .

# Atualizar npm 
RUN npm install -g npm

# Instale o Angular CLI globalmente
RUN npm install -g @angular/cli@14

# Limpando cache e apagando dependencias
RUN npm cache clean --force
RUN rm -rf node_modules
RUN rm -f package-lock.json

# Instale as dependências do projeto
RUN npm install --force

# Exponha a porta 4200 que o aplicativo Angular usa
EXPOSE 4200

# Comando para iniciar o servidor de desenvolvimento do Angular
CMD ["ng", "serve", "--host", "0.0.0.0"]