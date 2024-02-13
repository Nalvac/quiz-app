
const { Entity, Column, PrimaryGeneratedColumn } = require('typeorm');

@Entity()
class User {
  @PrimaryGeneratedColumn()
  id;

  @Column()
  username;

  @Column()
  password;
}

module.exports = User;
