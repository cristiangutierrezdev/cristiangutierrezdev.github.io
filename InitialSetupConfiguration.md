
# Steps to start a project
Steps to configure a strong base to start a project from scratch.


## Install dependencies
Install your own dependencies depending of the scafolding used, in this case vite

``npm init vite``

### add vite.config.ts

vite.config.ts

````ts
/** @type  {import('vite').UserConfig} */

export  default  {
	build:  {
	outDir:  'docs/',
	},
	base:  '/',
};

````


## Configure linters

### Add .editorconfig lint

````bash
cat > .editorconfig << EOF
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
EOF
````

### Setup eslint linter
configure eslint linter (install and run to generate file)

``npm install -D eslint``

`````npx eslint --init`````

Add .eslintignore file
````bash
cat > .eslintignore << EOF
node_modules
EOF
````

Add tsconfig.eslint.json file  **in this case because Typescript**
````bash
cat > tsconfig.eslint.json << EOF
{
  "extends": "./tsconfig.json",
  "include": ["src/**/*.ts", "test/**/*.ts"]
}
EOF
````
Sets ``project:  ./tsconfig.eslint.json`` on ``.eslintrc.[yml|json|js]`` in parserOptions **in this case because Typescript**

### Setup Prettier formatter

Install
````npm i -D prettier-eslint````

CLI to sync with vscode extension
````npm i -D prettier-eslint-cli````

### Setup Stylelint CSS formatter

Install
````npm  install --save-dev stylelint stylelint-config-standard````

Install for sass
````npm  install --save-dev stylelint-config-standard-scss stylelint-config-sass-guidelines````

Add config file
````bash
cat > .stylelintrc.json << EOF
{
  "extends": [
    "stylelint-config-standard",
    "stylelint-config-prettier",
    "stylelint-config-standard-scss",
    "stylelint-config-sass-guidelines"
  ]
}
EOF
````


### Add linter scripts

Add these scripts in the package.json
````json
"lint": "eslint src/**/*.ts",
"lint:fix": "npx prettier-eslint src/**/*.{ts,html} --write",
"lint:css": "npx stylelint src/**/*.{css,sass}",
"lint:css-fix": "npx stylelint src/**/*.{css,sass} --fix"
````

### Setup lint-staged hook

Install
``npm install --save-dev lint-staged``

Add this to the ``package.json``
````json
  "lint-staged": {
    "src/**/*.{ts,js}": [
      "npm run lint"
    ],
    "src/**/*.{css,sass}": [
      "npm run lint:css"
    ]
  }
````


### Setup pre-commit with Husky
Install
``npm  install husky --save-dev``

Enable git hooks
``npx husky install``

To automatically have Git hooks enabled after install, edit  `package.json`
``npm pkg set scripts.prepare "husky install"``

Paste this in the new `.husky/pre-commit` file by replacing the actual content
```bash
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

echo '🏗️👷 Styling your project before committing 👷‍♂️🏗️'
echo 'please be patient, this may take a while...'

npx lint-staged
```

### Setup Commitizen
Install
``npm install commitizen -g``

``commitizen init cz-conventional-changelog --save-dev --save-exact``

Add this script to the package.json scripts
``"commit":  "cz"``

### Setup Commitlint
Install
```bash
# Install and configure if needed
npm  install --save-dev @commitlint/{cli,config-conventional}
# For Windows:
npm  install --save-dev @commitlint/config-conventional @commitlint/cli
```
Add hook
``npx husky add .husky/commit-msg "npx --no -- commitlint --edit ${1}"``

Add this to the ``package.json``
```json
  "commitlint": {
    "extends": [
      "@commitlint/config-conventional"
    ]
  }
```

configure testing enviroment

configure CI/CD actions
