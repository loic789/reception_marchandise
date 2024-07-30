import { Injectable } from '@nestjs/common';
import { SelectReserveDto } from './dto/select-reserve.dto';
import { UpdateReserveDto } from './dto/update-reserve.dto';
import { CreateReserveDto } from './dto/create-reserve.dto';
import { ClipperService } from 'src/clipper/clipper.service';

@Injectable()
export class ReserveService {

  constructor
    (
      private clipperService: ClipperService
    ) { }

  create(createReserveDto: CreateReserveDto) {
    const columns = Object.keys(createReserveDto);
    if (columns.length === 0) {
      throw new Error("No columns to insert.");
    }

    const values = columns.map(key => {
      let value = createReserveDto[key];
      if (typeof value === 'string') {
        // Echape les apostrophes dans les chaînes de caractères
        value = `'${value.replace(/'/g, "''")}'`;
      } else if (value === null || value === undefined) {
        // Gère les valeurs nulles
        value = 'NULL';
      } else if (typeof value === 'number') {
        // Les nombres n'ont pas besoin d'échappement
        value = value.toString();
      } else if (value instanceof Date) {
        value = `'${value.toISOString().split('T')[0]}'`;
      } else {
        throw new Error(`Unsupported data type for key ${key}`);
      }
      return value;
    });

    const query = `INSERT INTO RESERVE (${columns.join(', ')}) VALUES (${values.join(', ')})`;
    return this.clipperService.query(query);
  }

  findAll() {
    return `This action returns all reserve`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reserve`;
  }

  update(id: number, updateReserveDto: UpdateReserveDto) {
    return `This action updates a #${id} reserve`;
  }

  remove(id: number) {
    return `This action removes a #${id} reserve`;
  }
}
