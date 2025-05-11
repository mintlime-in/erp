CREATE SCHEMA "erp";
--> statement-breakpoint
CREATE TABLE "erp"."images" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"data" BYTEA NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "images_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE "erp"."permissions" (
	"id" serial PRIMARY KEY NOT NULL,
	"permission" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "permissions_permission_unique" UNIQUE("permission")
);
--> statement-breakpoint
CREATE TABLE "erp"."roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"role" text NOT NULL,
	"permission" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "roles_role_permission_unique" UNIQUE("role","permission")
);
--> statement-breakpoint
CREATE TABLE "erp"."user_roles" (
	"id" serial PRIMARY KEY NOT NULL,
	"userid" text NOT NULL,
	"role" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_roles_userid_role_unique" UNIQUE("userid","role")
);
--> statement-breakpoint
CREATE TABLE "erp"."users" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" text NOT NULL,
	"userid" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "users_email_unique" UNIQUE("email"),
	CONSTRAINT "users_userid_unique" UNIQUE("userid")
);
--> statement-breakpoint
ALTER TABLE "erp"."roles" ADD CONSTRAINT "roles_permission_permissions_permission_fk" FOREIGN KEY ("permission") REFERENCES "erp"."permissions"("permission") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "erp"."user_roles" ADD CONSTRAINT "user_roles_userid_users_userid_fk" FOREIGN KEY ("userid") REFERENCES "erp"."users"("userid") ON DELETE no action ON UPDATE no action;