variable "resource_group_name" {
  description = "Name of the existing Azure resource group."
  type        = string
}

variable "static_web_app_name" {
  description = "Globally unique name for the Azure Static Web App."
  type        = string
}

variable "location" {
  description = "Azure region for the Static Web App (must support SWA)."
  type        = string
  default     = "westeurope"
}

variable "sku_tier" {
  description = "SKU tier: Free or Standard."
  type        = string
  default     = "Free"

  validation {
    condition     = contains(["Free", "Standard"], var.sku_tier)
    error_message = "sku_tier must be Free or Standard."
  }
}

variable "sku_size" {
  description = "SKU size: Free or Standard."
  type        = string
  default     = "Free"

  validation {
    condition     = contains(["Free", "Standard"], var.sku_size)
    error_message = "sku_size must be Free or Standard."
  }
}

variable "tags" {
  description = "Tags applied to managed resources."
  type        = map(string)
  default = {
    project     = "nedora-landing"
    managed_by  = "terraform"
  }
}

variable "repository_url" {
  description = "Optional Git repository URL for SWA deployment integration."
  type        = string
  default     = null
}

variable "repository_branch" {
  description = "Branch used for SWA deployments when repository_url is set."
  type        = string
  default     = "main"
}

variable "repository_token" {
  description = "GitHub PAT for SWA deployment integration (sensitive). Leave null to configure deployment manually."
  type        = string
  default     = null
  sensitive   = true
}

variable "storage_account_name" {
  description = "Globally unique name for the storage account (3-24 lowercase letters and numbers)."
  type        = string
}

variable "storage_location" {
  description = "Azure region for the storage account. Defaults to the resource group location."
  type        = string
  default     = null
}

variable "storage_replication_type" {
  description = "Storage replication: LRS, GRS, RAGRS, ZRS, GZRS, RAGZRS."
  type        = string
  default     = "LRS"
}

variable "contact_table_name" {
  description = "Table Storage table name for contact form submissions."
  type        = string
  default     = "ContactSubmissions"
}
