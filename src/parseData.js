import jsYaml from 'js-yaml';
import ini from 'ini';

const parseFunctionList = {
  '.json': data => JSON.parse(data),
  '.yml': data => jsYaml.safeLoad(data),
  '.ini': data => ini.parse(data) };

export default ext => data => parseFunctionList[ext](data);
