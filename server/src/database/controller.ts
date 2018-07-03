import {
  JsonController,
  Get,
  Post,
  Param,
  Put,
  Body,
  NotFoundError
} from "routing-controllers";
import Database from "./entity";

@JsonController()
export default class DatabaseController {
  @Get("/databases")
  async allDatabases() {
    const databases = await Database.find();
    if (!databases)
      throw new NotFoundError("Sorry but that table does not exist");
    return { databases };
  }

  @Get("/databases/:id([0-9]+)")
  getDatbase(@Param("id") id: number) {
    return Database.findOne(id);
  }

  @Post("/databases")
  async createDatabase(@Body() database: Database) {
    await database.save();
    const databases = await Database.find()
    return { databases };
  }

  @Put("/databases/:id([0-9]+)")
  async updateDatabase(
    @Param("id") id: number,
    @Body() update: Partial<Database>
  ) {
    const database = await Database.findOne(id);
    if (!database) throw new NotFoundError("Database not found.");
    await Database.merge(database, update).save();
    const databases = await Database.find();
    return { databases };
  }
}
