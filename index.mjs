import Fastify from 'fastify';
import Prism from 'prismjs';
import loadLanguages from 'prismjs/components/index.js';

loadLanguages();

const fastify = Fastify({
  logger: true
})
fastify.get('/', async (request, reply) => {
    return reply.status(200).send(`ok`)
})
// Declare a route
fastify.post('/', function (request, reply) {
  const data = request.body
  if(!data.startsWith('```')) {
      return reply.send(request.body)
  }
  const regex = data.match(/^```([a-zA-Z]*)$/m)
  const lang = regex[1]
  if(!lang) {
    return reply.send(request.body)
  }
  return Prism.highlight(data, Prism.languages[lang], lang)
})

// Run the server!
fastify.listen(process.env.PORT || 3000, '0.0.0.0', function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  console.log(`Server is now listening on ${address}`)
})