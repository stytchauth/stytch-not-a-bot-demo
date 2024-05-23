import { pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const photos = pgTable("photos", {
  id: text("id").primaryKey().notNull(), // Last 5 characters as slug from Twilio MessageSid
  message_sid: text("message_sid").notNull(), // Twilio MessageSid
  input_image: text("input_image").notNull(), // Twilio MediaUrl0
  user_id: text("user_id"), // Stytch user_id
  image_0: text("image_0"), // Replicate output image 0
  image_1: text("image_1"), // Replicate output image 1
  image_2: text("image_2"), // Replicate output image 2
  ik_input_image_id: text("ik_input_image_id"), // ImageKit input image id
  ik_input_image: text("ik_input_image"), // ImageKit input image
  ik_image_0_id: text("ik_image_0_id"), // ImageKit image 0 id
  ik_image_0: text("ik_image_0"), // ImageKit image 0
  ik_image_1_id: text("ik_image_1_id"), // ImageKit image 1 id
  ik_image_1: text("ik_image_1"), // ImageKit image 1
  ik_image_2_id: text("ik_image_2_id"), // ImageKit image 2 id
  ik_image_2: text("ik_image_2"), // ImageKit image 2
  collage_url: text("collage_url"), // ImageKit collage url
  created_at: timestamp("created_at").notNull().defaultNow(),
});

export type Photo = typeof photos.$inferSelect;
export type NewPhoto = typeof photos.$inferInsert;
