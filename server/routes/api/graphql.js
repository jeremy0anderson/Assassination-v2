const router = require('express').Router();
const {ApolloServer} = require('apollo-server-express');

const gqlServer = new ApolloServer({
    typeDefs: require('../../schemas'),
    resolvers: require('../../schemas')
})
router.get("/graphql", (req, res)=>{

})


module.exports=router;