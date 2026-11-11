# Hostinger Production Deployment Guide
## Sudan Sustainability Hub (SSH) Web Platform

This guide provides step-by-step instructions for deploying the **Sudan Sustainability Hub (SSH)** platform to **Hostinger** (Shared Web Hosting, Cloud Hosting, or VPS).

---

## ⚡ Quick Deployment Summary (3 Minutes)

1. Run the build command:
   ```bash
   npm run build
   ```
   *(This creates a production-optimized `dist/` directory containing `index.html`, `assets/`, `.htaccess`, `sitemap.xml`, and `robots.txt`)*

2. Open **Hostinger hPanel** → Go to **Websites** → Click **Manage** next to your domain.
3. Open **File Manager** (under Files).
4. Navigate inside the `public_html/` folder.
5. Upload all the contents from inside the `dist/` folder into `public_html/`.
6. Open your domain (e.g., `https://yourdomain.com`) — your website and management platform are live!

---

## 📁 Pre-Configured Hostinger Files Included

The platform codebase is already tailored with production files for Hostinger:

| File | Destination in Hostinger | Purpose |
| :--- | :--- | :--- |
| **`.htaccess`** | `public_html/.htaccess` | **Crucial for Hostinger**: Prevents 404 errors on page refresh, forces HTTPS, enables GZIP compression, and configures browser caching. |
| **`_redirects`** | `public_html/_redirects` | Fallback SPA routing rule (`/* /index.html 200`). |
| **`sitemap.xml`** | `public_html/sitemap.xml` | Search Engine Optimization (SEO) sitemap for Google/Bing indexing. |
| **`robots.txt`** | `public_html/robots.txt` | Controls crawler access and points to sitemap. |
| **`assets/`** | `public_html/assets/` | Optimized JavaScript, CSS bundles, fonts, and official SSH logos. |

---

## 🛠️ Step-by-Step Deployment Methods

### Method 1: Hostinger hPanel File Manager (Recommended)

1. **Build the production package locally or in AI Studio**:
   ```bash
   npm run build
   ```
   The build files are generated in the `/dist` folder.

2. **Zip the contents of `dist`**:
   - Go inside the `dist/` folder.
   - Select all files (`index.html`, `.htaccess`, `robots.txt`, `sitemap.xml`, and `assets/` folder).
   - Compress them into a file called `ssh-build.zip`.

3. **Log into Hostinger hPanel**:
   - Go to [hpanel.hostinger.com](https://hpanel.hostinger.com).
   - Under **Websites**, select your domain and click **Manage**.
   - Under the **Files** category, click **File Manager**.

4. **Upload and Extract**:
   - Double-click to open `public_html/`.
   - If there is a default placeholder file named `default.php`, delete it.
   - Click the **Upload** icon (top right) → Choose **File** → Select `ssh-build.zip`.
   - Right-click `ssh-build.zip` inside `public_html/` and click **Extract**.
   - Choose `public_html/` as destination and extract.
   - Delete `ssh-build.zip` after extraction.

5. **Verify Hidden Files**:
   - Click the **Settings** (gear icon) in Hostinger File Manager.
   - Ensure **"Show Hidden Files (dotfiles)"** is checked so you can see `.htaccess`.

---

### Method 2: Hostinger Git Automatic Deployment (CI/CD)

If your codebase is stored on GitHub or GitLab:

1. In **Hostinger hPanel**, go to **Advanced** → **Git**.
2. Paste your repository URL:
   `https://github.com/your-org/sudan-sustainability-hub.git`
3. Set the branch to `main`.
4. Set the directory path to `/public_html`.
5. Click **Create**.
6. Set up a GitHub Action or webhook to build on push:
   ```yaml
   name: Deploy to Hostinger
   on:
     push:
       branches: [ main ]
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - uses: actions/checkout@v4
         - uses: actions/setup-node@v4
           with:
             node-version: 20
         - run: npm ci
         - run: npm run build
         # Upload via FTP/SFTP action or Hostinger Webhook
   ```

---

### Method 3: Hostinger FTP / FileZilla Upload

1. In **hPanel**, go to **Files** → **FTP Accounts**.
2. Note your **FTP Host**, **Username**, and **Port** (usually `21`).
3. Connect using FileZilla or Cyberduck.
4. Open the `public_html/` folder on the remote server.
5. Drag and drop all files from your local `dist/` directory into `public_html/`.

---

## 🔒 Free SSL (HTTPS) Activation on Hostinger

1. In **Hostinger hPanel**, go to **Security** → **SSL**.
2. Under **Manage SSL**, click **Install SSL** on your domain.
3. Select the free **Let's Encrypt** SSL certificate.
4. Toggle **"Force HTTPS"** to **ON**.
   *(Note: The provided `.htaccess` file also contains automated HTTPS redirect rules as a double safeguard).*

---

## 🌐 Custom Domain & DNS Settings

To link your official domain (e.g., `sudansustainabilityhub.org`):

1. If your domain is registered with Hostinger:
   - The DNS records point to your hosting automatically.
2. If your domain is registered elsewhere (Namecheap, GoDaddy, Cloudflare):
   - Set Hostinger Nameservers:
     - `ns1.dns-parking.com`
     - `ns2.dns-parking.com`
   - Or add an **A Record** pointing `@` to your Hostinger server IP address (found in hPanel → Server Details).

---

## ❓ Hostinger Frequently Asked Questions & Troubleshooting

### Q: Why do I see a 404 error when refreshing a subpage?
**A:** This happens if the `.htaccess` file is missing. The `.htaccess` file in `/public/.htaccess` includes the required rewrite rules:
```apache
RewriteEngine On
RewriteBase /
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^ index.html [L]
```
Ensure `.htaccess` was uploaded into `public_html/`. In Hostinger File Manager, click Settings (gear icon) → enable "Show hidden files".

### Q: Are my images and logos working on Hostinger?
**A:** Yes. All image assets are stored in the `public/` directory and referenced via relative root paths (`/assets/...`), ensuring clean loading on any Hostinger domain or subdomain.

### Q: Can I run this with Hostinger Node.js?
**A:** Yes. If you have Hostinger Cloud Hosting or VPS with Node.js support, you can run the dev server or express backend with Node.js version 20+. However, standard Hostinger Web Hosting is faster and zero-maintenance when hosting the static `dist/` bundle via LiteSpeed/Apache.

---

*Sudan Sustainability Hub (SSH) — Prepared for Production on Hostinger.*
