// ======================================================================
// Background
// ======================================================================
// There is a Free version of Sql Server that offers 100,000 seconds of
// CPU (a little more than a day). 
// But I don't yet know how to create it via Bicep.

// ======================================================================
// Resources
// ======================================================================
// https://blog.robsewell.com/blog/flexing-my-bicep-deploy-an-azure-sql-database-intro-to-azure-bicep-iac/

// ======================================================================
// Scope
// ======================================================================
//targetScope='resourceGroup'// NO: it stops resourceGroup().location from working: 'subscription'
targetScope='subscription'

// ======================================================================
// Import Shared Settings
// ======================================================================
var sharedSettings = loadJsonContent('../settings/shared.json')

// ======================================================================
// Default Name, Location, Tags,
// ======================================================================
// Resources Groups are part of the general subscription
@description('The name used to build resources. e.g.: \'BASE\'')
@maxLength(11) // Limited by storageAccount name length (24) minus 13 chars for uniqueString(...)
param projectName string

@description('The name used to build resources. e.g.: \'CLIENT\'')
param projectServiceName string = ''

@description('The id of the environment, to append to the name of resource groups. e.g.: \'BT\'')
@allowed([ 'NP',   'BT','DT','ST','UT','IT','PP','TR','PR'])
param environmentId string
// ------------------------------------------------------------
// ------------------------------------------------------------
@description('The tags for this resource. ')
param resourceTags object = {}
// ------------------------------------------------------------
// ------------------------------------------------------------
@description('The lowercase identifier of where to build the resource Group. Default is \'australiacentral\'.')
@allowed([ 'australiacentral'])
param resourceGroupLocationId string //NO. Fails 'resourceGroup().location' if scope is subscriptoin.

@description('Location of Server.')
//TOO Big: @allowed([ 'australiacentral'])
param sqlServerLocationId string  // in case in the future one can use the same as the group.

@description('Location of Database. ')
//TOO Big: @allowed([ 'australiacentral'])
param sqlServerDbLocationId string  // in case in the future one can use the same as the group.


// ======================================================================
// Default SKU, Kind, Tier where applicable
// ======================================================================




// ======================================================================
// SQL SERVER:
// ======================================================================

@description('TODO:...: Default is: \'SystemAssigned,UserAssigned\' permitting creation using dbms admin user name & pwd, and later AAD sourced service account. ')
@allowed(['None', 'SystemAssigned', 'SystemAssigned,UserAssigned', 'UserAssigned' ])
param sqlServerIdentityType string = 'SystemAssigned,UserAssigned'

@description('The minimal Tls Version to use. Default is \'1.3\'.')
@allowed(['1.2','1.3'])
param sqlServerMinimalTlsVersion string = '1.3'

// @allowed(['None', 'UserAssigned'])
//param sqlServerUserType string = 'UserAssigned'

@description('An Admin User\'s Name, to create the DB in the first place. Source from a pipeline environment Secret or pipeline accessible keyvault.')
@minLength(3)
@maxLength(128)
@secure()
param sqlServerAdminUserName string 

@description('An Admin User\'s Pwd, to create the DB in the first place. Source from a pipeline environment Secret or pipeline accessible keyvault. Must have 3 of 4 of [a-z], [A-Z], [0-9], or [specialchars]')
@minLength(8)
@maxLength(128)
@secure()
param sqlServerAdminPassword string 

// ======================================================================
// SQL SERVER DB:
// ======================================================================
@description('The SKU of this resource.The default is \'Basic\' to save costs.')
@allowed(['Basic', 'StandardS0', 'StandardS1', 'StandardS2', 'StandardS3', 'StandardS4', 'StandardS6', 'StandardS7', 'StandardS9', 'StandardS12', 'PremiumP1', 'PremiumP2', 'PremiumP4', 'PremiumP6', 'PremiumP11', 'PremiumP15', 'GP_Gen5_2', 'GP_Gen5_4', 'GP_Gen5_8', 'GP_Gen5_16', 'GP_Gen5_24', 'GP_Gen5_32', 'GP_Gen5_40', 'GP_Gen5_80', 'GP_Gen4_2', 'GP_Gen4_4', 'GP_Gen4_8', 'GP_Gen4_16', 'BC_Gen5_2', 'BC_Gen5_4', 'BC_Gen5_8', 'BC_Gen5_16', 'BC_Gen5_24', 'BC_Gen5_32', 'BC_Gen5_40', 'BC_Gen5_80', 'BC_Gen4_2', 'BC_Gen4_4', 'BC_Gen4_8', 'BC_Gen4_16'])
param sqlServerDbResourceSKU string = 'Basic'

