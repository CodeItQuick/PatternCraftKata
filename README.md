# Kata - PatternCraft

from: https://www.codewars.com/collections/patterncraft

## Design Ideas
- using the decorator pattern, allow the units to have upgradeable armor and weapons
- using the adapter pattern, allow the units to have a single uniform attack and hurt methods
- using the state pattern
- using the visitor pattern

## Your Goal
1. Add tests to get to 100% mutation test coverage
2. Refactor the code to have less duplication
3. Introduce some of the design ideas


## Test Coverage

----------|---------|----------|---------|---------|-------------------                                                                                                                                                          
File      | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s                                                                                                                                                           
----------|---------|----------|---------|---------|-------------------
All files |   88.88 |    79.41 |   81.81 |   88.88 |                  
index.ts |   94.52 |     91.3 |     100 |   94.52 | 46-48,50         
units.ts |   79.54 |    54.54 |   66.66 |   79.54 | 8-9,11-12,24-28  
----------|---------|----------|---------|---------|-------------------
Test Suites: 1 passed, 1 total
Tests:       58 passed, 58 total
Snapshots:   0 total
Time:        0.858 s, estimated 1 s

## Mutation Test Coverage

----------|------------------|----------|-----------|------------|----------|----------|
          | % Mutation score |          |           |            |          |          |
File      |  total | covered | # killed | # timeout | # survived | # no cov | # errors |
----------|--------|---------|----------|-----------|------------|----------|----------|
All files |  87.22 |   87.22 |      113 |         3 |         17 |        0 |        0 |
index.ts |  87.27 |   87.27 |       94 |         2 |         14 |        0 |        0 |
units.ts |  86.96 |   86.96 |       19 |         1 |          3 |        0 |        0 |
----------|--------|---------|----------|-----------|------------|----------|----------|
