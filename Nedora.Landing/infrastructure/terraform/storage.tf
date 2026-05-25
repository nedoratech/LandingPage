resource "azurerm_storage_account" "landing" {
  name                     = var.storage_account_name
  resource_group_name      = data.azurerm_resource_group.main.name
  location                 = coalesce(var.storage_location, data.azurerm_resource_group.main.location)
  account_tier             = "Standard"
  account_replication_type = var.storage_replication_type
  min_tls_version          = "TLS1_2"

  tags = var.tags

  blob_properties {
    delete_retention_policy {
      days = 7
    }
  }
}

resource "azurerm_storage_table" "contact_submissions" {
  name                 = var.contact_table_name
  storage_account_name = azurerm_storage_account.landing.name
}
