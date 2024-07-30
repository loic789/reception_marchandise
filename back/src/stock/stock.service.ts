import { Injectable } from '@nestjs/common';
import { CreateStockDto } from './dto/create-stock.dto';
import { UpdateStockDto } from './dto/update-stock.dto';
import { ClipperService } from 'src/clipper/clipper.service';

@Injectable()
export class StockService {

  constructor(
    private clipperService : ClipperService
  ){}

  create(createStockDto: CreateStockDto) {
    const columns = Object.keys(createStockDto);
    if (columns.length === 0) {
      throw new Error("No columns to insert.");
    }
    const values = columns.map(key => {
      let value = createStockDto[key];
      if (typeof value === 'string') {
        // Echape les apostrophes dans les chaînes de caractères
        value = `'${value.replace(/'/g, "''")}'`;
      } else if (value === null || value === undefined) {
        // Gère les valeurs nulles
        value = 'NULL';
      }
      return value;
    });

    const query = `INSERT INTO STOCK (${columns.join(', ')}) VALUES (${values.join(', ')})`;
    return this.clipperService.query(query);
  }

  findAll() {
    return `This action returns all stock`;
  }

  findOne(id: number) {
    return `This action returns a #${id} stock`;
  }

  update(id: number, updateStockDto: UpdateStockDto) {
    return `This action updates a #${id} stock`;
  }

  remove(id: number) {
    return `This action removes a #${id} stock`;
  }
}
