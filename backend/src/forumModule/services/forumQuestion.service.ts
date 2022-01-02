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
  ): Promise<ForumQuestion[]> {
    return this.repo.query(`
      SELECT forum_question.*, array_agg(forum_tag."name"), "user"."fullName", avatar."imageUrl" as "avatarImageUrl", count(forum_answer."id") as "answerCount"
      FROM forum_question 
      left join forum_tag_questions_forum_question on forum_question.id = forum_tag_questions_forum_question."forumQuestionId"
      left join forum_tag on forum_tag.id = forum_tag_questions_forum_question."forumTagId"
      left join "user" on forum_question."userId" = "user".id
      left join "avatar" on "user"."currentAvatarId" = "avatar".id
      left join "forum_answer" on "forum_answer"."questionId" = "forum_question".id
      ${
        !!forumTagId
          ? `WHERE forum_tag_questions_forum_question."forumTagId" = ${forumTagId} AND forum_question."parentQuestionId" IS NULL`
          : 'WHERE forum_question."parentQuestionId" IS NULL'
      }
      group by forum_question.id, "user"."fullName", avatar."imageUrl"
      ORDER BY forum_question."createdAt" DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `);
  }

  async getUnansweredQuestions(page = 1, limit = 10): Promise<ForumQuestion[]> {
    return this.repo.query(`
    SELECT forum_question.*, array_agg(forum_tag."name"), "user"."fullName", avatar."imageUrl" as "avatarImageUrl", count(forum_answer."id") as "answerCount"
      FROM forum_question 
      left join forum_tag_questions_forum_question on forum_question.id = forum_tag_questions_forum_question."forumQuestionId"
      left join forum_tag on forum_tag.id = forum_tag_questions_forum_question."forumTagId"
      left join "user" on forum_question."userId" = "user".id
      left join "avatar" on "user"."currentAvatarId" = "avatar".id
      left join "forum_answer" on "forum_answer"."questionId" = "forum_question".id
      WHERE forum_question.id NOT IN (
        SELECT DISTINCT "questionId" FROM forum_answer WHERE "questionId" IS NOT NULL
      ) AND forum_question."parentQuestionId" IS NULL
      group by forum_question.id, "user"."fullName", avatar."imageUrl"
      ORDER BY forum_question."createdAt" DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `);
  }

  async getMyQuestions(
    userId: number,
    page = 1,
    limit = 10,
  ): Promise<ForumQuestion[]> {
    console.log('userId: ', userId);
    return this.repo.query(`
    SELECT forum_question.*, array_agg(forum_tag."name"), "user"."fullName", avatar."imageUrl" as "avatarImageUrl", count(forum_answer."id") as "answerCount"
      FROM forum_question 
      left join forum_tag_questions_forum_question on forum_question.id = forum_tag_questions_forum_question."forumQuestionId"
      left join forum_tag on forum_tag.id = forum_tag_questions_forum_question."forumTagId"
      left join "user" on forum_question."userId" = "user".id
      left join "avatar" on "user"."currentAvatarId" = "avatar".id
      left join "forum_answer" on "forum_answer"."questionId" = "forum_question".id
      WHERE forum_question."userId" = ${userId} AND forum_question."parentQuestionId" IS NULL
      group by forum_question.id, "user"."fullName", avatar."imageUrl"
      ORDER BY forum_question."createdAt" DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `);
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
