/**
 * 版本一：对进来的数据进行序列化，
 */
class Command {
  constructor() {
    this.queue = [];
    this.max = 30;
    this.cacheItem = null;
  }

  execute(data) {
    if (this.queue.length >= this.max) {
      this.queue[0] = null;
      this.queue.splice(0, 1);
    }
    this.queue.push(JSON.parse(JSON.stringify(data)));
  }

  undo() {
    this.cacheItem = this.queue.splice(this.queue.length - 1, 1)[0];
    return this.queue[this.queue.length - 1];
  }

  redo() {
    if (this.cacheItem) {
      this.queue.push(this.cacheItem);
      this.cacheItem = null;
    }
    return this.queue[this.queue.length - 1];
  }
}

export default Command;
