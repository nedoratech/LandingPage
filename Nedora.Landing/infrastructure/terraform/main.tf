data "azurerm_resource_group" "main" {
  name = var.resource_group_name
}

resource "azurerm_static_web_app" "landing" {
  name                = var.static_web_app_name
  resource_group_name = data.azurerm_resource_group.main.name
  location            = var.location
  sku_tier            = var.sku_tier
  sku_size            = var.sku_size
  tags                = var.tags

  repository_url    = var.repository_url
  repository_branch = var.repository_branch
  repository_token  = var.repository_token

  app_settings = {
    TABLE_STORAGE_CONNECTION_STRING = azurerm_storage_account.landing.primary_connection_string
    CONTACT_TABLE_NAME              = azurerm_storage_table.contact_submissions.name
  }
}
