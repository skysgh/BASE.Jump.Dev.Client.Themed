// ======================================================================
// References
// ======================================================================
// https://learn.microsoft.com/en-us/azure/templates/microsoft.sql/servers?pivots=deployment-language-bicep
// https://learn.microsoft.com/en-us/azure/azure-sql/database/single-database-create-bicep-quickstart?view=azuresql&tabs=CLI

// ======================================================================
// Import Shared Settings
// ======================================================================
var sharedSettings = loadJsonContent('../../../settings/shared.json')

// Scope is parent resourceGroup:
targetScope='resourceGroup'

// ======================================================================
// Default Name, Location, Tags,
// ======================================================================
@description('The name of the project. This informs automation of naming of resource groups, services, etc.')
param projectName string

@description('The name of the project. This informs automation of naming of resource groups, services, etc.')
param projectServiceName string

@description('The name of the project environment. This informs automation of naming of resource groups, services, etc.')
@allowed (['NP','BT', 'DT','ST','UT','IT','PP','TR','PR'])
param projectEnvironmentId string

@description('The default location for resources. ')
//@allowed ([...])
param resourceLocationId string

@description('The default tags to merge in.')
param resourceTags object = {}

// ======================================================================
// Default SKU, Kind, Tier where applicable
// ======================================================================


// ======================================================================
// Resource other Params
// ======================================================================
@description('The server\'s admin account name. ')
param adminUserName string

@description('The server\'s admin account password. Must have 3 of 4 of [a-z], [A-Z], [0-9], or [specialchars]')
@minLength(8)
@maxLength(128)
@secure()
param adminPassword string


// ======================================================================
// Default Variables: useResourceName, useTags
// ======================================================================
# Concat the pieces together:
var useName = toUpper( concat(projectName, (isEmpty(projectServiceName) ?'':'_'), projectServiceName, projectEnvironmentId) )
var useLocation = resourceLocationId
var useTags = union(resourceTags,sharedSettings.defaultTags)

// ======================================================================
// Resource bicep
// ======================================================================
resource resource 'Microsoft.Sql/servers@2023-05-01-preview' = {
  name: useName
  location: useLocation
  tags: useTags

//  identity: {
//    type: 'string'
//    userAssignedIdentities: {
//      {customized property}: {}
//    }
//  }
  properties: {
    administratorLogin: adminUserName
    administratorLoginPassword: adminPassword

//    administrators: {
//       administratorType: 'ActiveDirectory'
//       azureADOnlyAuthentication: bool
//       login: 'string'
//       principalType: 'string'
//       sid: 'string'
//       tenantId: 'string'
//     }
//     federatedClientId: 'string'
//     isIPv6Enabled: 'string'
//     keyId: 'string'
//     minimalTlsVersion: 'string'
//     primaryUserAssignedIdentityId: 'string'
//     publicNetworkAccess: 'string'
//     restrictOutboundNetworkAccess: 'string'
//     version: 'string'
  }
}

// ======================================================================
// Default Outputs: resource, resourceId, resourceName & variable sink
// ======================================================================
// Provide ref to developed resource:
output resource object = resource
// return the id (the fully qualitified name) of the newly created resource:
output resourceId string = resource.id
// return the (short) name of the newly created resource:
output resourceName string = resource.name
// param sink (to not cause error if param is not used):
output _ bool = startsWith(concat('${sharedSettings.version}'), '.')
