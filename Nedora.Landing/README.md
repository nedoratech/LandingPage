# Nedora Landing

Monorepo for the Nedora marketing site and contact API on **Azure Static Web Apps**.

## Repository layout

```text
client-app/          # Next.js static site (EN/RO)
apis/                # Azure Functions — contact form → Table Storage
infrastructure/      # Terraform (existing resource group, SWA, storage)
```

## Features

- Bilingual **EN** / **RO** (browser `ro-*` detection + manual toggle)
- Atomic UI components per section
- Contact form persisted to **Azure Table Storage** via `POST /api/contact`

## Local development

### Client only

```bash
cd client-app
yarn install
yarn dev
```

### Full stack (site + API)

Use [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/):

```bash
cd client-app && yarn install && yarn build
cd ../apis && yarn install && yarn build
swa start client-app --api-location apis
```

Form posts to `http://localhost:4280/api/contact`. Set `TABLE_STORAGE_CONNECTION_STRING` and `CONTACT_TABLE_NAME` (see `apis/.env.example`) or use Azurite.

## Deploy

### 1. Terraform

```bash
cd infrastructure/terraform
cp terraform.tfvars.example terraform.tfvars
# resource_group_name, static_web_app_name, storage_account_name

terraform init && terraform apply
terraform output -raw static_web_app_api_key
```

### 2. GitHub Actions

Secret: `AZURE_STATIC_WEB_APPS_API_TOKEN` (from Terraform).

Push to `main` — builds `client-app/out` and deploys `apis` as SWA managed functions.

## Table Storage keys (contact form)

| Key | Value | Rationale |
|-----|--------|-----------|
| **PartitionKey** | `yyyy-MM` (UTC) | Spread writes by month; easy reporting |
| **RowKey** | `{invertedTicks}_{uuid}` | Newest-first order within month; unique |

Details: [apis/DESIGN.md](apis/DESIGN.md).

## Parallel work

| Area | Path |
|------|------|
| English copy | `client-app/src/i18n/messages/en.ts` |
| Romanian copy | `client-app/src/i18n/messages/ro.ts` |
| UI sections | `client-app/src/components/organisms/` |
| Contact API | `apis/src/functions/contact.ts` |
| Infrastructure | `infrastructure/terraform/` |

## License

Proprietary — Nedora.
