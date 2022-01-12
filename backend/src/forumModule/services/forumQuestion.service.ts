import { ForumQuestion } from './../entities/forumQuestion.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

@Injectable()
export class ForumQuestionService extends TypeOrmCrudService<ForumQuestion> {
  constructor(@InjectRepository(ForumQuestion) repo) {
    super(repo);
  }

  async getManyQuestion(
    page = 1,
    limit = 10,
    forumTagId?: number,
    query?: string,
  ): Promise<ForumQuestion[]> {
    query = query || '';
    return this.repo.query(
      `SELECT fq.id, fq.name, fq.description, fq.upvote, fq."createdAt", fq."updatedAt", 
       "user"."fullName", "user"."profileImageUrl", avatar."imageUrl" as "avatarImageUrl", count(forum_answer."id") as "answerCount",
       (
          SELECT array_agg(forum_tag."name") 
          FROM forum_question as fq2
          join forum_tag_questions_forum_question on fq2.id = forum_tag_questions_forum_question."forumQuestionId"
          join forum_tag on forum_tag.id = forum_tag_questions_forum_question."forumTagId"
          where fq2.id = fq.id
       ) as "tags"
      FROM forum_question as fq
      left join "user" on fq."userId" = "user".id
      left join "avatar" on "user"."currentAvatarId" = "avatar".id
      left join "forum_answer" on "forum_answer"."questionId" = fq.id
      ${
        !!forumTagId
          ? `
          INNER JOIN forum_tag_questions_forum_question as ftqfq on fq.id = ftqfq."forumQuestionId"
          WHERE fq."parentQuestionId" IS NULL AND fq.name ILIKE $1 AND ftqfq."forumTagId" = ${forumTagId}
          `
          : 'WHERE fq."parentQuestionId" IS NULL AND fq.name ILIKE $1'
      }
      group by fq.id, "user"."fullName", avatar."imageUrl"
      ORDER BY fq."createdAt" DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `,
      [`%${query}%`],
    );
  }

  async getUnansweredQuestions(
    page = 1,
    limit = 10,
    query?: string,
  ): Promise<ForumQuestion[]> {
    query = query || '';
    return this.repo.query(
      `SELECT fq.id, fq.name, fq.description, fq.upvote, fq."createdAt", fq."updatedAt", 
       "user"."fullName", "user"."profileImageUrl", avatar."imageUrl" as "avatarImageUrl", count(forum_answer."id") as "answerCount",
       (
          SELECT array_agg(forum_tag."name") 
          FROM forum_question as fq2
          join forum_tag_questions_forum_question on fq2.id = forum_tag_questions_forum_question."forumQuestionId"
          join forum_tag on forum_tag.id = forum_tag_questions_forum_question."forumTagId"
          where fq2.id = fq.id
       ) as "tags"
      FROM forum_question as fq
      left join "user" on fq."userId" = "user".id
      left join "avatar" on "user"."currentAvatarId" = "avatar".id
      left join "forum_answer" on "forum_answer"."questionId" = fq.id
      WHERE fq."parentQuestionId" IS NULL AND fq.name ILIKE $1 AND  fq.id NOT IN (
        SELECT DISTINCT "questionId" FROM forum_answer WHERE "questionId" IS NOT NULL
      )
      group by fq.id, "user"."fullName", avatar."imageUrl"
      ORDER BY fq."createdAt" DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `,
      [`%${query}%`],
    );
  }

  async getMyQuestions(
    userId: number,
    page = 1,
    limit = 10,
  ): Promise<ForumQuestion[]> {
    console.log('userId: ', userId);
    return this.repo.query(
      `SELECT fq.id, fq.name, fq.description, fq.upvote, fq."createdAt", fq."updatedAt", 
       "user"."fullName", "user"."profileImageUrl", avatar."imageUrl" as "avatarImageUrl", count(forum_answer."id") as "answerCount",
       (
          SELECT array_agg(forum_tag."name") 
          FROM forum_question as fq2
          join forum_tag_questions_forum_question on fq2.id = forum_tag_questions_forum_question."forumQuestionId"
          join forum_tag on forum_tag.id = forum_tag_questions_forum_question."forumTagId"
          where fq2.id = fq.id
       ) as "tags"
      FROM forum_question as fq
      left join "user" on fq."userId" = "user".id
      left join "avatar" on "user"."currentAvatarId" = "avatar".id
      left join "forum_answer" on "forum_answer"."questionId" = fq.id
      where fq."userId" = ${userId} AND fq."parentQuestionId" IS NULL
      group by fq.id, "user"."fullName", avatar."imageUrl"
      ORDER BY fq."createdAt" DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `,
    );
  }

  async getOneQuestion(id: number) {
    return this.repo.findOne({
      where: {
        id,
      },
      relations: [
        'user',
        'user.currentAvatar',
        'tags',
        'childrenQuestions',
        'answers',
        'childrenQuestions.user',
        'childrenQuestions.user.currentAvatar',
        'answers.user',
        'answers.user.currentAvatar',
        'answers.childrenAnswers',
        'answers.childrenAnswers.user',
        'answers.childrenAnswers.user.currentAvatar',
      ],
    });
  }
}
