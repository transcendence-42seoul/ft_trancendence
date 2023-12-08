FROM node:lts-alpine

# Copy the packages files into the container at /app
WORKDIR /app
COPY app/package-lock.json .
COPY app/package.json .

# update npm environment
RUN npm install -g npm@8.19.2
# package.json update
RUN npm install -g npm-check-updates
RUN ncu -u

EXPOSE 3000

# Install any needed packages specified in requirements.txt
RUN npm install

# Copy the rest of the code into the container at /app
COPY app/src ./src
COPY app/.eslintrc.js .
COPY app/.prettierrc .
COPY app/nest-cli.json .
COPY app/tsconfig.build.json .
COPY app/tsconfig.json .

# RUN npm run build
ENTRYPOINT npm run start:dev
# CMD ["npm", "run", "start:dev"]
