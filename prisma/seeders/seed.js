// @ts-ignore
const {PrismaClient} = require('@prisma/client')
// import {categories} from "./data";
const {categories, blogPosts} = require('./data.js')
const prisma = new PrismaClient()

const load = async () => {
  try {
    await prisma.blogPost.deleteMany()
    await prisma.category.deleteMany()

    
    await prisma.category.createMany({
      data: categories
    })

    await prisma.blogPost.createMany({
      data: blogPosts
    })


  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
