// Wallet SDKs (Solana/EVM) reference the Node `Buffer` global in browser code.
// Provide it before those modules initialize, otherwise the app crashes with
// "Cannot read properties of undefined (reading 'from')".
import { Buffer as BufferPolyfill } from "buffer";

const g = globalThis as typeof globalThis & { Buffer?: typeof BufferPolyfill; global?: unknown };

if (typeof g.Buffer === "undefined") {
  g.Buffer = BufferPolyfill;
}
if (typeof g.global === "undefined") {
  g.global = globalThis;
}

export {};
