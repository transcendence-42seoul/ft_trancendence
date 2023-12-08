
FROM node:lts

# Copy the packages files into the container at /app
WORKDIR /app
COPY app/package-lock.json .
COPY app/package.json .

# update npm environment
RUN npm install -g npm@8.19.2
# package.json update
RUN npm install -g npm-check-updates
RUN ncu -u

EXPOSE 5173

# Install any needed packages specified in requirements.txt
RUN npm install

# Copy the rest of the code into the container at /app
COPY app/src ./src
COPY app/public ./public
COPY app/.eslintrc.json .
COPY app/index.html .
COPY app/.prettierrc .
COPY app/tsconfig.json .
COPY app/tsconfig.node.json .
COPY app/tailwind.config.js .
COPY app/vite.config.ts .

# RUN npm run build
ENTRYPOINT npm run dev
