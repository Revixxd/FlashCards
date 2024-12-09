import antfu from '@antfu/eslint-config'

export default antfu({
  vue: {
    overrides: {
      'vue/block-order': ['error', {
        order: [['script', 'template'], 'style'],
      }],
    },
  },
  stylistic: {
    overrides: {
      'indent': ['error', 2],
      'object-property-newline': ['error', {
        allowAllPropertiesOnSameLine: false,
      }],
      'object-curly-spacing': ['error', 'always'],
      'object-curly-newline': ['error', {
        multiline: true,
        consistent: true,
      }],
    },
  },
})
