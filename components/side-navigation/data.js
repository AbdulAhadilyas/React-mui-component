const initialPositionScreens = [
    { text: 'org_project_side_nav_building', url: `/building`, focus: 'building' },
    { text: 'org_project_side_nav_pv_system', url: `/pv-system`, focus: 'pv-system' }
]
const pvModuleScreens = [
    { text: 'org_project_side_nav_module_layout', url: '/module-layout', focus: 'module-layout' },
    { text: 'org_project_side_nav_inverter', url: '/inverter', focus: 'inverter' },
    { text: 'org_project_side_nav_power_consum', url: '/power-consumption', focus: 'power-consumption' },
    { text: 'org_project_side_nav_electric_tariffs', url: '/electricity-tariffs', focus: 'electricity-tariffs' }
]
const reqScreens = [
    { text: 'org_project_side_nav_pv_batteries', url: '/pv-batteries', focus: 'pv-batteries' },
]
const economicScreens = [
    { text: 'org_project_side_nav_pv', url: '/eco-pv', focus: 'eco-pv' },
    { text: 'org_project_side_nav_batteries_system', url: '/eco-battery-system', focus: 'eco-battery-system' }
]
const partListScreens = [
    { text: 'org_project_side_nav_overview', url: '/parts-overview', focus: 'parts-overview' },
    { text: 'org_project_side_nav_pv', url: '/parts-pv', focus: 'parts-pv' },
    { text: 'org_project_side_nav_batteries_system', url: '/batteries-system', focus: 'batteries-system' },
    { text: 'org_project_side_nav_recurring_cost', url: '/recurring-cost', focus: 'recurring-cost' }
]
const eleSolarScreens = [
    { text: 'org_project_side_nav_overview', url: '/overview', focus: 'overview' },
    { text: 'org_project_side_nav_cost_analysis', url: '/cost-analysis', focus: 'cost-analysis' },
]

export {
    initialPositionScreens,
    pvModuleScreens,
    reqScreens,
    economicScreens,
    partListScreens,
    eleSolarScreens
}