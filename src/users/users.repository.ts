import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './users.entitys';
import { createUser, updateUser } from './Dto/createUser.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // private users: User[] = [
  //   {
  //     id: '1',
  //     email: 'sofia.ramirez@email.com',
  //     name: 'Sofía Ramírez',
  //     password: 'hashed_password_123',
  //     address: 'Av. Principal 123, Col. Centro',
  //     country: 'México',
  //     city: 'Ciudad de México',
  //   },
  //   {
  //     id: '2',
  //     email: 'alejandro.martinez@email.com',
  //     name: 'Alejandro Martínez',
  //     password: 'secure_pass_456',
  //     address: 'Calle Secundaria 456',
  //     country: 'España',
  //     city: 'Madrid',
  //   },
  //   {
  //     id: '3',
  //     email: 'isabel.garcia@email.com',
  //     name: 'Isabel García',
  //     password: 'hashed_pass_789',
  //     address: 'Carrera 45 #67-89',
  //     country: 'Colombia',
  //     city: 'Bogotá',
  //   },
  //   {
  //     id: '4',
  //     email: 'david.fernandez@email.com',
  //     name: 'David Fernández',
  //     password: 'password_hash_101',
  //     address: '123 Main Street',
  //     country: 'Estados Unidos',
  //     city: 'New York',
  //   },
  //   {
  //     id: '5',
  //     email: 'elena.castro@email.com',
  //     name: 'Elena Castro',
  //     password: 'hashed_2024_pass',
  //     address: 'Rua das Flores 78',
  //     country: 'Brasil',
  //     city: 'São Paulo',
  //   },
  // ];

  async fillUsers(
    page: number,
    limit: number,
  ): Promise<Omit<User, 'password' | 'isAdmin' | 'confirmPassword'>[]> {
    const skip = (page - 1) * limit;

    const usersPage: User[] = await this.userRepository
      .createQueryBuilder('user')
      .skip(skip)
      .take(limit)
      .getMany();

    const safeUsers: Omit<User, 'password' | 'confirmPassword' | 'isAdmin'>[] =
      usersPage.map(
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        ({ password, confirmPassword, isAdmin, ...rest }) => rest,
      );
    return safeUsers;
  }

  async createUser(
    newUser: createUser,
  ): Promise<Omit<User, 'password' | 'confirmPassword' | 'isAdmin'>> {
    const email = newUser.email;
    const findEmail = await this.userRepository.findOne({ where: { email } });
    if (findEmail) {
      throw new ConflictException('El email ya está registrado');
    }

    const phone = newUser.phone;
    const findPhone = await this.userRepository.findOne({ where: { phone } });
    if (findPhone) {
      throw new ConflictException('El telefono ya está registrado');
    }

    const hashedPassword = await bcrypt.hash(newUser.password, 10);
    const hashedPasswordConfir = await bcrypt.hash(newUser.confirmPassword, 10);

    if (hashedPassword == hashedPasswordConfir) {
      throw new BadRequestException('Contrasenia no coiciden');
    }

    const userCreate = this.userRepository.create({
      name: newUser.name,
      email: newUser.email,
      password: hashedPassword,
      address: newUser.address,
      phone: newUser.phone,
      country: newUser.country,
      city: newUser.city,
      confirmPassword: hashedPasswordConfir,
      isAdmin: false,
      birthdate: new Date(newUser.birthdate),
    });
    await this.userRepository.save(userCreate);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, confirmPassword, isAdmin, ...publicUserData } =
      userCreate;
    return publicUserData;
  }

  async updateUserById(
    id: string,
    userData: Partial<updateUser>,
  ): Promise<string> {
    const userFind = await this.userRepository.findOne({ where: { id } });
    if (!userFind) {
      return 'Usuario no encontrado';
    }

    await this.userRepository.update(id, userData);

    return `El usuario de ${id} fue actualizado`;
  }

  async deleteUserById(id: string): Promise<string> {
    const userFind = await this.userRepository.findOne({ where: { id } });
    if (!userFind) {
      return 'Usuario no encontrado';
    }
    await this.userRepository.delete({ id });
    return 'El usuario de id: ' + id + ' ha sido eliminado correctamente';
  }

  async getById(
    id: string,
  ): Promise<Omit<User, 'password' | 'confirmPassword'>> {
    const userFind = await this.userRepository.findOne({ where: { id } });
    if (!userFind) {
      throw new NotFoundException('Usuario no encontrado');
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, confirmPassword, ...userSinPassword } = userFind;
    return userSinPassword;
  }

  async findOneByEmail(email: string): Promise<User> {
    const findEmail = await this.userRepository.findOne({ where: { email } });
    if (!findEmail) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return findEmail;
  }
}

// name: newUser.name,
//       email: newUser.email,
//       password: hashedPassword,
//       address: newUser.address,
//       phone: newUser.phone,
//       country: newUser.country,
//       city: newUser.city,
//       confirmPassword: hashedPasswordConfir,
//       isAdmin: newUser.isAdmin,
