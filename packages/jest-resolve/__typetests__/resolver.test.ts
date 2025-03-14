/**
 * Copyright (c) Facebook, Inc. and its affiliates. All Rights Reserved.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

import {expectAssignable, expectError, expectType} from 'tsd-lite';
import type {
  AsyncResolver,
  JestResolver,
  PackageFilter,
  PackageJSON,
  PathFilter,
  SyncResolver,
} from 'jest-resolve';

// PackageJSON

expectAssignable<PackageJSON>({
  caption: 'test',
  count: 100,
  isTest: true,
  location: {name: 'test', start: [1, 2], valid: false, x: 10, y: 20},
  values: [0, 10, 20, {x: 1, y: 2}, true, 'test', ['a', 'b']],
});

expectError<PackageJSON>({
  filter: () => {},
});

// PackageFilter

const packageFilter = (pkg: PackageJSON, file: string, dir: string) => pkg;

expectAssignable<PackageFilter>(packageFilter);

// PathFilter

const pathFilter = (pkg: PackageJSON, path: string, relativePath: string) =>
  relativePath;

expectAssignable<PathFilter>(pathFilter);

// AsyncResolver

const asyncResolver: AsyncResolver = async (path, options) => {
  expectType<string>(path);

  expectType<string>(options.basedir);
  expectType<Array<string> | undefined>(options.conditions);
  expectType<SyncResolver>(options.defaultResolver);
  expectType<Array<string> | undefined>(options.extensions);
  expectType<Array<string> | undefined>(options.moduleDirectory);
  expectType<PackageFilter | undefined>(options.packageFilter);
  expectType<PathFilter | undefined>(options.pathFilter);
  expectType<Array<string> | undefined>(options.paths);
  expectType<string | undefined>(options.rootDir);

  return path;
};

const notReturningAsyncResolver = async () => {};
expectError<AsyncResolver>(notReturningAsyncResolver());

// SyncResolver

const syncResolver: SyncResolver = (path, options) => {
  expectType<string>(path);

  expectType<string>(options.basedir);
  expectType<Array<string> | undefined>(options.conditions);
  expectType<SyncResolver>(options.defaultResolver);
  expectType<Array<string> | undefined>(options.extensions);
  expectType<Array<string> | undefined>(options.moduleDirectory);
  expectType<PackageFilter | undefined>(options.packageFilter);
  expectType<PathFilter | undefined>(options.pathFilter);
  expectType<Array<string> | undefined>(options.paths);
  expectType<string | undefined>(options.rootDir);

  return path;
};

const notReturningSyncResolver = () => {};
expectError<SyncResolver>(notReturningSyncResolver());

// JestResolver

expectAssignable<JestResolver>({async: asyncResolver});
expectAssignable<JestResolver>({sync: syncResolver});
expectAssignable<JestResolver>({async: asyncResolver, sync: syncResolver});
expectError<JestResolver>({});