@description('The Tier of this resource. The default is \'Basic\' to save costs.')
@allowed(['Basic', 'Standard', 'Premium', 'GeneralPurpose', 'BusinessCritical'])
param sqlServerDbResourceTier string = (contains(['Basic', 'StandardS0', 'StandardS1', 'StandardS2', 'StandardS3', 'StandardS4', 'StandardS6', 'StandardS7', 'StandardS9', 'StandardS12'], resourceSKU) ? 'Standard': 
(contains(['PremiumP1', 'PremiumP2', 'PremiumP4', 'PremiumP6', 'PremiumP11', 'PremiumP15'], resourceSKU) ?'Premium':
(contains(['GP_Gen5_2', 'GP_Gen5_4', 'GP_Gen5_8', 'GP_Gen5_16', 'GP_Gen5_24', 'GP_Gen5_32', 'GP_Gen5_40', 'GP_Gen5_80', 'GP_Gen4_2', 'GP_Gen4_4', 'GP_Gen4_8', 'GP_Gen4_16'], resourceSKU) ? 'GeneralPurpose':
(contains(['BC_Gen5_2', 'BC_Gen5_4', 'BC_Gen5_8', 'BC_Gen5_16', 'BC_Gen5_24', 'BC_Gen5_32', 'BC_Gen5_40', 'BC_Gen5_80', 'BC_Gen4_2', 'BC_Gen4_4', 'BC_Gen4_8', 'BC_Gen4_16'], resourceSKU) ? 'BusinessCritical' :
'Basic'))))

@description('Time in minutes after which database is automatically paused. A value of -1 means that automatic pause is disabled. Default:2')
param sqlServerDbautoPauseDelay int = 2

@description('Specifies the availability zone the database is pinned to.	Default is\'NoPreference\'')
@allowed(['1', '2', '3', 'NoPreference'])
param sqlServerDbAvailabilityZone string = 'NoPreference'

@description('If the DB is free (one per subscription, then what do to when passing free offer. Default: \'BillOverUsage\'. ')
@allowed(['AutoPause', 'BillOverUsage'])
param sqlServerDbFreeLimitExhaustionBehavior string = 'BillOverUsage'

@description('	Collation of the metadata catalog.. Default is \'DATABASE_DEFAULT\' (which is by default \'SQL_Latin1_General_CP1_CI_AS\').')
@allowed(['DATABASE_DEFAULT', 'SQL_Latin1_General_CP1_CI_AS'])
param sqlServerDbCatalogCollation string = 'DATABASE_DEFAULT'

@description('	Collation of the metadata catalog.. Default is \'SQL_Latin1_General_CP1_CI_AS\'.')
@allowed(['SQL_Latin1_General_CP1_CI_AS'])
param sqlServerDbCollation string = 'SQL_Latin1_General_CP1_CI_AS'


@description('Creation Mode.. Default is \'Default\'.')
@allowed(['Copy', 'Default', 'OnlineSecondary', 'PointInTimeRestore', 'Recovery', 'Restore', 'RestoreExternalBackup', 'RestoreExternalBackupSecondary', 'RestoreLongTermRetentionBackup', 'Secondary'])
param sqlServerDbCreateMode string = 'Default'

@description('Whether the database is a Ledger one, permitting to review historical values. Default is \'true\'.')
param sqlServerDbIsLedgerOn bool = true


@description('Name of Sample database schema to develop . Default is \'\'.')
@allowed(['', 'AdventureWorksLT', 'WideWorldImportersFull', 'WideWorldImportersStd'])
param sqlServerDbSampleName string = ''

@description('Whether or not the database uses free monthly limits. Allowed on one database in a subscription.')
param sqlServerDbUseFreeLimit bool = false

@description('Whether or not this database is zone redundant, which means the replicas of this database will be spread across multiple availability zones. Default: false')
param sqlServerDbZoneRedundant bool = false

