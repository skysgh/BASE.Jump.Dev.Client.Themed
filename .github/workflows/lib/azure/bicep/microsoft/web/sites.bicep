@description('Id of parent app Service Plan. eg: \'appServicePlanModule.id\'')
param parentResourceId string;

@description('the unique name of this site (often is PROJECTNAME + a unique number).')
param resourceName string

@description('The id of the resource for the site.')
// @allowed('')
param resourceLocationId string

@description('The tags to merge for this resource.')
param resourceTags array = []

@description('The Function eXtension to define the runtime stack. Default = \'DOTNETCORE|Latest\'')
@allowed(  'DOTNETCORE|2.2','DOTNETCORE|3.0','DOTNETCORE|3.1','DOTNETCORE|LTS','DOTNETCORE|Latest')
param linuxFxVersion string = 'DOTNETCORE|Latest'


resource resource 'Microsoft.Web/sites@2020-06-01' = {
  name: resourceName
  location: resourceLocationId
  //
  properties: {
    // tie it in by referencing parent servicePlan:
    serverFarmId: parentResourceId
   
    siteConfig: {
      linuxFxVersion: linuxFxVersion
    }
  }
}


// return the id (the fully qualitified name) of the newly created resource:
output resourceId string = resource.id

// return the (short) name of the newly created resource:
output resourceName string = resource.name
