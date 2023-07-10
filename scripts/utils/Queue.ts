import waitUntil from './waitUntil';

interface QueueOptions {
  concurrency?: number;
}

interface WaitOptions {
  empty?: boolean;
}

class Queue<T extends object> {
  private readonly worker: (entry: T) => Promise<any>;
  private readonly concurrency: number;

  pendingEntries: T[] = [];

  inFlight = 0;

  err = null;

  constructor(worker: (entry: T) => Promise<any>, options: QueueOptions = {}) {
    this.worker = worker;
    this.concurrency = options.concurrency || 1;
  }

  public push = (entries: T[]) => {
    this.pendingEntries = this.pendingEntries.concat(entries);
    this.process();
  };

  public process = () => {
    const scheduled = this.pendingEntries.splice(
      0,
      this.concurrency - this.inFlight,
    );
    this.inFlight += scheduled.length;
    scheduled.forEach(async (task) => {
      try {
        await this.worker(task);
      } catch (err) {
        this.err = err;
      } finally {
        this.inFlight -= 1;
      }

      if (this.pendingEntries.length > 0) {
        this.process();
      }
    });
  };

  public wait = (options: WaitOptions = {}) =>
    waitUntil(
      () => {
        if (this.err) {
          this.pendingEntries = [];
          throw this.err;
        }

        return {
          predicate: options.empty
            ? this.inFlight === 0 && this.pendingEntries.length === 0
            : this.concurrency > this.pendingEntries.length,
        };
      },
      {
        delay: 50,
      },
    );
}

export default Queue;
