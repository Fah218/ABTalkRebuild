# Deploying ABTalks on Vercel

Since ABTalks is built with Next.js, deploying it on Vercel (the creators of Next.js) is the fastest and easiest method. Vercel provides zero-configuration deployments for Next.js applications.

## Prerequisites
1. You have pushed your project to a GitHub repository.
2. You have a [Vercel account](https://vercel.com/signup) (you can sign up using your GitHub account).

## Step-by-Step Deployment Guide

### 1. Import Your Project
1. Log in to your [Vercel Dashboard](https://vercel.com/dashboard).
2. Click the **"Add New"** button and select **"Project"**.
3. Connect your GitHub account if you haven't already.
4. Search for your repository (`ABTalkRebuild` or whatever you named it) in the list and click **"Import"**.

### 2. Configure the Project
Vercel will automatically detect that this is a Next.js project. You do not need to change any of the default build settings:
- **Framework Preset:** Next.js
- **Build Command:** `next build`
- **Output Directory:** `.next`

*Note: Since ABTalks uses mocked JSON data (`src/data/*.json`) instead of a live backend database, there are absolutely **no Environment Variables** required for the project to run.*

### 3. Deploy
1. Click the **"Deploy"** button.
2. Vercel will begin building your project. This typically takes 1-2 minutes.
3. Once the build finishes, you will see a success screen with a preview of your live site.

### 4. Visit Your Live Site
Click on the preview image or the generated URL to visit your live deployed application. You can share this URL directly with your teammates or hackathon judges!

---

## Future Updates
Any time you push new code to the `main` branch of your GitHub repository, Vercel will automatically detect the changes and deploy a new version of your site instantly. You don't need to do anything else!
