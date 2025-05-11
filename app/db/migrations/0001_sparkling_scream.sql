CREATE TABLE "erp"."user_settings" (
	"id" serial PRIMARY KEY NOT NULL,
	"userid" text NOT NULL,
	"settings" json NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "user_settings_userid_settings_unique" UNIQUE("userid","settings")
);
--> statement-breakpoint
ALTER TABLE "erp"."user_settings" ADD CONSTRAINT "user_settings_userid_users_userid_fk" FOREIGN KEY ("userid") REFERENCES "erp"."users"("userid") ON DELETE no action ON UPDATE no action;