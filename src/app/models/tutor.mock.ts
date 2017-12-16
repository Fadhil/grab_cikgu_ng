
import { Tutor } from './tutor';

export function mockTutorFactory(): Tutor {
  return {
    id: faker.random.uuid();
    name: faker.name.firstName();
    email: faker.internet.email();
    password: 'testpass'
  };
}
