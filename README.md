# myapp

Next.js + Neon Postgres, deployed on an Asustor NAS via Docker, exposed publicly with Tailscale Funnel.

## Reproduce

### 1. Neon (web)
- Sign up at https://neon.tech (free).
- Create a project → copy the connection string (`postgresql://...neon.tech/...?sslmode=require`).

### 2. Tailscale (web)
- Sign up at https://tailscale.com (free).
- Settings → Keys → generate a **reusable auth key** with tag `tag:web`.
- Settings → **Funnel** → enable for your tailnet.
- Access Controls → add `tag:web` + a Funnel grant.

### 3. Configure
```bash
cp .env.example .env
# fill TS_AUTHKEY + DATABASE_URL
```

### 4. NAS
- App Central → install **Docker Engine**. Enable SSH in ADM.
- Copy this folder into a NAS shared folder.
- SSH in → `cd` here → `docker compose up -d --build`.
- Wait ~30s for the Funnel TLS cert.

### 5. Verify
- `https://myapp.<your-tailnet>.ts.net`
- `https://myapp.<your-tailnet>.ts.net/api/health` → returns DB time.

## Local dev
```bash
pnpm install
echo "DATABASE_URL=..." > .env
pnpm dev   # http://localhost:3000
```

## Next steps before real data
- Add an ORM + migrations (Drizzle or Prisma).
- Add app-level auth (the Funnel URL is public).
