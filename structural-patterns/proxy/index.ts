/**
 * The Subject interface declares common operations for both RealSubject and the
 * Proxy. As long as the client works with RealSubject using this interface,
 * you'll be able to pass it a proxy instead of a real subject.
 */
interface ThirdPartyYouTubeLib {
  listVideos(): void;
  getVideoInfo(id: string): void;
  downloadVideo(id: string): void;
}

/**
 * The RealSubject contains some core business logic. Usually, RealSubjects are
 * capable of doing some useful work which may also be very slow or sensitive -
 * e.g. correcting input data. A Proxy can solve these issues without any
 * changes to the RealSubject's code.
 */
class ThirdPartyYouTubeClass implements ThirdPartyYouTubeLib {
  public listVideos(): void {
    console.log('Return list of videos.');
  }
  public getVideoInfo(id: string): void {
    console.log(`Return ${id} video info.`);
  }
  public downloadVideo(id: string): void {
    console.log(`Download ${id} video.`);
  }
}

/**
 * The Proxy has an interface identical to the RealSubject.
 */
class CachedYouTubeClass implements ThirdPartyYouTubeLib {
  private realSubject: ThirdPartyYouTubeClass;

  /**
   * The Proxy maintains a reference to an object of the RealSubject class. It
   * can be either lazy-loaded or passed to the Proxy by the client.
   */
  constructor(realSubject: ThirdPartyYouTubeClass) {
    this.realSubject = realSubject;
  }

  /**
   * The most common applications of the Proxy pattern are lazy loading,
   * caching, controlling the access, logging, etc. A Proxy can perform one of
   * these things and then, depending on the result, pass the execution to the
   * same method in a linked RealSubject object.
   */
  public listVideos(): void {
    if (this.checkAccess()) {
      this.realSubject.listVideos();
      this.logAccess();
    }
  }

  public getVideoInfo(id: string): void {
    if (this.checkAccess()) {
      this.realSubject.getVideoInfo(id);
      this.logAccess();
    }
  }

  public downloadVideo(id: string): void {
    if (this.checkAccess()) {
      this.realSubject.downloadVideo(id);
      this.logAccess();
    }
  }

  private checkAccess(): boolean {
    // Some real checks should go here.
    console.log('Proxy: Checking access prior to firing a real request.');

    return true;
  }

  private logAccess(): void {
    console.log('Proxy: Logging the time of request.');
  }
}

/**
 * The client code is supposed to work with all objects (both subjects and
 * proxies) via the Subject interface in order to support both real subjects and
 * proxies. In real life, however, clients mostly work with their real subjects
 * directly. In this case, to implement the pattern more easily, you can extend
 * your proxy from the real subject's class.
 */
function clientCode(subject: ThirdPartyYouTubeLib) {
  // ...

  subject.listVideos();
  subject.getVideoInfo('1');
  subject.downloadVideo('1');

  // ...
}

console.log('Client: Executing the client code with a real subject:');
const realSubject = new ThirdPartyYouTubeClass();
clientCode(realSubject);

console.log('');

console.log('Client: Executing the same client code with a proxy:');
const proxy = new CachedYouTubeClass(realSubject);
clientCode(proxy);
