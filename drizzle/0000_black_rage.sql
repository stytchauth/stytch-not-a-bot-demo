CREATE TABLE IF NOT EXISTS "photos" (
	"id" text PRIMARY KEY NOT NULL,
	"message_sid" text NOT NULL,
	"input_image" text NOT NULL,
	"user_id" text,
	"image_0" text NOT NULL,
	"image_1" text NOT NULL,
	"image_2" text NOT NULL
);
