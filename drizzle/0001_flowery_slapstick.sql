CREATE TABLE "site_media" (
	"id" serial PRIMARY KEY NOT NULL,
	"section" varchar(50) NOT NULL,
	"slot" varchar(50) NOT NULL,
	"device" varchar(10) NOT NULL,
	"r2_key" varchar(500) NOT NULL,
	"url" varchar(1000) NOT NULL,
	"alt_text" varchar(255),
	"sort_order" integer DEFAULT 0,
	"is_active" boolean DEFAULT true NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
