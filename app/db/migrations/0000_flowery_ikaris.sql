CREATE SCHEMA "erp";
--> statement-breakpoint
CREATE TABLE "erp"."images" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"data" BYTEA NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "images_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "erp"."roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"role" text NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "roles_email_role_unique" UNIQUE("email","role")
);
