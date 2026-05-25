# Nedora Landing — Azure infrastructure

Terraform provisions:

- **Azure Static Web App** (existing resource group)
- **Storage account** + **Table Storage** table for contact submissions
- SWA **app settings** wiring the API to storage

It does **not** create the resource group.

## Quick start

```bash
cd infrastructure/terraform
cp terraform.tfvars.example terraform.tfvars
# Edit: resource_group_name, static_web_app_name, storage_account_name

terraform init
terraform plan
terraform apply
```

```bash
terraform output -raw static_web_app_api_key   # → GitHub secret AZURE_STATIC_WEB_APPS_API_TOKEN
```

## Variables

| Variable | Description |
|----------|-------------|
| `resource_group_name` | **Required.** Existing RG name |
| `static_web_app_name` | **Required.** Globally unique SWA name |
| `storage_account_name` | **Required.** Globally unique storage account (3–24 chars, lowercase) |
| `contact_table_name` | Table name (default `ContactSubmissions`) |
| `location` | SWA region (default `westeurope`) |
| `storage_location` | Storage region (defaults to RG location) |
| `sku_tier` / `sku_size` | `Free` or `Standard` |

## Contact submissions storage

Table keys are documented in [`apis/DESIGN.md`](../../apis/DESIGN.md).

Connection string is injected into the SWA API as `TABLE_STORAGE_CONNECTION_STRING`.
