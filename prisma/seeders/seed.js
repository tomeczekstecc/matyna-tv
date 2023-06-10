// @ts-ignore
const {PrismaClient} = require('@prisma/client')
// import {categories} from "./data";
const {categories, blogPosts,productCategories,comments, products, films,users} = require("./data");
const prisma = new PrismaClient()

const load = async () => {
  try {

    await prisma.category.deleteMany()
    await prisma.category.createMany({
      data: categories
    })


    await prisma.productCategory.deleteMany()
    await prisma.productCategory.createMany({
      data: productCategories
    })

    await prisma.user.deleteMany()
    await prisma.user.createMany({
      data: users
    })


    await prisma.blogPost.deleteMany()
    await prisma.blogPost.createMany({
      data: blogPosts
    })

    await prisma.comment.deleteMany()
    await prisma.comment.createMany({
      data: comments
    })

    await prisma.product.deleteMany()
    await prisma.product.createMany({
      data: products
    })

    await prisma.film.deleteMany()
    await prisma.film.createMany({
      data: films
    })



  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
