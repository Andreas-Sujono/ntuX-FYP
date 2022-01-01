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
    forumTagId: number,
    page = 1,
    limit = 10,
  ): Promise<ForumQuestion[]> {
    return this.repo.query(`
      SELECT forum_question.*, forum_tag_questions_forum_question."forumTagId" FROM forum_question 
      left join forum_tag_questions_forum_question on forum_question.id = forum_tag_questions_forum_question."forumQuestionId"
      WHERE forum_tag_questions_forum_question."forumTagId" = ${forumTagId}
      ORDER BY forum_question.createdAt DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `);
  }

  async getUnansweredQuestions(page = 1, limit = 10): Promise<ForumQuestion[]> {
    return this.repo.query(`
      SELECT * FROM forum_question
      WHERE id NOT IN (
        SELECT "questionId" FROM forum_question
      )
      ORDER BY createdAt DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `);
  }

  async getMyQuestions(
    userId: number,
    page = 1,
    limit = 10,
  ): Promise<ForumQuestion[]> {
    return this.repo.query(`
      SELECT * FROM forum_question
      WHERE "userId" = ${userId}
      ORDER BY createdAt DESC
      LIMIT ${limit} OFFSET ${(page - 1) * limit}
    `);
  }

  async getOneQuestion(id: number) {
    return this.repo.findOne({
      where: {
        id,
      },
      relations: ['user', 'tags', 'childrenQuestions', 'answers'],
    });
  }
}
