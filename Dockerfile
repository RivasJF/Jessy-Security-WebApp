# --- Etapa 1: Build ---
FROM node:24-alpine AS build

ARG VITE_API_BASE_URL=/api
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL

RUN corepack enable && corepack install --global pnpm@11.21.0

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
RUN pnpm config set side-effects-cache false
RUN pnpm install --frozen-lockfile --ignore-scripts \
  && pnpm approve-builds --all \
  && pnpm rebuild esbuild

COPY . .

RUN pnpm run build

# --- Etapa 2: Producción ---
FROM nginx:alpine

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
