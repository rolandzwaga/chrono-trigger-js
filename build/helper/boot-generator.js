const path = require('path');
const fs = require('fs');
const { Parser } = require('acorn');
const { generate } = require('astring');
const dashToCamelCase = require('./dashToCamelCase');

function generateBootSourceCode(config, basePath, configPath) {
  const dirName = path.dirname(configPath);
  const configFileName = configPath.substr(dirName.length + 1);

  const bootSourceCode = _generateBootSource(
    config,
    basePath,
    configFileName,
    dirName
  );

  //const ast = Parser.parse(bootSourceCode, { ecmaVersion: 6, sourceType: 'module' });
  //const formattedCode = generate(ast);

  return bootSourceCode; //formattedCode;
}

function _generateBootSource(config, basePath, configFileName, dirName) {
  const engineFactoryPath = path
    .join(basePath, 'engine-factory')
    .split('\\')
    .join('/');
  configFileName = '../' + configFileName;
  const cssPath = path.join(dirName, 'css');
  const templatePath = path.join(dirName, 'template');

  const lines = _generateCssImports(cssPath);

  lines.push(`import { IEngineConfiguration } from '../../../src';`);
  lines.push(
    `const engineConfig = require('${configFileName}') as IEngineConfiguration;`
  );
  lines.push(`import { EngineFactory } from '${engineFactoryPath}';`);
  lines.push(
    "import WebpackResourceImporter from './webpack-resource-importer';"
  );
  lines.push(
    'const factory = new EngineFactory(new WebpackResourceImporter(), window);'
  );
  lines.push('const engine = factory.createEngine(engineConfig);');
  lines.push(
    "engine.init().then(()=> {console.log('Eligius engine ready for business');});"
  );

  return lines.join('');
}

function _generateCssImports(cssPath) {
  const entries = fs.readdirSync(cssPath);
  return entries.map(file => {
    const importName = `css_${dashToCamelCase(path.basename(file, '.css'))}`;
    return `import ${importName} from '../css/${file}';`;
  });
}

module.exports = generateBootSourceCode;
