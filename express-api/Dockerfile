#Исполюзуем образ линукс Alpine с версией node 14
FROM node:19.5.0-alpine


# Указиваем нашу робочую дерикторию
WORKDIR /app

# Скопировать packege.json и package-lock.json внутрь контейнера
COPY package*.json ./

#Устанавливаем зависимости
RUN npm install

#Копируем оставшееся приложение в контейнер
COPY . .

#Ecnfyfdbnm Prisma
RUN npm install -g prisma

# Генерируем Prisma client
RUN prisma generate

# Копируем Prisma shema
COPY prisma/schema.prisma ./prisma/

#Открить портв нашем контейнере
EXPOSE 3000

#Запускаем наш серве
CMD [ "npm", "start" ]
