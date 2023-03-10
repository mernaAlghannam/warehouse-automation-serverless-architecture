# Input bindings are passed in via param block.
param($Timer)

# Get the current universal time in the default string format.
$currentUTCtime = (Get-Date).ToUniversalTime()

# The 'IsPastDue' property is 'true' when the current function invocation is later than scheduled.
if ($Timer.IsPastDue) {
    Write-Host "PowerShell timer is running late!"
}

# Invoke-WebRequest -Uri https://aka.ms/installazurecliwindows -OutFile .\AzureCLI.msi; Start-Process msiexec.exe -Wait -ArgumentList '/I AzureCLI.msi /quiet'; rm .\AzureCLI.msi

Get-Module -Name Az -ListAvailable
Import-Module Az

$new-api-key = New-Guid

az functionapp function keys set -g warehouse-automation_group -n shipping-data-api --function-name update-shipping-data --key-name default


az functionapp function keys set -g warehouse-automation_group -n shipping-data-api --function-name get-shipping-data --key-name default --key-value $new-api-key

az staticwebapp appsettings set --name warehouse-automator --setting-names "REACT_APP_NOT_SECRET_CODE=$new-api-key"

# Write an information log with the current time.
Write-Host "PowerShell timer trigger function ran! TIME: $currentUTCtime"

