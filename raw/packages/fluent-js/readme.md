# Getting Started

> Vatly JavaScript packages - Getting Started

> **Alpha — under active development. Every alpha release may include breaking changes. Pin exact versions during alpha.**

`@getvatly/fluent` is the framework-agnostic TypeScript billing layer built on
`@getvatly/sdk`, with checkout builders, customer and subscription handles, and
host-owned persistence and webhook processing.

After npm approval, install the tested alpha pair with exact versions:

```sh
npm install --save-exact @getvatly/sdk@0.3.0-alpha.2 @getvatly/fluent@0.1.0-alpha.1
```

Fluent `0.1.0-alpha.1` requires registry SDK `0.3.0-alpha.2`; no local SDK build or
vendored tarball is needed.

See the [package README](https://github.com/vatly/vatly-fluent-js/blob/main/README.md) for installation, usage examples and
integration contracts, and the [porting guide](https://github.com/vatly/vatly-fluent-js/blob/main/PORTING.md) for the PHP-to-TypeScript
mapping and deliberate adaptations.
