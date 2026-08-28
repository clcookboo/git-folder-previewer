// Wallet SDKs (Solana/EVM) reference the Node `Buffer` global in browser code.
// Provide it before those modules initialize, otherwise the app crashes with
// "Cannot read properties of undefined (reading 'from')".
import { Buffer as BufferPolyfill } from "buffer";

export function ensureBufferPolyfill() {
  const g = globalThis as unknown as {
    Buffer?: typeof BufferPolyfill;
    global?: typeof globalThis;
  };

  if (typeof g.Buffer === "undefined") {
    g.Buffer = BufferPolyfill;
  }
  if (typeof g.global === "undefined") {
    g.global = globalThis;
  }
}
