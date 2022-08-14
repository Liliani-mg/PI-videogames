const { Videogame, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true }));

    it("If recive all the attributes must be create the 'videojuego'", async () => {
      const videojuego = await Videogame.create({
        name: "test",
        description: "Descripcion de prueba",
        platforms: "Xbox",
        rating: 2,
      });
      expect(videojuego.name, videojuego.description, videojuego.platforms).to.not.be.null;
    });


    describe('name', () => {
      it('should throw an error if name is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a valid name')))
          .catch(() => done());
      });
      it('should work when its a valid name', () => {
        Videogame.create({ name: 'Super Mario Bros' });
      });
    })

    describe('description', () => {
      it('should throw an error if description is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a description')))
          .catch(() => done());
      });
      it('should work when its have a description', () => {
        Videogame.create({ description: 'Una descripcion para el juego' });
      });
    })


    describe('platforms', () => {
      it('should throw an error if platforms is null', (done) => {
        Videogame.create({})
          .then(() => done(new Error('It requires a platform')))
          .catch(() => done());
      });
      it('should work when its have almost one platform', () => {
        Videogame.create({ platforms: 'PC' });
      });
    })

    describe('rating', () => {
      it('should throw an error if rating is not between 1-5', (done) => {
        Videogame.create({rating: 0})
          .then(() => done(new Error('It requires a valid rating')))
          .catch(() => done());
      });
      it('should throw an error if rating is not a number', (done) => {
        Videogame.create({rating: "a"})
          .then(() => done(new Error('Rating must be a number')))
          .catch(() => done());
      });

      it('should work when its have a valid rating', () => {
        Videogame.create({ rating: 2 });
      });
    })

    });
  });

