import AdminJS from 'adminjs'
import AdminJSExpress from '@adminjs/express'
import express from 'express'
import * as AdminJSPrisma from '@adminjs/prisma'
import { PrismaClient } from '@prisma/client'
import { DMMFClass } from '@prisma/client/runtime'
// import { Category } from './category.entity'

const prisma = new PrismaClient()

AdminJS.registerAdapter({
  Resource: AdminJSPrisma.Resource,
  Database: AdminJSPrisma.Database,
})

const PORT = 3000

const start = async () => {
  const dmmf = ((prisma as any)._baseDmmf as DMMFClass)
  const adminOptions = {
    // We pass Publisher to `resources`
    resources: [{
      resource: { model: dmmf.modelMap.User, client: prisma },
      options: {},
    }],
  }
  
  const app = express()

  const admin = new AdminJS(adminOptions)

  const adminRouter = AdminJSExpress.buildRouter(admin)
  app.use(admin.options.rootPath, adminRouter)

  app.listen(PORT, () => {
    console.log(`AdminJS started on http://localhost:${PORT}${admin.options.rootPath}`)
  })
}

start()