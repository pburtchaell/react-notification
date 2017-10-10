import path from 'path';
import ts from 'typescript';
import * as tt from 'typescript-definition-tester';

const compilerOptions = {
  jsx: ts.JsxEmit.React,
  module: ts.ModuleKind.CommonJS,
  noEmitOnError: true,
  strict: true,
  target: ts.ScriptTarget.ES5
};

describe('TypeScript definitions', () => {
  it('should compile against index.d.ts', (done) => {
    tt.compileDirectory(
      path.resolve(__dirname, 'ts-components'),
      fileName => fileName.match(/\.tsx?$/),
      compilerOptions,
      () => done()
    );
  });
});
