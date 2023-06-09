// @ts-ignore
const {PrismaClient} = require('@prisma/client')
// import {categories} from "./data";
const {categories, blogPosts} = require('./data.js')
const {productCategories,comments, products} = require("./data");
const prisma = new PrismaClient()

const load = async () => {
  try {
    // await prisma.blogPost.deleteMany()
    // await prisma.category.deleteMany()
    // await prisma.productCategory.deleteMany()
    // await prisma.comment.deleteMany()
    await prisma.product.deleteMany()


    // await prisma.category.createMany({
    //   data: categories
    // })
    //
    // await prisma.blogPost.createMany({
    //   data: blogPosts
    // })
    //
    // await prisma.productCategory.createMany({
    //   data: productCategories
    // })
    // await prisma.comment.createMany({
    //   data: comments
    // })

    await prisma.product.createMany({
      data: products
    })


  } catch (e) {
    console.error(e)
    process.exit(1)
  } finally {
    await prisma.$disconnect()
  }
}

load()
