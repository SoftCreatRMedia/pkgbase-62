# TypeScript tooling

Run `npm ci`, then:

- `npm run typecheck` uses TypeScript 7 to check project types without emitting JavaScript.
- `npm run build` uses TypeScript 6 to generate AMD modules with `tsconfig.amd.json`.
- `npx eslint .` and `npx prettier --check "**/*.ts"` check linting and formatting.

TypeScript 7 no longer emits AMD modules and does not provide the compiler API
required by typescript-eslint 8.71. The dependencies follow Microsoft's
[side-by-side setup](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/#running-side-by-side-with-typescript-60):
`@typescript/native` aliases TypeScript 7 and provides `tsc`, while `typescript`
aliases `@typescript/typescript6` and provides the compiler API and `tsc6`.

Use the npm scripts to select each compiler explicitly: the compatibility package's
transitive dependency can also provide a `tsc` executable. The native type check
uses `skipLibCheck` because upstream CKEditor declaration files currently produce
TypeScript 7 errors. The AMD build still checks those declarations with TypeScript 6.

Keep the AMD build on TypeScript 6 while WoltLab packages require AMD output.
