export abstract class Content<T> {
  protected asyncDataRequest: Promise<T>;
  public render() {
    this.asyncDataRequest.then((data) => {
      this.render_data(data);
    });
  }
  protected abstract render_data(data: T);
}
