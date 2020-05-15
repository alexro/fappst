import { Server } from 'miragejs';

export default new Server({
  routes() {
    this.namespace = 'api';

    this.get('/conditions', () => {
      return {
        conditions: [
          { id: 1, name: 'Inception', year: 2010 },
          { id: 2, name: 'Interstellar', year: 2014 },
          { id: 3, name: 'Dunkirk', year: 2017 },
        ],
      };
    });
  },
});
