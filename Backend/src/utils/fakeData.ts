import { Movie } from "../models";
import type { MovieCreationAttributes } from "../models/movie";
import { base, en, Faker } from "@faker-js/faker";

const faker = new Faker({
  locale: [ en],
});

async function seedFakeMovies(count = 20) {
  const movies: MovieCreationAttributes[] = [];
  for (let i = 0; i < count; i++) {
    movies.push({
      title: faker.lorem.words(3),
      description: faker.lorem.sentences(2),
      releaseDate: faker.date.past({ years: 5 }),
      url: faker.internet.url(),
      isPublic: faker.datatype.boolean(),
      isPremium: faker.datatype.boolean(),
      isFake: true, // Đánh dấu là dữ liệu fake
    });
  }
  await Movie.bulkCreate(movies);
  console.log(`Seeded ${count} fake movies!`);
}

async function clearFakeMovies() {
  const deletedCount = await Movie.destroy({ where: { isFake: true } });
  console.log(`Deleted ${deletedCount} fake movies!`);
}

if (require.main === module) {
  const action = process.argv[2];
  if (action === "seed") {
    seedFakeMovies(20).then(() => process.exit());
  } else if (action === "clear") {
    clearFakeMovies().then(() => process.exit());
  }
}
