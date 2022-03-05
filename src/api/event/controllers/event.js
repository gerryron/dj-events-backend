"use strict";
 
/**
 *  event controller
 */
 
const { createCoreController } = require("@strapi/strapi").factories;
 
module.exports = createCoreController("api::event.event", ({ strapi }) => ({
  // Create event with linked user
  async create(ctx) {
    let entity;
    ctx.request.body.data.user = ctx.state.user;
    entity = await strapi.service("api::event.event").create(ctx.request.body);
    return entity;
  },

  // Update user event
  async update(ctx) {
    const { id } = ctx.params;

    let entity;
    entity = await strapi.service("api::event.event").update(id, ctx.request.body);
    return entity;
  },

  // Delete a user event
  async delete(ctx) {
    const { id } = ctx.params;
    const entity = await strapi.service("api::event.event").delete(id);
    return entity
  },

  // Get logged in users
  async me(ctx) {
    const user = ctx.state.user;
 
    if (!user) {
      return ctx.badRequest(null, [
        { message: "No authorization header was found" },
      ]);
    }
 
    const data = await strapi.db.query("api::event.event").findMany({
      where: {
        user: { id: user.id },
      },
      populate: { user: true, image: true },
    });
    if (!data) {
      return ctx.notFound();
    }
 
    const res = await this.sanitizeOutput(data, ctx);
    return res;
  },
}));