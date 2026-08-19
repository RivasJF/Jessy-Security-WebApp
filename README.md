# Jessy Security

Gestor de credenciales con arquitectura zero-knowledge. El servidor nunca accede a datos en texto plano: todo el cifrado y descifrado se ejecuta exclusivamente en el cliente.

## Stack Tecnológico

- **Frontend:** React 19, TypeScript 6, Vite 8
- **Estado:** Zustand (in-memory), TanStack React Query
- **Formularios:** react-hook-form
- **HTTP:** Axios con interceptores JWT
- **Estilos:** Tailwind CSS 4
- **Criptografía:** `@noble/ciphers`, `@noble/curves`, `hash-wasm`

## Arquitectura Zero-Knowledge

El patrón de seguridad se basa en que la contraseña del usuario nunca abandona el navegador. El servidor almacena únicamente la clave pública derivada de la contraseña y el salt, junto con los datos cifrados que no puede descifrar. Esto garantiza que ni una brecha en el servidor ni un ataque man-in-the-middle puedan exponer las credenciales en texto plano.

```
Contraseña del usuario (nunca sale del cliente)
        │
        ▼
   ┌─────────────┐
   │   Argon2id   │  Hash de contraseña con salt aleatorio
   └──────┬──────┘
          ▼
   ┌─────────────┐
   │   Ed25519    │  Derivación de par de claves
   └──────┬──────┘
          │
          ├──► publicKey  ──► Servidor (para autenticación)
          │
          └──► secretKey  ──► Zustand store (nunca sale del cliente)
                    │
                    ▼
          ┌─────────────────┐
          │ XChaCha20-Poly1305 │  Cifrado simétrico de datos del vault
          └─────────────────┘
```

## Algoritmos Criptográficos

### Argon2id — Derivación de clave (KDF)

Algoritmo memory-hard resistente a ataques GPU/ASIC. Utilizado para convertir la contraseña del usuario en un hash seguro que sirve como semilla para la generación de claves.

| Parámetro       | Valor        |
|-----------------|--------------|
| Variante        | Argon2id (híbrida i/d) |
| Iteraciones     | 3            |
| Paralelismo     | 4 hilos      |
| Memoria         | 16 MiB (2¹⁴ KiB) |
| Longitud salida | 32 bytes (256 bits) |
| Formato salida  | Hexadecimal  |

**Módulo:** `src/shared/encoder/hash.ts`

### Ed25519 — Derivación de par de claves asimétricas

El hash Argon2id se utiliza como semilla (seed) para generar un par de claves Ed25519. La clave pública se envía al servidor; la clave secreta permanece exclusivamente en el cliente y se usa como clave simétrica para cifrar datos del vault.

- **Clave pública:** Se envía al servidor en registro/login para autenticación.
- **Clave secreta:** 32 bytes hex, almacenada solo en el store de Zustand (memoria volátil).

**Módulo:** `src/shared/encoder/keys.ts`

### XChaCha20-Poly1305 — Cifrado simétrico AEAD

Cifrado autenticado con extensión de nonce (24 bytes). Cada campo adicional del vault (contraseñas, PINs, códigos, etc.) se cifra individualmente con un nonce aleatorio único.

| Parámetro      | Valor               |
|----------------|---------------------|
| Algoritmo      | XChaCha20-Poly1305  |
| Tamaño clave   | 32 bytes            |
| Tamaño nonce   | 24 bytes (aleatorio)|
| Tipo           | AEAD (confidencialidad + integridad) |
| Formato datos  | Ciphertext hex con nonce almacenado junto al registro |

**Módulo:** `src/shared/encoder/cypher.ts`

## Flujo de Autenticación

### Registro

1. El usuario ingresa nombre de usuario, email y contraseña.
2. Se genera un salt aleatorio de 32 bytes.
3. La contraseña se hashea con **Argon2id** usando el salt.
4. Se deriva un par de claves **Ed25519** a partir del hash.
5. Se envía al servidor: `{ email, username, publicKey, publicSalt }`.
6. La contraseña y la clave secreta **nunca** se transmiten.
7. El servidor retorna un JWT `access_token`.
8. La clave secreta y el token se almacenan en Zustand (in-memory).

### Login

1. El usuario ingresa email y contraseña.
2. Se solicita el salt al servidor: `GET /auth/salt/{email}`.
3. La contraseña se hashea localmente con **Argon2id** usando el salt recibido.
4. Se deriva el par de claves **Ed25519** a partir del hash.
5. Se envía al servidor: `{ email, publicKey }`.
6. El servidor verifica que la clave pública coincida con la registrada.
7. Se retorna un JWT `access_token`.

### Gestión de Sesión

- El token JWT se almacena en Zustand (estado en memoria, no persistente).
- Un interceptor de Axios adjunta `Authorization: Bearer <token>` a cada petición.
- En errores 401/403, se intenta refresh automático via `POST /auth/refresh`.
- Si el refresh falla, se ejecuta logout limpiando todo el store.

**Módulo:** `src/lib/api.ts`

## Cifrado de Datos del Vault

Los campos "información adicional" de cada cuenta (contraseñas, PINs, emails, teléfonos, URLs, notas, personalizados) se cifran antes de enviarse al servidor:

1. Cada campo se cifra individualmente con **XChaCha20-Poly1305**.
2. Se genera un nonce aleatorio de 24 bytes por campo.
3. El nonce se almacena junto al ciphertext en el servidor (el nonce no es secreto).
4. La clave secreta (Ed25519) nunca se envía al servidor.

Al visualizar o editar, los campos se descifran localmente y se muestran enmascarados (`******`) por defecto.

**Módulos:**
- `src/features/accounts/services/Encriptyng.service.ts` — lógica de cifrado/descifrado
- `src/features/accounts/components/TargetAdditionalInformation.tsx` — visualización con toggle de descifrado
- `src/features/accounts/components/InputDecript.tsx` — descifrado bajo demanda al enfocar

## Instalación

```bash
pnpm install
pnpm dev
```

## Comandos Disponibles

| Comando       | Descripción                     |
|---------------|---------------------------------|
| `pnpm dev`    | Servidor de desarrollo (HMR)    |
| `pnpm build`  | Build de producción             |
| `pnpm preview`| Vista previa del build          |
| `pnpm test`   | Ejecutar tests (Vitest)         |
| `pnpm lint`   | Linter (ESLint)                 |

## Estructura del Proyecto

```
src/
├── features/
│   ├── auth/           # Autenticación (login, registro, store, API)
│   └── accounts/       # Gestión de cuentas (CRUD, cifrado, formularios)
├── shared/
│   ├── encoder/        # Módulos criptográficos (hash, cipher, keys)
│   ├── types/          # Tipos compartidos (KeyPair, ApiErrorResponse)
│   └── components/     # Componentes reutilizables
├── lib/
│   └── api.ts          # Instancia Axios con interceptores JWT
├── router/             # Enrutamiento y guardias de protección
├── pages/              # Páginas de la aplicación
└── main.tsx            # Punto de entrada
```
