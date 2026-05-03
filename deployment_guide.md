# 🌐 Railway Deployment Guide (Full-Stack MERN)

This guide provides exactly how to deploy your full-stack app to **Railway** to make it fully live and accessible for submission.

## 📦 Step 1: Push the Code to GitHub
Ensure all your code is committed and pushed to a public or private GitHub repository.
1. Create a repository on GitHub.
2. Link your local directory to the repository:
   ```bash
   git init
   git add .
   git commit -m "Initial commit for Ethara Tasks"
   git branch -M main
   git remote add origin https://github.com/YOUR_GITHUB_USERNAME/YOUR_REPO_NAME.git
   git push -u origin main
   ```

---

## 🚀 Step 2: Deploy Backend to Railway

1. Go to [Railway.app](https://railway.app/) and sign in with GitHub.
2. Click on **+ New Project** -> **Deploy from GitHub repo**.
3. Select your repository.
4. Go to **Variables** tab for the service and add:
   - `MONGO_URI`: Your MongoDB Atlas connection string (e.g., `mongodb+srv://<username>:<password>@cluster0.../ethara-tasks`)
   - `JWT_SECRET`: Any random secure string (e.g., `4832u9428hjdf8shdf832h9842f`)
   - `PORT`: `5000` (Optional, Railway automatically sets this, but it's good to specify)
   - `NODE_ENV`: `production`

> **Note on MongoDB**: We have transitioned to using a real Cloud MongoDB instance to ensure persistent data storage. Without this variable, the server will error out or fall back to an ephemeral memory server.

### 🔧 Important Railway Configuration for the Monorepo
Since your code is a monorepo containing `client` and `server`:
1. Go to the **Settings** tab of the service.
2. In the **Root Directory** setting, change it to `/server`. This tells Railway to build and execute ONLY the server files.
3. Railway will start listening on port 5000, and give you a public domain (e.g., `https://your-backend-service.railway.app`). **Copy this URL**.

---

## 🖥️ Step 3: Configure Frontend to point to Railway Backend

Before building the frontend, you must change the base URLs from `127.0.0.1:5000` to your live Railway backend URL.

1. In `client/src/pages/AuthPage.jsx`, `client/src/pages/Dashboard.jsx`, and `client/src/pages/ProjectBoard.jsx`, replace:
   `http://127.0.0.1:5000` with `https://your-backend-service.railway.app`
2. Commit and push these changes to GitHub:
   ```bash
   git add .
   git commit -m "Configure frontend with live API URL"
   git push
   ```

---

## 🌐 Step 4: Deploy Frontend (Vercel / Railway)

You can deploy the frontend on Railway as a separate service, or use **Vercel** which is highly optimized for Vite.

### Option A: Using Railway
1. Inside the same Railway project, click **+ New** -> **GitHub Repo**.
2. Select your repository again.
3. Go to the **Settings** tab.
4. Set the **Root Directory** to `/client`.
5. Set the **Build Command** to `npm run build`.
6. Set the **Install Command** to `npm install`.
7. Railway will generate your live frontend URL.

### Option B: Using Vercel (Recommended for React/Vite)
1. Go to [Vercel.com](https://vercel.com/) and sign in.
2. Click **Add New** -> **Project**.
3. Select your GitHub repository.
4. Set the **Framework Preset** to **Vite**.
5. Set the **Root Directory** to `client`.
6. Click **Deploy**. Your frontend is now live!
