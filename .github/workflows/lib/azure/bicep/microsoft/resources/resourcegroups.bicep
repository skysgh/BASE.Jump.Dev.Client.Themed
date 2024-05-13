// ======================================================================
// Scope
// ======================================================================
// Resources Groups are part of the general subscription
targetScope='subscription'

// ======================================================================
// Import Shared Settings
// ======================================================================
var sharedSettings = loadJsonContent('../../settings/shared.json')

// ======================================================================
// Default Name, Location, Tags,
// ======================================================================
@description('Required. The name of the resource Group.')
param resourceName string

@description('The lowercase identifier of where to build the resource Group. Default is \'australiacentral\'.')
// will allow more later.
// Too many options: @allowed([ 'australiacentral'])
param resourceLocationId string

@description('Tags to merge in.')
param resourceTags object = {}

// ======================================================================
// Default SKU, Kind, Tier where applicable
// ======================================================================

// ======================================================================
// Resource other Params
// ======================================================================

// ======================================================================
// Default Variables: useResourceName, useTags
// ======================================================================
var useName = resourceName
var useLocation = resourceLocationId
var useTags = union(resourceTags,sharedSettings.defaultTags)

// ======================================================================
// Resource bicep
// ======================================================================
// Creating new resource groups take a little bit of time
resource resource 'Microsoft.Resources/resourceGroups@2022-09-01' = {
  name: useName
  location: useLocation
  tags: useTags
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
