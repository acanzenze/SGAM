import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        email: 'freitaspedromp@gmail.com',
        password: '123',
      },
      {
        email: 'alexandrecanzenze@gmail.com',
        password: '123'
      }
    ])
  }
}
