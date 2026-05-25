output "resource_group_name" {
  description = "Resource group hosting the Static Web App."
  value       = data.azurerm_resource_group.main.name
}

output "static_web_app_name" {
  description = "Name of the Azure Static Web App."
  value       = azurerm_static_web_app.landing.name
}

output "static_web_app_default_host_name" {
  description = "Default hostname (e.g. for DNS CNAME)."
  value       = azurerm_static_web_app.landing.default_host_name
}

output "static_web_app_id" {
  description = "Azure resource ID of the Static Web App."
  value       = azurerm_static_web_app.landing.id
}

output "static_web_app_api_key" {
  description = "Deployment token for GitHub Actions (store as AZURE_STATIC_WEB_APPS_API_TOKEN)."
  value       = azurerm_static_web_app.landing.api_key
  sensitive   = true
}

output "storage_account_name" {
  description = "Storage account used for contact submissions (Table Storage)."
  value       = azurerm_storage_account.landing.name
}

output "contact_table_name" {
  description = "Table Storage table for contact submissions."
  value       = azurerm_storage_table.contact_submissions.name
}

output "storage_primary_connection_string" {
  description = "Storage connection string (sensitive). Also set on SWA app settings for the API."
  value       = azurerm_storage_account.landing.primary_connection_string
  sensitive   = true
}
