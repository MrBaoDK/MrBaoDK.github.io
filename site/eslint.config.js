import tseslint from 'typescript-eslint'
import reactConfig from '@mrbaodk/eslint-config/react.js'

export default tseslint.config(
  ...reactConfig
)
