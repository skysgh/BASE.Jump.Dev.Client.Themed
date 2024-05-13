// ------------------------------------------------------------
// ------------------------------------------------------------
var sharedSettings = loadJsonContent('../settings/shared.json')
// ------------------------------------------------------------
// ------------------------------------------------------------
targetScope='subscription'
// ------------------------------------------------------------
// ------------------------------------------------------------
// Resources Groups are part of the general subscription
@description('The project name. This informs automation of naming of resource groups, services, etc. e.g.: \'BASE\'')
param projectName string

@description('The project service name. Name used to build resources. e.g.: \'SERVICE\'')
param projectServiceName string = 'SERVICE'

@allowed (['NP','BT', 'DT','ST','UT','IT','TR','PP','PR'])
param environmentId string
// ------------------------------------------------------------
// ------------------------------------------------------------
@description('The tags for this resource. ')
param resourceTags object = {}
// ------------------------------------------------------------
// ------------------------------------------------------------
@description('The default location of resources. ')
// @allowed(...too long...)
param resourceLocationId string

@description('The location of the parent resource group. ')
// @allowed(...too long...)
param resourceGroupLocationId string = resourceLocationId

@description('The location of the parent resource group. ')
// @allowed(...too long...)
param storageAccountsLocationId string = resourceGroupLocationId 
// ------------------------------------------------------------
// ------------------------------------------------------------

// ------------------------------------------------------------
// 
// ------------------------------------------------------------
var tmp = empty(projectServiceName) ? '_':'_${projectServiceName}_'
var fullName = '${projectName}${tmp}${environmentId}' 
var shortName = projectName
//var uniqueSuffix = uniqueString(resourceGroup().id)
var groupResourceName =  toUpper(sharedSettings.namingConventions.parentNameIsLonger ?  fullName : shortName)
var parentResourceName = toUpper(sharedSettings.namingConventions.parentNameIsLonger ? fullName : shortName)
var childResourceName =  toUpper(sharedSettings.namingConventions.parentNameIsLonger ? shortName : fullName)
var defaultTags = {project: projectName, service: projectServiceName, environment: environmentId}
var useTags = union(resourceTags, defaultTags)
// ------------------------------------------------------------
var uniqueSuffix = uniqueString(subscription().subscriptionId)
// ------------------------------------------------------------


// ------------------------------------------------------------
module resourceGroupsModule '../microsoft/resources/resourcegroups.bicep' = {
  name:  '${deployment().name}_resourcegroups_module'
  scope: subscription()
  params: {
    resourceName: groupResourceName
    resourceLocationId: groupResourceLocationId
    resourceTags: useTags
  }
}
// ------------------------------------------------------------
module storageAccountsModule '../microsoft/storage/storageaccounts.bicep' = {
  // should be implied: 
  dependsOn: [resourceGroupsModule]
  name:  '${deployment().name}_storageaccounts_module'
  scope: resourceGroup(groupResourceName) 
  params: {
    resourceName: childResourceName
    resourceLocationId: storageAccountsLocationId
    resourceTags: useTags

    resourceSKU: storageAccountsSKU
  }
}






// ------------------------------------------------------------
//
// ------------------------------------------------------------
output resourceId string = storageAccountsModule.outputs.resourceId
output resourceName string = storageAccountsModule.outputs.resourceName
// param sink (to not cause error if param is not used):
output _ bool = startsWith('${sharedSettings.version}=${resourceLocationId}', '.')