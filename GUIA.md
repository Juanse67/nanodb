# Guía de instalación (Windows)

Pega los comandos en **PowerShell**.

## 1. Instalar Node.js

1. Entra a https://nodejs.org/es/download
2. Descarga el instalador de **Windows (.msi, 64-bit)**, versión **LTS** (la recomendada).
3. Ábrelo → Siguiente → acepta → Siguiente → **Instalar** (deja todo por defecto).
4. **Cierra y abre PowerShell de nuevo** y comprueba:

```powershell
node -v
npm -v
```

Si ves números de versión, Node está listo.

## 2. Permitir scripts en PowerShell (si da error más adelante)

Abre PowerShell **como administrador** (clic derecho → "Ejecutar como administrador") y ejecuta:

```powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
```

Escribe `S` y Enter. Cierra esa ventana.

## 3. Activar pnpm con Corepack

Corepack viene con Node. En PowerShell normal:

```powershell
corepack enable
corepack prepare pnpm@11.5.2 --activate
pnpm -v
```

Debe mostrar `11.5.2` (es la versión que usa el proyecto).

Si `corepack` da "no se reconoce", reinicia el PC y vuelve a intentarlo (el PATH no se había refrescado).

## 4. Instalar Git

1. Entra a https://git-scm.com/download/win → se descarga solo.
2. Instálalo con **todo por defecto** (Siguiente → Siguiente → Instalar).
3. Cierra y abre PowerShell y comprueba:

```powershell
git --version
```

## 5. Configurar tu identidad en Git

```powershell
git config --global user.name "Juanse"
git config --global user.email "jjpbao@gmail.com"
```

## 6. Instalar VS Code (editor)

1. https://code.visualstudio.com → Download for Windows → instálalo (todo por defecto).
2. Ábrelo.

## 7. Iniciar sesión en GitHub dentro de VS Code

1. En VS Code, abajo a la izquierda, icono de **cuenta** (👤) → **Sign in with GitHub**.
2. Se abre el navegador → **Authorize** → vuelve a VS Code.

## 8. Descargar (clonar) el proyecto

```powershell
cd $HOME\Documents
git clone https://github.com/Juanse67/nanodb.git
cd nanodb
```

Si pide usuario/contraseña: usuario `Juanse67`, y como contraseña un **token** de GitHub
(Settings → Developer settings → Personal access tokens, scope `repo`). Con el paso 7 normalmente no hace falta.

## 9. Crear el archivo de secretos `.env`

Este archivo **no** está en GitHub (tiene contraseñas). Créalo:

```powershell
notepad .env
```

Notepad preguntará si crearlo → **Sí**. Pega esto (con los valores reales):

```
NGROK_AUTHTOKEN=tu-token-de-ngrok
NGROK_DOMAIN=tu-nombre.ngrok-free.app
DATABASE_URL=postgresql://usuario:clave@host.neon.tech/basedatos?sslmode=require
```

Guarda (Ctrl+S) y cierra.

## 10. Instalar las dependencias del proyecto

```powershell
pnpm install
```

## 11. Probar la app en local

```powershell
pnpm dev
```

Abre en el navegador: http://localhost:3000
Para parar: `Ctrl+C` en PowerShell.

---

## Flujo de trabajo del día a día

Para hacer cambios y subirlos:

```powershell
# 1. baja lo último
git pull

# 2. (edita el código en VS Code)

# 3. sube tus cambios
git add -A
git commit -m "describe el cambio"
git push
```

Para que el cambio salga en internet (en el NAS): alguien con acceso al NAS ejecuta `./deploy.sh` ahí.
El PC del trabajo solo edita y sube a GitHub; el NAS es quien publica.
