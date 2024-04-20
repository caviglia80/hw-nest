import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid'
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {

    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Jeep',
        //     model: 'Cherokee'
        // },
    ];

    findAll() {
        return this.cars;
    }

    findOneById(id: string) {
        const car = this.cars.find(car => car.id === id);
        if (!car) throw new NotFoundException(`Car with id '${id}' not found`);
        return car;
    }

    create(createCarDto: CreateCarDto) {
        const car: Car = {
            id: uuid(),
            ...createCarDto
        }
        this.cars.push(car);
        return car;
    }

    update(id: string, updateCarDto: UpdateCarDto) {
        if (updateCarDto.id && updateCarDto.id !== id) throw new BadRequestException('Los ids no son los mismos.');

        let carDB = this.findOneById(id);
        this.cars = this.cars.map(car => {

            if (car.id === id) {
                carDB = {
                    ...carDB, // relleno lo que esta en la BD
                    ...updateCarDto, // nuevos datos, solo los que se traen
                    id, // sobreescribo por el mismo id para evitar que alguien mande un id distinto
                };
                return carDB;
            }
            return car;
        });
        return carDB;
    }

    remove(id: string): boolean {
        let carDB = this.findOneById(id);
        this.cars = this.cars.filter(car => car.id !== id);
        return true;
    }

    fillCarsWithSeedData(cars: Car[]) {
        this.cars = cars;
    }
}
