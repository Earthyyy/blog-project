-- AlterTable
CREATE SEQUENCE "article_id_seq";
ALTER TABLE "Article" ALTER COLUMN "id" SET DEFAULT nextval('article_id_seq');
ALTER SEQUENCE "article_id_seq" OWNED BY "Article"."id";