// ======================================================================
// Default Variables: useResourceName, useTags
// ======================================================================

// Use formatting. And cleanup if service name not used. There is no trim('_') unfortunately.
var tmp1 = (empty(projectServiceName) ? '':format(sharedSettings.namingConventions.namingPartFormat, projectServiceName))
var tmp2 = (empty(environmentId)      ? '':format(sharedSettings.namingConventions.namingPartFormat, environmentId))
var fullName = replace(format(sharedSettings.namingConventions.namingFormat, projectName, tmp1,tmp2),'__','_') 
var shortName = projectName

var useResourceGroupName =  toUpper(sharedSettings.namingConventions.parentNameIsLonger ?  fullName : shortName)
var useResourceGroupLocation = resourceGroupLocationId

// Sql Server Names can only be lowercase alphanumeric or hyphen (not underscore)
var useServerName = toLower(replace('${useResourceGroupName}-${uniqueString(fullName)}' ,'_','-'))
var useServerLocation = sqlServerLocationId

var useDbInstanceName =  toLower(sharedSettings.namingConventions.parentNameIsLonger ? shortName : fullName)
var useDbInstanceLocation = sqlServerDbLocationId 

var defaultTags = {project: projectName, service: projectServiceName, environment: environmentId}
var useTags = union(resourceTags, defaultTags)

// ======================================================================
// Resource bicep
// ======================================================================

// ======================================================================
module resourceGroupsModule '../microsoft/resources/resourcegroups.bicep' = {
   // pass parameters:
  name:  '${deployment().name}_resourceGroups_module'
  scope:subscription()
  params: {
    resourceName: useResourceGroupName
    resourceLocationId: useResourceGroupLocation
    resourceTags: useTags
  }
}


// ======================================================================
module serversModule '../microsoft/sql/servers.bicep' = {
  // should be implied: 
  dependsOn: [resourceGroupsModule]
  scope: resourceGroup(useResourceGroupName)
  name:  '${deployment().name}_servers_module'

  params: {
    resourceName: useServerName
    resourceLocationId: useServerLocation
    resourceTags: useTags

    
    // resourceSKU:....
    // resourceTier:....

    minimalTlsVersion: sqlServerMinimalTlsVersion
    //userType: sqlServerUserType
    identityType: sqlServerIdentityType
    adminUserName: sqlServerAdminUserName
    adminPassword: sqlServerAdminPassword
  }
}



// ======================================================================
module serversDatabasesModule '../microsoft/sql/servers/databases.bicep' = {
  // should be implied: 
  dependsOn: [resourceGroupsModule,serversModule]
  // parent: serversModule
  scope: resourceGroup(useResourceGroupName)
  name:  '${deployment().name}_servers_databases_module'

  params: {
    // Refer to parent website so it can build resource name without use of parent property.
    parentResourceName: useServerName

    resourceName: useDbInstanceName
    resourceLocationId: useDbInstanceLocation
    resourceTags: useTags
    
    resourceSKU: sqlServerDbResourceSKU
    resourceTier: sqlServerDbResourceTier

    autoPauseDelay: sqlServerDbautoPauseDelay

    freeLimitExhaustionBehavior: sqlServerDbFreeLimitExhaustionBehavior
    availabilityZone: sqlServerDbAvailabilityZone
    catalogCollation: sqlServerDbCatalogCollation
    collation: sqlServerDbCollation
    createMode: sqlServerDbCreateMode
    isLedgerOn: sqlServerDbIsLedgerOn
    sampleName: sqlServerDbSampleName
    useFreeLimit: sqlServerDbUseFreeLimit
    zoneRedundant: sqlServerDbZoneRedundant
  }
}


// ======================================================================
// Default Outputs: resource, resourceId, resourceName & variable sink
// ======================================================================
// output resource object = serversDatabasesModule.outputs.resource
// output resourceId string = serversDatabasesModule.outputs.resourceId
// output resourceName string = serversDatabasesModule.outputs.resourceName

// param sink (to not cause error if param is not used):
output _ bool = startsWith('${sharedSettings.version}-${sqlServerDbResourceSKU}-${useDbInstanceName}-${useDbInstanceLocation}-${sqlServerDbResourceTier}', '.')
