[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Node.js 22](https://img.shields.io/badge/Node.js-22-green.svg)](https://nodejs.org/)
[![make.fun bounty](https://img.shields.io/badge/make.fun-tiny--stack--vm--01--run--20261122-blue.svg)](https://make.fun/c/tiny-stack-vm-01-run-20261122)

# Tiny Stack VM

One file (`main.ts`, Node 22) that runs make.fun's tiny stack ISA: 32-bit
wrapping arithmetic, a 256-value stack, a 64-deep call stack, 256 words of
memory, ten traps with their own exit codes, a 1,000,000 step limit and a
65,536 byte output limit. For each instance it reads `/input/<id>/program.bin`
and `input.bin`, then writes `/output/<id>/stdout.bin` and `exit.txt`.

## License

MIT. See [LICENSE](LICENSE).
