<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# GrAtech AI Dashboard

This contains everything you need to run and deploy your AI Dashboard application.

View your app in AI Studio: https://ai.studio/apps/drive/1Okixw5-QBp0ig4v6UI9kaN8l4dc_Tzxj

## Run Locally

**Prerequisites:** Node.js 20+

1. Install dependencies:
   ```bash
   npm install
   ```
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   ```bash
   npm run dev
   ```

## Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Docker Deployment

Build and run the Docker container locally:

```bash
# Build the image
docker build -t gratech-ai-dashboard .

# Run the container
docker run -p 8080:80 gratech-ai-dashboard
```

Access the application at `http://localhost:8080`

## CI/CD Workflows

This repository includes automated GitHub Actions workflows for deployment and monitoring:

### Azure Deployment (`azure-deploy.yml`)

Triggered on pushes to `main` branch:
- Builds and tests the application
- Creates a Docker image and pushes to GitHub Container Registry
- Deploys to Azure Web App
- Verifies deployment health

**Required Secrets:**
- `AZURE_CREDENTIALS` - Azure service principal credentials

### DNS & SSL Verification (`dns-ssl-verification.yml`)

Scheduled to run every 6 hours:
- Verifies CNAME record configuration
- Checks DNS propagation across global resolvers
- Validates SSL certificate status and expiration
- Generates production readiness report

### Production Tests (`production-tests.yml`)

Runs on pushes and daily:
- Unit tests and build verification
- Endpoint health checks
- Infrastructure validation (DNS, SSL)
- Production readiness confidence score

### GitHub Pages (`deploy.yml`)

Deploys the static dashboard to GitHub Pages for preview.

## Azure Infrastructure

The dashboard monitors the following Azure resources:

- **Resource Group**: gratech-rg
- **API Management**: gratech-api-gateway.azure-api.net
- **Custom Domain**: api.gratech.sa
- **DNS Zone**: Azure DNS with proper NS delegation

## Production Readiness

The system tracks production readiness through:

| Check | Description |
|-------|-------------|
| CNAME Verification | Validates DNS CNAME points to Azure APIM |
| DNS Propagation | Monitors global DNS resolver status |
| SSL Certificate | Checks certificate validity and expiration |
| Endpoint Health | Verifies HTTP 200 response from health endpoint |
| TCP Connectivity | Tests port 443 connectivity |

**Confidence Level**: 100% indicates all checks pass and the system is production ready.
