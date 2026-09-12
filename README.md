# Bigode Cremas — loja online

Loja simples com:
- Vitrine pública (`/`) com carrinho (localStorage) e botão "Comprar" que abre o WhatsApp.
- Painel administrativo (`/admin`) protegido por senha, para cadastrar produtos, editar, marcar como esgotado/disponível ou excluir.

## Rodando localmente

```bash
npm install
npx prisma migrate dev
npm run dev
```

Abra http://localhost:3000 (loja) e http://localhost:3000/admin (painel).

## Configuração (arquivo `.env`)

- `ADMIN_PASSWORD` — senha de acesso ao painel `/admin`. **Troque antes de publicar.**
- `AUTH_SECRET` — string aleatória grande usada para assinar a sessão de login. **Troque antes de publicar** (ex: gere com `openssl rand -base64 32`).
- `NEXT_PUBLIC_WHATSAPP_NUMBER` — número que recebe os pedidos, formato DDI+DDD+número sem espaços ou símbolos (ex: `5511999999999`).
- `NEXT_PUBLIC_STORE_NAME` — nome exibido no site.

## Importante antes de colocar no ar (deploy)

Este projeto usa **SQLite** (um arquivo de banco de dados local, `prisma/dev.db`) e guarda as fotos dos produtos em `public/uploads/`. Isso funciona perfeitamente em um servidor tradicional (VPS) ou serviços como Railway/Render, onde o disco é permanente.

**Não funciona bem na Vercel** (nem em outras hospedagens "serverless"), porque o disco é apagado a cada novo deploy/reinício — os produtos cadastrados e as fotos sumiriam. Antes de publicar, será necessário:
1. Trocar o banco SQLite por um banco de dados hospedado (ex: Postgres gratuito no [Neon](https://neon.tech) ou [Supabase](https://supabase.com)) — é só trocar a `DATABASE_URL` e o `provider` no `prisma/schema.prisma`.
2. Guardar as fotos em um serviço de armazenamento (ex: Vercel Blob, Cloudflare R2, ou similar) em vez de `public/uploads/`.

Se preferir simplicidade e não pretende usar Vercel, uma VPS simples (ex: um droplet DigitalOcean/Hetzner rodando `npm run build && npm start` com PM2) resolve sem precisar trocar nada — o SQLite funciona direto.

Posso fazer essa adaptação quando for a hora do deploy — é rápido.
