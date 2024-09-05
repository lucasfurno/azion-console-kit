/*
  ATENÇÃO!!!!
  Esse arquivo não deve ser mergeado.
  Ele contém dados mockados e informações relevantes para a migração dos novos graficos do modulo do metrics. Deve ser removido ao final do trabalho.
  Criei um grupo novo na tela do metrics para guardar todos os gráficos. Ela deve ser removida ao final da integração. O trabalho final que deve ir para stage é apenas o de formatação e de renderização dos dados, já que novas propriedades para apresentar os novos gráficos serão adicionados posteriormente.
  Qualquer dúvida sobre comos novos gráficos serão inseridos, Matheus criou um video tutorial há um tempo que certamente irá ajudar.
*/

export const MOCK_NEW_PAGE_INFO = {
  page: [
    {
      id: 0,
      label: 'New Charts',
      path: 'new-charts',
      groupId: 0,
      dashboards: [
        {
          id: '11111111111111111',
          label: 'New Charts',
          path: 'new-charts',
          dataset: 'httpMetrics'
        }
      ]
    }
  ],
  group: {
    label: 'New',
    value: 'new',
    id: 1,
    pagesDashboards: [
      {
        id: 0,
        label: 'New Charts',
        path: 'new-charts',
        groupId: 0,
        dashboards: [
          {
            id: '11111111111111111',
            label: 'New Charts',
            path: 'new-charts',
            dataset: 'httpMetrics'
          }
        ]
      }
    ]
  },
  dashboard: [
    {
      id: '555555555555555555',
      chartOwner: 'azion',
      label: 'Maps Chart',
      description: 'description',
      aggregationType: 'sum',
      columns: 6,
      type: 'map',
      xAxis: 'cat',
      isTopX: true,
      rotated: true,
      dataUnit: 'bytes',
      dataset: 'httpMetrics',
      limit: 5,
      fields: ['bandwidthTotal'],
      groupBy: ['geolocCountryName'],
      aggregations: [
        {
          aggregation: 'count',
          variable: 'rows'
        }
      ],
      orderDirection: 'DESC',
      dashboardId: '11111111111111111',
      helpCenterPath: 'path',
      variationType: 'regular',
      moreDataSet: [
        {
          dataset: 'httpMetrics',
          limit: 5,
          fields: ['bandwidthTotal'],
          groupBy: ['geolocCountryName'],
          aggregations: [
            {
              aggregation: 'count',
              variable: 'rows'
            }
          ]
        }
      ]
    }
  ]
}
