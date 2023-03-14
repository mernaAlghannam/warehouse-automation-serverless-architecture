
az login

az account set --subscription 222777e5-63af-4bcd-9b37-938e8cd5b92e

az functionapp function keys set -g warehouse-automation_group -n shipping-data-api --function-name update-shipping-data --key-name default


$newapikey = (az functionapp function keys set -g warehouse-automation_group -n shipping-data-api --function-name get-shipping-data --key-name default) 

az account set --subscription 222777e5-63af-4bcd-9b37-938e8cd5b92e

az staticwebapp appsettings set --name warehouse-automator --setting-names "API_KEY=$newapikey"

