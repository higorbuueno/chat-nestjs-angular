# Use a imagem base do Node.js 18
FROM node:18

# Definindo local de trabalho 
WORKDIR /usr/src/nest-websocket-chat

# Copie o código-fonte para o servidor
COPY . .

# Atualizar npm 
RUN npm install -g npm

# Limpando cache e apagando dependencias
RUN npm cache clean --force
RUN rm -rf node_modules
RUN rm -f package-lock.json

# Instale as dependências do projeto
RUN npm install

# Exponha a porta 3000 que o aplicativo NestJs usa
EXPOSE 3000

# Comando para iniciar o servidor de desenvolvimento do Nest
CMD ["npm", "run", "start:prod"]