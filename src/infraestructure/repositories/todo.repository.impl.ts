import { CreateTodoDto, TodoDatasource, TodoEntity, TodoRepository, UpdateTodoDto } from "../../domain";

export class TodoRepositoryImpl implements TodoRepository {


    constructor(private readonly todoDatasource: TodoDatasource){}

    async create(createTodoDto: CreateTodoDto): Promise<TodoEntity> {
       return this.todoDatasource.create(createTodoDto);
    }
    async getAll(): Promise<TodoEntity[]> {
        return this.todoDatasource.getAll();
    }
    async findById(id: number): Promise<TodoEntity> {
        return this.todoDatasource.findById(id);
    }
    async updateById(updateTodoDto: UpdateTodoDto): Promise<TodoEntity> {
        return this.todoDatasource.updateById(updateTodoDto);
    }
    async deleteById(id: number): Promise<TodoEntity> {
        return this.todoDatasource.deleteById(id);
    }

}