import baseConfig from './next.config.base';

const prodConfig = {
  ...baseConfig,
  output: 'export',
  basePath: '/situm-poi-finder',
};

export default prodConfig; 