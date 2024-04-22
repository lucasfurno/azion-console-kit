import * as VersionControlSystemService from '@/services/version-control-system-integration-services'
import * as VulcanService from '@/services/vulcan-services'
import * as GitHubServices from '@/services/github-services'
import * as VariablesService from '@/services/variables-services'
import * as TemplateEngineService from '@/services/template-engine-services'
import * as MarketplaceService from '@/services/marketplace-services'

/** @type {import('vue-router').RouteRecordRaw} */
export const importGithubRoutes = {
  path: '/static',
  name: 'import-github',
  children: [
    {
      path: ':vendor/:solution',
      name: 'github-static',
      component: () => import('@views/ImportGitHub/ImportStaticView.vue'),
      props: {
        listPlatformsService: VersionControlSystemService.listPlatformsService,
        postCallbackUrlService: VersionControlSystemService.postCallbackUrlService,
        listIntegrationsService: VersionControlSystemService.listIntegrationsService,
        listRepositoriesService: VersionControlSystemService.listRepositoriesService,
        listVulcanPresetsService: VulcanService.listVulcanPresetsService,
        getModesByPresetService: VulcanService.getModesByPresetService,
        frameworkDetectorService: GitHubServices.frameworkDetectorService,
        createVariablesService: VariablesService.createVariablesService,
        instantiateTemplateService: TemplateEngineService.instantiateTemplate,
        loadSolutionService: MarketplaceService.loadSolutionService
      },
      meta: {
        breadCrumbs: [
          {
            label: 'Import Static Site from GitHub',
            to: '/import-github'
          }
        ]
      }
    }
  ]
}
