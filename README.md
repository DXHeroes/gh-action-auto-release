![GitHub release (with filter)](https://img.shields.io/github/v/release/dxheroes/gh-action-auto-release?include_prereleases&sort=semver&label=version)

# GH Action Auto Release v1.0.8 <!-- {x-release-please-version} -->

**Time to implement: 10 minutes.**

**Saved time: 1 hour per each release of any technology.**

This GitHub Action will automatically create a release and publish your package to the supported package registry.

## How it works

This action uses [release-please](https://github.com/googleapis/release-please) under the hood. It will create a pull request with the release notes and you can check them before merging.

When you merge the pull request, it will create a release with the release notes from the pull request.

Each release will be tagged with a version from the commit message. You can use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) or just add a version number to the commit message.

Every release will be published to the supported package registry.

You can get your package published in a few minutes and you won't have to worry about it anymore. Just follow the instructions below and you're done.

## Supported package types

- ✅ node
- ✅ php
- ✅ ruby

## Please request other package types in the issues

- 🛠️ .NET
- 🛠️ dart
- 🛠️ elixir
- 🛠️ go
- 🛠️ helm
- 🛠️ java
- 🛠️ maven
- 🛠️ krm-blueprint
- 🛠️ maven
- 🛠️ expo
- 🛠️ ocaml
- 🛠️ python
- 🛠️ rust
- 🛠️ sfdx
- 🛠️ simple
- 🛠️ terraform-module

## Prerequisites

### GitHub Actions
You must allow GitHub actions to create and approve pull requests. You can do this in the [organization or repository settings](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/enabling-features-for-your-repository/managing-github-actions-settings-for-a-repository#preventing-github-actions-from-creating-or-approving-pull-requests).

- Organization: https://github.com/organizations/YOUR_ORG/settings/actions (replace YOUR_ORG with your organization name) > Workflow permissions > check "Allow GitHub Actions to create and approve pull requests".
- Personal repository: https://github.com/YOUR_OWNER/YOUR_REPO/settings/actions (replace YOUR_OWNER with your GitHub username and YOUR_REPO with your repository name) > Workflow permissions > check "Allow GitHub Actions to create and approve pull requests"..

### Node.js package

Add these secret to your repository:

- name: [NPM_TOKEN](https://docs.npmjs.com/creating-and-viewing-access-tokens#creating-access-tokens) - NPM token with write access to the package. 
  - _Required permissions for Granular Access Token: Packages and scopes > 'Read and write'._
  - Required permissions for Classic Token: 'Automation'.

### PHP package

Add these secrets to your repository:

- name: [PACKAGIST_USERNAME](https://packagist.org/profile/) - Packagist username.
- name: [PACKAGIST_TOKEN](https://packagist.org/profile/) - Packagist token with write access to the package.

### Ruby package

Add these secret to your repository:

- name: [RUBYGEMS_API_KEY](https://rubygems.org/profile/api_keys) - RubyGems API key with write access to the package. 
  - _Required scope: 'Push rubygem'._

## Usage

### Create your GitHub Action

Create a new file in your repository `.github/workflows/release.yml` with the following content that fits your package type.

### For Node.js package
#### JavaScript
<!-- {x-release-please-start-major} -->
```yaml
name: Release
on:
  push:
    branches:
      - main # set your default branch

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    name: Release by DX Heroes
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: dxheroes/gh-action-auto-release@v1
        with:
          release-type: node
          package-name: prs-test-js-lib # replace with your package name
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```
<!-- {x-release-please-end} -->

#### TypeScript
```yaml
name: Release
on:
  push:
    branches:
      - main # set your default branch

permissions:
  contents: write
  pull-requests: write

jobs:
  build:
    name: Build package
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: 18
      - run: npm install
      - run: npm run build
  release:
    name: Release by DX Heroes
    needs: build
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: dxheroes/gh-action-auto-release@v1
        with:
          release-type: node
          package-name: prs-test-js-lib
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
```

### For PHP package
<!-- {x-release-please-start-major} -->
```yaml
name: Release
on:
  push:
    branches:
      - main # set your default branch

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    name: Release by DX Heroes
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: dxheroes/gh-action-auto-release@v1
        with:
          release-type: php
          package-name: prs-test-php-lib
        env:
          PACKAGIST_USERNAME: ${{ env.PACKAGIST_USERNAME }}
          PACKAGIST_TOKEN: ${{ env.PACKAGIST_TOKEN }}
```
<!-- {x-release-please-end} -->

### For Ruby package
<!-- {x-release-please-start-major} -->
```yaml
name: Release
on:
  push:
    branches:
      - main # set your default branch

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    name: Release by DX Heroes
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: dxheroes/gh-action-auto-release@v1
        with:
          release-type: ruby
          package-name: prs-test-ruby-lib
        env:
          RUBYGEMS_API_KEY: ${{ secrets.RUBYGEMS_API_KEY }}
```
<!-- {x-release-please-end} -->

## Advanced usage

### Arguments for the action

- `release-type` - Type of the release. Default: `node`
- `package-name` - Name of the package. Required.
- You can also set other `release-please` arguments. See [release-please documentation](https://github.com/google-github-actions/release-please-action#configuration) for more information.

### Get notified about new releases

#### Slack

Just add this env variable to your workflow:

```yaml
env:
  SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }}
```

[Please request other platforms in the issues](https://github.com/DXHeroes/gh-action-auto-release/issues)

Example of setting up Slack notifications for node.js package:
<!-- {x-release-please-start-major} -->
```yaml
name: Release
on:
  push:
    branches:
      - main # set your default branch

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    name: Release by DX Heroes
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: dxheroes/gh-action-auto-release@v1
        with:
          release-type: node
          package-name: prs-test-js-lib # replace with your package name
        env:
          NPM_TOKEN: ${{ secrets.NPM_TOKEN }}
          SLACK_WEBHOOK_URL: ${{ secrets.SLACK_WEBHOOK_URL }} ## Configure SLACK_WEBHOOK_URL
```
<!-- {x-release-please-end} -->

### Customize package path when using monorepo or is not in the root directory

Set `working-directory` to the path of the package. For example:

```yaml
name: Release
on:
  push:
    branches:
      - main # set your default branch

permissions:
  contents: write
  pull-requests: write

jobs:
  release:
    name: Release by DX Heroes
    runs-on: ubuntu-latest
    defaults:
      run:
        working-directory: libraries/js-lib # replace with your package path
    steps:
      # ...
```

## Contributing

All contributions are welcome. Please create an issue or submit a pull request.

