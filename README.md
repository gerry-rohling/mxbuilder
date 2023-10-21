# MX Builder

## Description

This library was built to allow for the easy generation of diagrams.net MX based files supporting the C4 diagram style. It is constrained to only support:

- C4 Stencil object styles
- Nesting of objects, such that containers can be placed inside a Software System, for example
- Auto layout of entities so that they are reasonably easy to start editing in diagrams.net

## Installation

Install with npm:

```bash
npm install --save-prod mxbuilder
```

Install with yarn:

```bash
yarn add mxbuilder
```

## Usage

To generate an MX file you create an instance of mxbuilder and then make calls to add specific C4 entities. When you are done, call `toDiagram()` to fetch the resulting diagrams.net file.

Example:
```js
var mx = new MxBuilder();
var id = mx.placeSoftwareSystem('System Name', 'System Description', 'ss001');
var str = await mx.toDiagram();
```

## Credits

This project relies on [elkjs](https://www.npmjs.com/package/elkjs) to implement the diagram layout function.

## License

This package is released under the MIT license.

## How to Contribute

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request :D

## Tests

Tests are written assuming the Jest test framework.