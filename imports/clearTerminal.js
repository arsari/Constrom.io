// clear terminal window function declaration
function clear() {
  return process.stdout.write('\033c');
}

module.exports = clear;
