const app = require("./server");

app.listen(4000);
require('./models/controller')
console.log(`Server ready at http://localhost:4000/graphql`);
