const fs = require('fs');

const type = fs.readFileSync(__dirname + '/type.handlebars', 'utf8');
const union = fs.readFileSync(__dirname + '/union.handlebars', 'utf8');

const config = {
  inputType: 'MULTIPLE_FILES',
  templates: {
    type,
    union
  },
  flattenTypes: true,
  filesExtension: 'ts',
  primitives: {
    String: 'string',
    Int: 'number',
    Float: 'number',
    Boolean: 'boolean',
    ID: 'string'
  },
  customHelpers: {
    hasTypes: (context, options) => {
      if (context && context.fields && Array.isArray(context.fields)) {
        const fields = context.fields;
        const filter = fields.filter(field => {
          return field.isType;
        });

        if (filter.length) {
          return options && options.fn ? options.fn(context) : '';
        }
      }

      return options && options.inverse ? options.inverse(context) : '';
    }
  }
};

module.exports = {
  default: config
};
