export class TodoEntity {
  constructor(
    public id: number,
    public text: string,
    public createdAt?: Date | null
  ) {}

  get isCreated() {
    return !!this.createdAt;
  }

  public static fromObject(object: {[key: string]: any}) {
    const {id, text, createdAt} = object;
    if(!id) throw 'Id is required';
    if(!text) throw 'text is required';

    let newCreatedAt;
    if(newCreatedAt) {
        newCreatedAt = new Date(newCreatedAt);
        if (isNaN(newCreatedAt.getTime())) {
            throw 'CreatedAt is not a valid date'
        }
    }

    return new TodoEntity(id, text, createdAt)
  }
}
