import nextConfig from 'eslint-config-next/core-web-vitals'

const eslintConfig = [
  ...nextConfig,
  {
    rules: {
      // These rules are too strict for common React patterns like:
      // - useRef().current for initial values
      // - setState in useEffect for client-side mounting checks
      'react-hooks/refs': 'off',
      'react-hooks/set-state-in-effect': 'off',
    },
  },
]

export default eslintConfig
