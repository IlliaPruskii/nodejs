"use strict";

process.stdin.on('readable', () => {
  let chunk;

  while ((chunk = process.stdin.read()) !== null) {
    process.stdout.write(chunk.toString().split("").reverse().join(""));
  }
});