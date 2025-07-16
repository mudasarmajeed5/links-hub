let count = 0;

function safeLog(label: string) {
  count++;
  console.log(`[${count}] ${label}`);
  if (count > 100) {
    throw new Error("🚨 Detected recursive loop");
  }
}
