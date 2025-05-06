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
--> statement-breakpoint
CREATE TABLE "erp"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"name" text NOT NULL,
	"created_at" date DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "erp"."roles" ADD CONSTRAINT "roles_email_users_email_fk" FOREIGN KEY ("email") REFERENCES "erp"."users"("email") ON DELETE no action ON UPDATE no action;